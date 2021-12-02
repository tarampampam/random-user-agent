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
  abstract version(): string
}

export const randomChromeVersion = new class extends Version {
  // all versions: https://en.wikipedia.org/wiki/Google_Chrome_version_history
  private variants = {
    major: {min: 95, max: 97}, // periodically we should update those values
    minor: {static: 0},
    patch: {min: 4638, max: 4692},
    build: {min: 36, max: 212},
  }

  version(): string {
    return [
      this.fromRange(this.variants.major.min, this.variants.major.max),
      this.variants.minor.static,
      this.fromRange(this.variants.patch.min, this.variants.patch.max),
      this.fromRange(this.variants.build.min, this.variants.build.max),
    ].join('.')
  }
}

export const randomFirefoxVersion = new class extends Version {
  // all versions: https://en.wikipedia.org/wiki/Firefox_version_history
  private variants = {
    major: {min: 91, max: 98}, // periodically we should update those values
    minor: {static: 0},
    patch: {variants: ['esr']},
  }

  version(): string {
    return this.fromRange(this.variants.major.min, this.variants.major.max) + '.'
      + this.variants.minor.static.toString()
      + (this.fromRange(0, 9) < 3 ? this.pickRandom(this.variants.patch.variants) : '')
  }
}

export const randomOperaVersion = new class extends Version {
  // all versions: https://en.wikipedia.org/wiki/Opera_version_history
  private variants = {
    major: {min: 75, max: 80}, // periodically we should update those values
    minor: {static: 0},
    patch: {min: 1889, max: 4170},
    build: {min: 24, max: 198},
  }

  version(): string {
    return [
      this.fromRange(this.variants.major.min, this.variants.major.max),
      this.variants.minor.static,
      this.fromRange(this.variants.patch.min, this.variants.patch.max),
      this.fromRange(this.variants.build.min, this.variants.build.max),
    ].join('.')
  }
}

export const randomSafariVersion = new class extends Version {
  // all versions: https://en.wikipedia.org/wiki/Safari_version_history
  private variants = {
    major: {min: 537, max: 611}, // periodically we should update those values
    minor: {min: 1, max: 36},
    patch: {min: 1, max: 15},
  }

  version(): string {
    return [
      this.fromRange(this.variants.major.min, this.variants.major.max),
      this.fromRange(this.variants.minor.min, this.variants.minor.max),
      (this.fromRange(0, 9) < 3 ? this.fromRange(this.variants.patch.min, this.variants.patch.max) : '')
    ].filter(s => s.toString().length > 0).join('.')
  }
}

export const randomEdgeVersion = new class extends Version {
  // all versions: https://docs.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel
  private variants = {
    major: {min: 93, max: 96}, // periodically we should update those values
    minor: {static: 0},
    patch: {min: 864, max: 1020},
    build: {min: 0, max: 68},
  }

  version(): string {
    return [
      this.fromRange(this.variants.major.min, this.variants.major.max),
      this.variants.minor.static,
      this.fromRange(this.variants.patch.min, this.variants.patch.max),
      this.fromRange(this.variants.build.min, this.variants.build.max),
    ].join('.')
  }
}
