import { extname } from 'path'

/**
 * check the uri has an extension.
 * @param { string } uri - uri
 * @return { boolean } boolean
 */
export const hasExtension = (uri: string): boolean => {
  const extension = extname(uri)
  return !!(extension && extension.length > 0)
}
