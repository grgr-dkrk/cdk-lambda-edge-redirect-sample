import { CloudFrontRequestEvent, CloudFrontRequestResult } from 'aws-lambda'
import { normalizeUri } from './normalizeUri'
import { checkRedirectResponse } from './redirect'

export const lambdaFunctions = async (
  event: CloudFrontRequestEvent,
): Promise<CloudFrontRequestResult> => {
  const request = event.Records[0].cf.request
  const { uri } = request

  // redirect
  const redirectResponse = checkRedirectResponse(uri)
  if (redirectResponse) {
    return redirectResponse
  }

  // rewrite
  const normalizedUri = normalizeUri(uri)
  return { ...request, uri: normalizedUri }
}
