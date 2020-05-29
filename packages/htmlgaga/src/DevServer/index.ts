/**
 * Copyright 2020-present, Sam Chen.
 * 
 * Licensed under GPL-3.0-or-later
 * 
 * This file is part of htmlgaga.

    htmlgaga is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    htmlgaga is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with htmlgaga.  If not, see <https://www.gnu.org/licenses/>.
 */
import webpack from 'webpack'
import * as path from 'path'
import collectPages from '../collectFiles'
import deriveEntryKeyFromRelativePath from './deriveEntryKeyFromRelativePath'
import deriveFilenameFromRelativePath from './deriveFilenameFromRelativePath'
import { logger } from '../config'
import express from 'express'
import devMiddleware from 'webpack-dev-middleware'
import http from 'http'
import isHtmlRequest from './isHtmlRequest'
import { searchPageEntry } from '../ProdBuilder'
import findRawFile from './findRawFile'
import hasClientEntry from './hasClientEntry'
import createWebpackConfig from './createWebpackConfig'
import newHtmlWebpackPlugin from './newHtmlWebpackPlugin'
import watchCompilation from './watchCompilation'
import createWebSocketServer from './createWebSocketServer'

export interface EntryObject {
  [index: string]: [string, ...string[]]
}
export interface Server {
  start(): Promise<express.Application | void>
}

class Page {
  page: string
  url: string
  constructor(page: string, url: string) {
    this.page = page
    this.url = url
  }
}

class DevServer implements Server {
  readonly #cwd: string
  readonly #pagesDir: string
  readonly #host: string
  readonly #port: number
  #pages: string[]
  #entrypoints: EntryObject // save entries for webpack compiling
  #httpServer: http.Server

  constructor(pagesDir: string, { host, port }) {
    this.#pagesDir = pagesDir
    this.#cwd = path.resolve(pagesDir, '..')
    this.#host = host
    this.#port = port
    this.#entrypoints = {} as EntryObject
  }

  private listen() {
    this.#httpServer
      .listen(this.#port, this.#host, () => {
        const server = `http://${this.#host}:${this.#port}`
        const results = this.#pages
          .sort((a, b) => a.split(path.sep).length - b.split(path.sep).length)
          .map((page) => {
            return new Page(
              path.relative(this.#pagesDir, page),
              `${server}/${deriveFilenameFromRelativePath(
                this.#pagesDir,
                page
              )}`
            )
          })
        console.table(results)
      })
      .on('error', (err) => {
        logger.info(
          `You might run server on another port with option like --port 9999`
        )
        throw err
      })
  }

  public async start(): Promise<express.Application | void> {
    // collect all pages when server start so we can print pages' table
    logger.info('Collecting pages')
    this.#pages = await collectPages(this.#pagesDir, searchPageEntry)

    if (this.#pages.length === 0) {
      logger.warn(
        'No pages found under `pages`, you might want to add one later'
      )
    }

    const socketPath = '/__websocket'
    const webpackConfig = createWebpackConfig(
      (): EntryObject => this.#entrypoints,
      this.#pagesDir,
      `${this.#host}:${this.#port}${socketPath}`
    )
    const compiler = webpack(webpackConfig)

    const devMiddlewareInstance = devMiddleware(compiler)

    const socketClient = `${require.resolve('../Client')}`

    const app = express()

    // TODO extract this into middleware
    app.use((req, res, next) => {
      if (isHtmlRequest(req.url)) {
        // check if page does exit on disk
        const page = findRawFile(this.#pagesDir, req.url)

        if (page.exists) {
          const src = page.src as string

          if (!this.#pages.includes(src)) {
            // update pages' table
            this.#pages.push(src)
          }

          const entryKey = deriveEntryKeyFromRelativePath(this.#pagesDir, src)
          const hasClientJs = hasClientEntry(src)

          // if entry not added to webpack yet
          if (!this.#entrypoints[entryKey]) {
            const entries: EntryObject = {
              [entryKey]: [socketClient, src],
            }

            if (hasClientJs.exists === true) {
              entries[
                deriveEntryKeyFromRelativePath(
                  this.#pagesDir,
                  hasClientJs.clientEntry as string
                )
              ] = [hasClientJs.clientEntry as string]
            }

            this.#entrypoints = {
              ...this.#entrypoints,
              ...entries,
            }
            // @ts-ignore
            // ts reports error because html-webpack-plugin uses types from @types/webpack
            // while we have types from webpack 5
            newHtmlWebpackPlugin(this.#pagesDir, src).apply(compiler)
            devMiddlewareInstance.invalidate()
          } else {
            // TODO
            // check if clientJs exists in this.#entrypoints
            if (hasClientJs.exists === true) {
              if (!this.#entrypoints[`${entryKey}-client`]) {
                // user add a client.js
                // should update this.#entrypoints?
              }
            }
          }
        } else {
          // TODO remove from this.#pages if presented
          res.status(404).end('Page Not Found')
        }
      }
      next()
    })
    app.use(devMiddlewareInstance)
    app.use(express.static(this.#cwd)) // serve statics from ../fixture, etc.

    this.#httpServer = http.createServer(app)
    const wsServer = createWebSocketServer(this.#httpServer, socketPath)
    watchCompilation(compiler, wsServer)
    this.listen()

    return app
  }
}
export default DevServer
