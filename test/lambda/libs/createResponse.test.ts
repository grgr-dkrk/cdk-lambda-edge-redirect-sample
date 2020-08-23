import { createRedirectResponse } from '../../../src/lambda/libs'

describe('createRedirectResponse', () => {
  it('snapshot: createRedirectResponse', () => {
    expect(createRedirectResponse('https://dkrk-blog.net')).toMatchSnapshot()
  })
  describe('status code', () => {
    it('status code: 301', () => {
      const { status } = createRedirectResponse('https://dkrk-blog.net', '301')
      expect(status).toBe('301')
    })
    it('status code: 302', () => {
      const { status } = createRedirectResponse('https://dkrk-blog.net', '302')
      expect(status).toBe('302')
    })
    it('status code: 307', () => {
      const { status } = createRedirectResponse('https://dkrk-blog.net', '307')
      expect(status).toBe('307')
    })
  })
  describe('status description', () => {
    it('status description: something', () => {
      const { statusDescription } = createRedirectResponse(
        'https://dkrk-blog.net',
        '301',
        'moved',
      )
      expect(statusDescription).toBe('moved')
    })
    it('status description: none', () => {
      const { statusDescription } = createRedirectResponse(
        'https://dkrk-blog.net',
      )
      expect(statusDescription).toBe(undefined)
    })
  })
})
