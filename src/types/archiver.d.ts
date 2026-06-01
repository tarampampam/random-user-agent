declare module 'archiver' {
  import type { Transform } from 'node:stream'
  import type { ZlibOptions } from 'node:zlib'

  export interface ZipArchiveOptions {
    zlib?: ZlibOptions
  }

  export class ZipArchive extends Transform {
    constructor(options?: ZipArchiveOptions)
    directory(dirpath: string, destpath: false | string): this
    finalize(): Promise<void>
  }
}
