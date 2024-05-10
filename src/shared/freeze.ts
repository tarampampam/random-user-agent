/** Deeply freezes an object. */
export const deepFreeze = <T extends Record<string, T | unknown>>(v: T) => {
  Object.keys(v).forEach((property) => {
    if (typeof v[property] === 'object' && !Object.isFrozen(v[property])) {
      deepFreeze(v[property] as T)
    }
  })

  return Object.freeze(v)
}
