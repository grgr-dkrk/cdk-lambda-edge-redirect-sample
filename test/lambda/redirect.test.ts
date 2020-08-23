import { checkRedirectResponse } from '../../src/lambda/redirect'

describe('redirect', () => {
  describe('checkRedirectResponse', () => {
    it('return redirect response: "/foo/"', () => {
      const uri = '/foo/'
      const response = checkRedirectResponse(uri)?.status
      expect(response).toBe('301')
    })
    it('return redirect response: "/foo"', () => {
      const uri = '/foo'
      const response = checkRedirectResponse(uri)?.status
      expect(response).toBe('301')
    })
    it('return null: ""', () => {
      const uri = ''
      const response = checkRedirectResponse(uri)
      expect(response).toBe(null)
    })
    it('return null: "/"', () => {
      const uri = '/'
      const response = checkRedirectResponse(uri)
      expect(response).toBe(null)
    })
    it('return null: "/"', () => {
      const uri = '/'
      const response = checkRedirectResponse(uri)
      expect(response).toBe(null)
    })
    it('return null: "/bar/foo/"', () => {
      const uri = '/bar/foo/'
      const response = checkRedirectResponse(uri)
      expect(response).toBe(null)
    })
  })
})
