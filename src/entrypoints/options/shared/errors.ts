/** Throw an error if the given value is not null or undefined */
export const throwIfErr = (err: unknown): void => {
  if (err) {
    throw err
  }
}
