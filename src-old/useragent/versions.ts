import {BrowserVersion} from './useragent-info'

abstract class Version {
  // Returns a random integer between min (inclusive) and max (inclusive)
  protected fromRange(min: number, max: number): number {
    min = Math.ceil(min)

    return Math.floor(Math.random() * (Math.floor(max) - min + 1)) + min
  }

  // Returns a random element from passed list
  protected pickRandom(list: string[] | number[]): string | number {
    return list[Math.floor(Math.random() * list.length)]
  }

  // Returns randomized version as a string
  abstract version(): BrowserVersion
}

export const randomChromeVersion = new class extends Version {
  // all versions: https://chromereleases.googleblog.com/search/label/Desktop%20Update
  private variants = {
    major: {min: 122, max: 124}, // periodically we should update those values
    minor: {static: 0},
    patch: {min: 6261, max: 6356},
    build: {min: 194, max: 226},
  }

  version(): BrowserVersion {
    const major: number = this.fromRange(this.variants.major.min, this.variants.major.max)

    return {
      major: major,
      full: [
        major,
        this.variants.minor.static,
        this.fromRange(this.variants.patch.min, this.variants.patch.max),
        this.fromRange(this.variants.build.min, this.variants.build.max),
      ].join('.')
    }
  }
}

export const randomFirefoxVersion = new class extends Version {
  // all versions: https://www.mozilla.org/en-US/firefox/releases/
  private variants = {
    major: {min: 121, max: 123}, // periodically we should update those values
    minor: {static: 0},
    patch: {variants: ['esr']},
  }

  version(): BrowserVersion {
    const major: number = this.fromRange(this.variants.major.min, this.variants.major.max)

    return {
      major: major,
      full: major + '.'
        + this.variants.minor.static.toString()
        + (this.fromRange(0, 9) < 3 ? this.pickRandom(this.variants.patch.variants) : '')
    }
  }
}

export const randomOperaVersion = new class extends Version {
  // all versions: https://en.wikipedia.org/wiki/Opera_version_history
  private variants = {
    major: {min: 102, max: 108}, // periodically we should update those values
    minor: {static: 0},
    patch: {min: 4251, max: 5067},
    build: {min: 16, max: 198},
  }

  version(): BrowserVersion {
    const major: number = this.fromRange(this.variants.major.min, this.variants.major.max)

    return {
      major: major,
      full: [
        major,
        this.variants.minor.static,
        this.fromRange(this.variants.patch.min, this.variants.patch.max),
        this.fromRange(this.variants.build.min, this.variants.build.max),
      ].join('.')
    }
  }
}

export const randomSafariVersion = new class extends Version {
  // all versions: https://en.wikipedia.org/wiki/Safari_version_history
  // release notes: https://developer.apple.com/documentation/safari-release-notes/
  private variants = {
    major: {min: 614, max: 632}, // periodically we should update those values
    minor: {min: 1, max: 36},
    patch: {min: 1, max: 15},
  }

  version(): BrowserVersion {
    const major: number = this.fromRange(this.variants.major.min, this.variants.major.max)

    return {
      major: major,
      full: [
        major,
        this.fromRange(this.variants.minor.min, this.variants.minor.max),
        (this.fromRange(0, 9) < 3 ? this.fromRange(this.variants.patch.min, this.variants.patch.max) : '')
      ].filter(s => s.toString().length > 0).join('.')
    }
  }
}

export const randomEdgeVersion = new class extends Version {
  // all versions: https://docs.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel
  private variants = {
    major: {min: 120, max: 122}, // periodically we should update those values
    minor: {static: 0},
    patch: {min: 2210, max: 2365},
    build: {min: 61, max: 92},
  }

  version(): BrowserVersion {
    const major: number = this.fromRange(this.variants.major.min, this.variants.major.max)

    return {
      major: major,
      full: [
        major,
        this.variants.minor.static,
        this.fromRange(this.variants.patch.min, this.variants.patch.max),
        this.fromRange(this.variants.build.min, this.variants.build.max),
      ].join('.')
    }
  }
}
