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
  // all versions: https://en.wikipedia.org/wiki/Google_Chrome_version_history
  private variants = {
    major: {min: 112, max: 114}, // periodically we should update those values
    minor: {static: 0},
    patch: {min: 5615, max: 5672},
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
  // all versions: https://en.wikipedia.org/wiki/Firefox_version_history
  private variants = {
    major: {min: 111, max: 123}, // periodically we should update those values
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
    major: {min: 96, max: 97}, // periodically we should update those values
    minor: {static: 0},
    patch: {min: 2889, max: 4480},
    build: {min: 24, max: 198},
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
    major: {min: 111, max: 113}, // periodically we should update those values
    minor: {static: 0},
    patch: {min: 1661, max: 1722},
    build: {min: 33, max: 62},
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
