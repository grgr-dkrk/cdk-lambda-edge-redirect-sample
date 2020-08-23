#!/usr/bin/env node
import 'source-map-support/register'
import { App } from '@aws-cdk/core'
import { DeploymentStack } from './stacks/deployment-stack'
import { Environment, env, domain, hostedZone } from './config'
import { HostedZoneStack } from './stacks/hostedZone-stack'
import { CertificateManagerStack } from './stacks/certificate-manager-stack'
import { CloudFrontStack } from './stacks/cloudfront-stack'
import { resolve } from 'path'
import { Source } from '@aws-cdk/aws-s3-deployment'

const app = new App()

const environment = app.node.tryGetContext('environment') as
  | Environment
  | undefined

if (!env.account) throw new Error('not found: account')
if (!env.region) throw new Error('not found: region')
if (!environment) throw new Error('not found: environment')

const domainName = domain[environment]
const hostedZoneName = hostedZone[environment]

/**
 * HostedZoneStack
 */
const { zone } = new HostedZoneStack(app, `HostedZoneStack-${environment}`, {
  hostedZoneName,
  env,
})

/**
 * CertificateManagerStack
 */
const { certificate } = new CertificateManagerStack(
  app,
  `CertificateManagerStack-${environment}`,
  {
    hostedZoneName,
    zone,
    env,
  },
)

/**
 * CloudFrontStackStack
 */
const cloudFront = new CloudFrontStack(app, `CloudFrontStack-${environment}`, {
  environment,
  domainName,
  certificate,
  zone,
  env,
})

/**
 * DeploymentStack
 */
new DeploymentStack(app, `DeploymentStack-${environment}`, {
  cloudFront,
  source: Source.asset(`${resolve(__dirname)}/website/`),
  env,
})
