import { CloudFrontRequestEvent } from 'aws-lambda'
import { lambdaFunctions } from '../../src/lambda'

const createLambdaFunctionMock = (uri: string): CloudFrontRequestEvent => ({
  Records: [
    {
      cf: {
        config: {
          distributionDomainName: '',
          distributionId: '',
          eventType: 'viewer-request',
          requestId: '',
        },
        request: {
          clientIp: '',
          method: 'GET',
          querystring: '',
          uri,
          headers: {},
        },
      },
    },
  ],
})

describe('lambdaFunctions', () => {
  it('snapshot: /foo', async () => {
    expect(
      await lambdaFunctions(createLambdaFunctionMock('/foo')),
    ).toMatchSnapshot()
  })
  it('snapshot: /foo/', async () => {
    expect(
      await lambdaFunctions(createLambdaFunctionMock('/foo/')),
    ).toMatchSnapshot()
  })
  it('snapshot: /foo/index.html', async () => {
    expect(
      await lambdaFunctions(createLambdaFunctionMock('/foo/index.html')),
    ).toMatchSnapshot()
  })
  it('snapshot: /foo/baz/', async () => {
    expect(
      await lambdaFunctions(createLambdaFunctionMock('/foo/baz/')),
    ).toMatchSnapshot()
  })
  it('snapshot: /foo/?user=dkrk', async () => {
    expect(
      await lambdaFunctions(createLambdaFunctionMock('/foo/?user=dkrk')),
    ).toMatchSnapshot()
  })
  it('snapshot: /foo/index.html?user=dkrk', async () => {
    expect(
      await lambdaFunctions(
        createLambdaFunctionMock('/foo/index.html?user=dkrk'),
      ),
    ).toMatchSnapshot()
  })
})
