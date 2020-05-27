import ProdBuilder, { defaultOptions } from './index'
import { vol } from 'memfs'
jest.mock('fs')
describe('applyOptionsDefaults', () => {
  afterEach(() => {
    vol.reset()
  })
  it('should return defaultOptions', async () => {
    vol.fromJSON(
      {
        './pages/index.js': 'var a = 1;',
        './out/tmp': '',
      },
      '/app'
    )
    const builder = new ProdBuilder('/app/pages', '/app/out')
    builder.config = {}
    builder.applyOptionsDefaults()
    expect(builder.config).toEqual(defaultOptions)
  })
  it('should merge defaultOptions', async () => {
    vol.fromJSON(
      {
        './pages/index.js': 'var a = 1;',
        './out/tmp': '',
      },
      '/app'
    )
    const builder = new ProdBuilder('/app/pages', '/app/out')
    builder.config = {
      html: {
        pretty: false,
      },
    }
    builder.applyOptionsDefaults()
    expect(builder.config).toEqual({
      ...defaultOptions,
      html: {
        ...defaultOptions.html,
        pretty: false,
      },
    })
  })
})
