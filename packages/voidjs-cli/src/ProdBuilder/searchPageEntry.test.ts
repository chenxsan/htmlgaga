import { searchPageEntry } from './index'
import { describe, expect } from '@jest/globals'

const exts = 'mjs,js,jsx,ts,tsx,md,mdx'
const clientSuffix = '.client'
describe('searchPageEntry', () => {
  it('should pass for page entry', () => {
    exts.split(',').forEach((ext) => {
      expect(searchPageEntry(`/app/index.${ext}`)).toBe(true)
    })
    exts.split(',').forEach((ext) => {
      expect(searchPageEntry(`/app/index${clientSuffix}.hello.${ext}`)).toBe(
        true
      )
    })
  })
  it('should fail for client side JavaScript entry', () => {
    exts.split(',').forEach((ext) => {
      expect(searchPageEntry(`/app/index${clientSuffix}.${ext}`)).toBe(false)
    })
  })
})
