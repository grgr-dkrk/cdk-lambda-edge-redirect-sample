import { CloudFrontResultResponse } from 'aws-lambda'
import { createRedirectResponse } from './libs'

/**
 * redirect
 * @param { string } uri - URI
 * @return { Response | null } response | null - Response for Redirect or Null
 */
export const checkRedirectResponse = (
  uri: string,
): CloudFrontResultResponse | null => {
  // if uri is /foo/*, redirect to /bar/.
  if (uri.match(/^\/foo\/?/)) {
    return createRedirectResponse('/bar/')
  }

  return null
}
