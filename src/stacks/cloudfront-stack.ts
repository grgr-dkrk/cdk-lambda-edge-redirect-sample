import { Bucket } from '@aws-cdk/aws-s3'
import { RemovalPolicy, StackProps, Stack, Construct } from '@aws-cdk/core'
import { Environment } from '../config'
import { DnsValidatedCertificate } from '@aws-cdk/aws-certificatemanager'
import {
  IHostedZone,
  ARecord,
  AaaaRecord,
  RecordTarget,
  ARecordProps,
} from '@aws-cdk/aws-route53'
import {
  OriginAccessIdentity,
  CloudFrontWebDistribution,
  ViewerCertificate,
  SecurityPolicyProtocol,
  SSLMethod,
  LambdaEdgeEventType,
} from '@aws-cdk/aws-cloudfront'
import { CloudFrontTarget } from '@aws-cdk/aws-route53-targets'
import {
  AssetCode,
  Function as LambdaFunction,
  Runtime,
} from '@aws-cdk/aws-lambda'
import { resolve } from 'path'

type Props = StackProps & {
  environment: Environment
  domainName: string
  certificate: DnsValidatedCertificate
  zone: IHostedZone
}

export class CloudFrontStack extends Stack {
  public readonly bucket: Bucket
  public readonly distribution: CloudFrontWebDistribution

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props)
    /**
     * environment, domain
     */
    const { certificate, domainName, environment, zone } = props

    /**
     * OAI
     */
    const originAccessIdentity = new OriginAccessIdentity(this, 'Oai')

    /**
     * Lambda
     */
    const lambdaCode = new AssetCode(`${resolve(__dirname)}/../lambda/dist`)
    const lambdaFunction = new LambdaFunction(this, 'redirect', {
      handler: 'index.lambdaFunctions',
      code: lambdaCode,
      runtime: Runtime.NODEJS_12_X,
    }).currentVersion

    /**
     * Bucket
     */
    this.bucket = new Bucket(this, `Bucket${id}`, {
      bucketName: `lambda-edge-redirect-${environment}`,
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
    })

    /**
     * Set GrantRead to Distribution
     */
    this.bucket.grantRead(originAccessIdentity)

    /**
     * Distribution
     */
    this.distribution = new CloudFrontWebDistribution(this, `Distribution`, {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: this.bucket,
            originAccessIdentity,
          },
          behaviors: [
            {
              compress: true,
              isDefaultBehavior: true,
              lambdaFunctionAssociations: [
                {
                  eventType: LambdaEdgeEventType.ORIGIN_REQUEST,
                  lambdaFunction,
                },
              ],
            },
          ],
        },
      ],
      viewerCertificate: ViewerCertificate.fromAcmCertificate(certificate, {
        aliases: [domainName],
        securityPolicy: SecurityPolicyProtocol.TLS_V1,
        sslMethod: SSLMethod.SNI,
      }),
    })

    /**
     * Set ARecord
     */
    const route53RecordProps: ARecordProps = {
      zone,
      recordName: domainName,
      target: RecordTarget.fromAlias(new CloudFrontTarget(this.distribution)),
    }
    new ARecord(this, 'ARecord', route53RecordProps)
    new AaaaRecord(this, 'AaaaRecord', route53RecordProps)
  }
}
