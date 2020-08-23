import { hasTrailingSlash } from '../../../src/lambda/libs'

describe('hasTrailingSlash', () => {
  it('return true if uri has trailingSlash', () => {
    const uri = '/foo/'
    expect(hasTrailingSlash(uri)).toBe(true)
  })
  it('return false if uri not has trailingSlash', () => {
    const uri = '/foo'
    expect(hasTrailingSlash(uri)).toBe(false)
  })
  it('return false if uri is empty', () => {
    const uri = ''
    expect(hasTrailingSlash(uri)).toBe(false)
  })
})
