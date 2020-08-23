import { hasExtension, hasTrailingSlash } from './libs'

/**
 * normalizeUri
 * @param { string } uri - URI
 * @return { string } newUri - new URI
 */
export const normalizeUri = (uri: string): string => {
  const INDEX_PATH = 'index.html' as const

  // if uri has some extension, return uri as it is.
  if (hasExtension(uri)) return uri

  // return `${uri}/index.html`
  return hasTrailingSlash(uri) ? `${uri}${INDEX_PATH}` : `${uri}/${INDEX_PATH}`
}
