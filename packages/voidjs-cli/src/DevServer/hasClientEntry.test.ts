import hasClientEntry from './hasClientEntry'
import path from 'path'
import { vol } from 'memfs'

import { expect, describe, beforeEach, afterEach } from '@jest/globals'
jest.mock('fs')
describe('hasClientEntry', () => {
  beforeEach(() => {
    vol.fromJSON(
      {
        './index.js': '',
        './index.client.js': '',
      },
      '/app'
    )
  })
  afterEach(() => {
    vol.reset()
  })
  it('should find clientEntry', () => {
    const result = hasClientEntry('/app/index.js')
    expect(result).toEqual({
      exists: true,
      clientEntry: path.join('/app/index.client.js'),
    })
  })
  it('should not find clientEntry', () => {
    const result = hasClientEntry('/app/test.js')
    expect(result).toEqual({
      exists: false,
    })
  })
})
