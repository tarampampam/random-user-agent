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
    major: {min: 104, max: 108}, // periodically we should update those values
    minor: {static: 0},
    patch: {min: 5112, max: 5249},
    build: {min: 132, max: 218},
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
    major: {min: 107, max: 123}, // periodically we should update those values
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
    major: {min: 78, max: 90}, // periodically we should update those values
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
    major: {min: 537, max: 611}, // periodically we should update those values
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
    major: {min: 102, max: 105}, // periodically we should update those values
    minor: {static: 0},
    patch: {min: 1245, max: 1343},
    build: {min: 33, max: 91},
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
