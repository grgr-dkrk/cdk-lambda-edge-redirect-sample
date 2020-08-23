import { hasExtension } from '../../../src/lambda/libs'

describe('hasExtension', () => {
  it('return true if uri has an extension(html)', () => {
    const uri = '/index.html'
    expect(hasExtension(uri)).toBe(true)
  })
  it('return true if uri has an extension(jpg)', () => {
    const uri = '/images/foo.jpg'
    expect(hasExtension(uri)).toBe(true)
  })
  it('return false if uri has not an extension', () => {
    const uri = '/foo'
    expect(hasExtension(uri)).toBe(false)
  })
  it('return false if uri has not an extension with trailing slash', () => {
    const uri = '/foo/'
    expect(hasExtension(uri)).toBe(false)
  })
})
