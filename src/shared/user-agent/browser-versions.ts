/** Generate a random number between a range. */
const fromRange = (min: number, max: number): number => {
  min = Math.ceil(min)

  return Math.floor(Math.random() * (Math.floor(max) - min + 1)) + min
}

/** @link https://chromereleases.googleblog.com/search/label/Desktop%20Update */
export const chrome = (maxMajor?: number, majorDelta: number = 2): [major: number, full: string] => {
  const variants = {
    major: { min: 136, max: 138 }, // 👈 periodically we should update those values
    patch: { min: 6834, max: 7204 }, // 👈 same here
    build: { min: 85, max: 101 }, // 👈 and here
  }

  if (maxMajor) {
    variants.major.max = Math.max(maxMajor, 0)
    variants.major.min = Math.max(maxMajor - majorDelta, 0)
  }

  const major = fromRange(variants.major.min, variants.major.max)

  return [
    major,
    `${major}.0.${fromRange(variants.patch.min, variants.patch.max)}.${fromRange(variants.build.min, variants.build.max)}`,
  ]
}

/** @link https://www.mozilla.org/en-US/firefox/releases/ */
export const firefox = (maxMajor?: number, majorDelta: number = 2): [major: number, full: string] => {
  const variants = {
    major: { min: 138, max: 140 }, // 👈 periodically we should update those values
  }

  if (maxMajor) {
    variants.major.max = Math.max(maxMajor, 0)
    variants.major.min = Math.max(maxMajor - majorDelta, 0)
  }

  const major = fromRange(variants.major.min, variants.major.max)

  return [major, `${major}.0${Math.random() < 0.3 ? 'esr' : ''}`]
}

/** @link https://en.wikipedia.org/wiki/Opera_version_history */
export const opera = (maxMajor?: number, majorDelta: number = 2): [major: number, full: string] => {
  const variants = {
    major: { min: 116, max: 119 }, // 👈 periodically we should update those values
    patch: { min: 5067, max: 5322 }, // 👈 same here
    build: { min: 16, max: 198 }, // 👈 and here
  }

  if (maxMajor) {
    variants.major.max = Math.max(maxMajor, 0)
    variants.major.min = Math.max(maxMajor - majorDelta, 0)
  }

  const major = fromRange(variants.major.min, variants.major.max)

  return [
    major,
    `${major}.0.${fromRange(variants.patch.min, variants.patch.max)}.${fromRange(variants.build.min, variants.build.max)}`,
  ]
}

export const safari = (maxMajor?: number, majorDelta: number = 2): [major: number, full: string] => {
  const variants = {
    major: { min: 614, max: 632 }, // 👈 periodically we should update those values
    minor: { min: 1, max: 36 }, // 👈 same here
    patch: { min: 1, max: 15 }, // 👈 and here
  }

  if (maxMajor) {
    variants.major.max = Math.max(maxMajor, 0)
    variants.major.min = Math.max(maxMajor - majorDelta, 0)
  }

  const major = fromRange(variants.major.min, variants.major.max)

  return [
    major,
    `${major}.${fromRange(variants.minor.min, variants.minor.max)}${Math.random() < 0.3 ? `.${fromRange(variants.patch.min, variants.patch.max)}` : ''}`,
  ]
}

/** @link https://docs.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel */
export const edge = (maxMajor?: number, majorDelta: number = 2): [major: number, full: string] => {
  const variants = {
    major: { min: 136, max: 138 }, // 👈 periodically we should update those values
    patch: { min: 2903, max: 3351 }, // 👈 same here
    build: { min: 99, max: 112 }, // 👈 and here
  }

  if (maxMajor) {
    variants.major.max = Math.max(maxMajor, 0)
    variants.major.min = Math.max(maxMajor - majorDelta, 0)
  }

  const major = fromRange(variants.major.min, variants.major.max)

  return [
    major,
    `${major}.0.${fromRange(variants.patch.min, variants.patch.max)}.${fromRange(variants.build.min, variants.build.max)}`,
  ]
}
