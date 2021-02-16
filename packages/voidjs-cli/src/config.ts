/**
 * Copyright 2020-present, Sam Chen.
 *
 * Licensed under GPL-3.0-or-later
 *
 * This file is part of voidjs.

    voidjs is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    voidjs is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with voidjs.  If not, see <https://www.gnu.org/licenses/>.
 */
import { resolve, join } from 'path'
import pino from 'pino'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import fs from 'fs-extra'
import path from 'path'
import isPageEntry from './utils/isPageEntry'
import type { RuleSetRule } from 'webpack'
import gfm from 'remark-gfm'
import codeBlockMeta from './remark-plugins/code-block-meta'

// FIXME weird bug on windows
// it would resolve to voidjs\node_modules\@void-js\doc
// when I run `yarn dev` under voidjs\packages\doc
export const cwd = process.cwd()

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  prettyPrint: {
    translateTime: 'HH:MM:ss',
    ignore: 'pid,hostname',
  },
  serializers: {
    err: pino.stdSerializers.err,
    error: pino.stdSerializers.err,
  },
})

const assetsRoot = 'static'

export const alias = {
  img: resolve(cwd, `${assetsRoot}/img`),
  css: resolve(cwd, `${assetsRoot}/css`),
  js: resolve(cwd, `${assetsRoot}/js`),
}
export const publicFolder = 'public'
export const socketPath = '/__websocket'

export const resolveExtensions = ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.json']

export const performance: Performance = require('perf_hooks').performance
export const PerformanceObserver = require('perf_hooks').PerformanceObserver

export const supportedImageExtensions = /\.(png|svg|jpg|jpeg|gif|avif|webp)$/i
export const supportedFontExtensions = /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/
export const supportedCssExtensions = /\.(sa|sc|c)ss$/i

const tailwindcssEnabled: boolean = fs.existsSync(
  join(cwd, 'tailwind.config.js')
)

export const postcssPlugins = tailwindcssEnabled
  ? [require('tailwindcss'), require('autoprefixer')]
  : [require('autoprefixer')]

const babelPresets = [
  '@babel/preset-env',
  [
    '@babel/preset-react',
    {
      throwIfNamespace: false,
      runtime: 'automatic',
    },
  ],
  '@babel/preset-typescript',
]
export const getRules = (pagesDir: string, hasApp: boolean): RuleSetRule[] => [
  {
    test: /\.(js|jsx|ts|tsx|mjs)$/i,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: [...babelPresets],
          plugins: [
            [
              '@babel/plugin-transform-runtime',
              {
                regenerator: true,
              },
            ],
          ],
          // cacheDirectory: true,
          // cacheCompression: false,
          overrides: [
            {
              include: function (filename: string): boolean {
                return isPageEntry(pagesDir, filename)
              },
              plugins: [
                [
                  'wrap-voidjs-app',
                  {
                    app: hasApp === true ? path.join(pagesDir, '_app') : hasApp,
                  },
                ],
              ],
            },
          ],
        },
      },
    ],
  },
  {
    test: /\.(md|mdx)$/i,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: [...babelPresets],
          // cacheDirectory: true,
          // cacheCompression: false,
          overrides: [
            {
              include: function (filename: string): boolean {
                return isPageEntry(pagesDir, filename)
              },
              plugins: [
                [
                  'wrap-voidjs-app',
                  {
                    app: hasApp === true ? path.join(pagesDir, '_app') : hasApp,
                  },
                ],
              ],
            },
          ],
        },
      },
      {
        loader: 'xdm/webpack.cjs',
        options: {
          providerImportSource: '@mdx-js/react',
          remarkPlugins: [gfm, codeBlockMeta],
        },
      },
    ],
  },
  {
    test: supportedImageExtensions,
    type: 'asset/resource',
    generator: {
      filename: '[name].[hash][ext][query]',
    },
  },
  {
    test: supportedFontExtensions,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[name][ext]',
    },
  },
  {
    test: supportedCssExtensions,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            ident: 'postcss',
            plugins: postcssPlugins,
          },
        },
      },
      'sass-loader',
    ],
  },
]

// rules for client compiler
export const rules: RuleSetRule[] = [
  {
    test: /\.(js|jsx|ts|tsx|mjs)$/i,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: [...babelPresets],
          plugins: [
            [
              '@babel/plugin-transform-runtime',
              {
                regenerator: true,
              },
            ],
          ],
          cacheDirectory: true,
          cacheCompression: false,
        },
      },
    ],
  },
  {
    test: /\.(md|mdx)$/i,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: [...babelPresets],
          cacheDirectory: true,
          cacheCompression: false,
        },
      },
      {
        loader: 'xdm/webpack.cjs',
        options: {
          providerImportSource: '@mdx-js/react',
          remarkPlugins: [gfm, codeBlockMeta],
        },
      },
    ],
  },
  {
    test: supportedImageExtensions,
    type: 'asset/resource',
    generator: {
      filename: '[name].[hash][ext][query]',
    },
  },
  {
    test: supportedFontExtensions,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[name][ext]',
    },
  },
  {
    test: supportedCssExtensions,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            ident: 'postcss',
            plugins: postcssPlugins,
          },
        },
      },
      'sass-loader',
    ],
  },
]
// where in output.path to store assets
export const assetsPath = '_voidjs'
