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
import path from 'path'
import fs from 'fs-extra'
export interface ClientEntry {
  exists: boolean
  clientEntry?: string
}
export default function hasClientEntry(
  pageEntry: string,
  exts = 'js,ts'.split(',')
): ClientEntry {
  const { name, dir } = path.parse(pageEntry)
  for (let i = 0; i < exts.length; i++) {
    const ext = exts[i]
    // find clientEntry beside pageEntry
    const clientEntry = path.join(dir, `${name}.client.${ext}`)
    if (fs.existsSync(clientEntry)) {
      return {
        exists: true,
        clientEntry: clientEntry,
      }
    }
  }

  return {
    exists: false,
  }
}
