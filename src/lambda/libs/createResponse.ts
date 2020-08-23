import { CloudFrontResultResponse } from 'aws-lambda'

/**
 * create response to redirect
 * @param { string } target - URL for redirect to
 * @param { string } status - 3xx Status Code
 * @param { string } description - Status Description
 * @return { CloudFrontResultResponse } response
 */
export const createRedirectResponse = (
  target: string,
  // TODO: fix types
  status?: '301' | '302' | '307',
  description?: string,
): CloudFrontResultResponse => ({
  status: status ?? '301',
  statusDescription: description,
  headers: {
    location: [
      {
        key: 'Location',
        value: `${target}`,
      },
    ],
  },
})
