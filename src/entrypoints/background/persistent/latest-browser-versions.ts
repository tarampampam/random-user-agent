import type { DeepReadonly } from '../../../types'
import type StorageArea from './storage-area.ts'

type State = {
  versions: Partial<{
    chrome: number
    firefox: number
    opera: number
    safari: number
    edge: number
  }>
  updatedAt: number
}

export type ReadonlyVersionsState = DeepReadonly<State['versions']>

type MDNReleaseRecord = Readonly<{
  release_date?: string // YYYY-MM-DD, e.g. "2012-11-20", n/a for planned (beta) releases
  status: 'retired' | 'current' | 'beta' | 'nightly' | 'planned'
  release_notes?: string // URL, e.g. "https://blogs.opera.com/desktop/2023/06/opera-100-0-4815-30-stable-update/"
  engine_version?: string // e.g. "614.4.6" or "84"
}>

export default class {
  private readonly storage: StorageArea<State>

  constructor(storage: StorageArea<State>) {
    this.storage = storage
  }

  /** Fetches the latest browser versions and stores it in the storage. */
  async update(): Promise<void> {
    // fetch the data for all browsers in parallel and extract the latest stable version
    const [chrome, firefox, opera, safari, edge] = (
      await Promise.all([
        this.fetchBrowserData('chrome'),
        this.fetchBrowserData('firefox'),
        this.fetchBrowserData('opera'),
        this.fetchBrowserData('safari'),
        this.fetchBrowserData('edge'),
      ])
    ).map((records: Array<MDNReleaseRecord> | null): MDNReleaseRecord | null => {
      if (!records) {
        return null // no data = no record
      }

      // try to find the latest stable (current) release
      const current = records.filter((release) => release.status === 'current').sort(this.sortByDate)
      if (current.length) {
        return current[0]
      }

      // if there is no stable release, return the latest public release
      return records.sort(this.sortByDate).find((release) => release.status === 'retired') || records[0]
    })

    /** Since the Opera is a bit special, we need to extract the version from the release notes link :D */
    const operaVersionFromReleaseNotes = (releaseNotes: string | undefined): string | undefined => {
      if (!releaseNotes) {
        return undefined
      }

      const match = releaseNotes.match(/opera-(\d+)/)
      if (!match) {
        return undefined
      }

      return match[1]
    }

    // read the current state and update the versions to use them if the new data is missing
    const current = await this.storage.get()

    await this.storage.set({
      versions: {
        chrome: this.extractMajor(chrome?.engine_version) ?? current?.versions?.chrome,
        firefox: this.extractMajor(firefox?.engine_version) ?? current?.versions?.firefox,
        opera: this.extractMajor(operaVersionFromReleaseNotes(opera?.release_notes)) ?? current?.versions?.opera,
        safari: this.extractMajor(safari?.engine_version) ?? current?.versions?.safari,
        edge: this.extractMajor(edge?.engine_version) ?? current?.versions?.edge,
      },
      updatedAt: Date.now(),
    })
  }

  async get(): Promise<readonly [ReadonlyVersionsState | undefined, Readonly<Date> | undefined]> {
    const state = await this.storage.get()

    return [state?.versions, state?.updatedAt ? new Date(state.updatedAt) : undefined]
  }

  async clear(): Promise<void> {
    await this.storage.clear()
  }

  /** Fetch the browser versions data from MDN. */
  private async fetchBrowserData<
    T extends
      | 'chrome'
      | 'firefox'
      | 'opera'
      | 'safari'
      | 'edge'
      | 'safari_ios'
      | 'webview_android'
      | 'chrome_android'
      | 'firefox_android'
      | 'opera_android',
  >(browser: T): Promise<Array<MDNReleaseRecord> | null> {
    // the filename is the same as the browser name (e.g. "chrome.json") in current major version (v5) of the MDN data:
    // https://cdn.jsdelivr.net/gh/mdn/browser-compat-data@5/browsers/ - list of all available files
    // https://github.com/mdn/browser-compat-data/tree/main/browsers - GitHub repository
    //
    // about the caching on the jsdelivr side - the data is cached for 7 days:
    // https://www.jsdelivr.com/documentation#id-caching
    const resp = await fetch(`https://cdn.jsdelivr.net/gh/mdn/browser-compat-data@5/browsers/${browser}.json`)
    if (resp.ok) {
      const releases = (await resp.json())?.browsers[browser]?.releases
      if (releases) {
        return Object.values(releases)
      }
    }

    return null
  }

  /** Sorts the records by the release date. */
  private sortByDate = <T extends MDNReleaseRecord>(a: T, b: T) =>
    (a.release_date ? new Date(a.release_date).getTime() : 0) -
    (b.release_date ? new Date(b.release_date).getTime() : 0)

  /** Extract the major version from a string. If the string is empty or doesn't contain a number, return undefined. */
  private extractMajor = (str: string | undefined): number | undefined => {
    if (!str) {
      return undefined
    }

    const major = parseInt(str.replaceAll(/[^\d.]/g, '').split('.')[0])

    return isNaN(major) ? undefined : major
  }
}
