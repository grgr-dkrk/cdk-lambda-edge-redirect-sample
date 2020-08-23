import { normalizeUri } from '../../src/lambda/normalizeUri'

describe('normalizeYUri', () => {
  it('pattern: empty', () => {
    const uri = ''
    const newUri = normalizeUri(uri)
    expect(newUri).toBe('/index.html')
  })
  it('pattern: root', () => {
    const uri = '/'
    const newUri = normalizeUri(uri)
    expect(newUri).toBe('/index.html')
  })
  it('pattern: root and uri has an extension', () => {
    const uri = '/index.html'
    const newUri = normalizeUri(uri)
    expect(newUri).toBe('/index.html')
  })
  it('pattern: uri is "/foo"', () => {
    const uri = '/foo'
    const newUri = normalizeUri(uri)
    expect(newUri).toBe('/foo/index.html')
  })
  it('pattern: uri is "/foo/"', () => {
    const uri = '/foo/'
    const newUri = normalizeUri(uri)
    expect(newUri).toBe('/foo/index.html')
  })
  it('pattern: uri is "/foo/index.html"', () => {
    const uri = '/foo/index.html'
    const newUri = normalizeUri(uri)
    expect(newUri).toBe('/foo/index.html')
  })
  it('pattern: uri is "/images/image.jpg"', () => {
    const uri = '/images/image.jpg'
    const newUri = normalizeUri(uri)
    expect(newUri).toBe('/images/image.jpg')
  })
})
