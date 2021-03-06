import fn from './splitter'
import { describe, it, expect } from '@jest/globals'
describe('splitter', () => {
  it('should return null', () => {
    expect(fn(``)).toBeNull()
  })
  it('should return filename', () => {
    expect(fn(`filename=index.js`)).toEqual(['filename=index.js'])
  })
  it('should return filename', () => {
    expect(fn(`filename="index.js"`)).toEqual(['filename="index.js"'])
  })
  it('should return filename', () => {
    expect(fn(`filename='index.js'`)).toEqual([`filename='index.js'`])
  })
  it('should return filename', () => {
    expect(fn(`filename='pages/void js/index.js' a=b`)).toEqual([
      `filename='pages/void js/index.js'`,
      'a=b',
    ])
  })
})
