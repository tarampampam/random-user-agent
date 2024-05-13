import punycode from 'punycode'

/**
 * Converts the domain to its canonical form. It supports dirty URLs as input and returns the canonical domain. This
 * means the domain is converted to lowercase, the protocol is removed, the path is removed, multiple dots are
 * replaced with a single one, and spaces are removed. If the domain contains non-ASCII characters, it is
 * converted to punycode.
 *
 * @link https://www.punycoder.com/ - The sandbox
 */
export const canonizeDomain = (domain: string): string => {
  const clean = domain
    .toLowerCase() // convert to lowercase
    .replace(/\s/g, '') // remove spaces, tabs, and newlines
    .replace(/\.{2,}/g, '.') // replace multiple dots with a single one
    .replace(/^https?:\/\//, '') // remove the protocol
    .replace(/\/.*$/, '') // remove the path

  // if the domain contains non-ASCII characters, use the punycode - https://github.com/mathiasbynens/punycode.js
  if (!clean.match(/^[-.:a-zA-Z\d]{2,}$/)) {
    return punycode.toASCII(clean)
  }

  return clean
}

/**
 * Converts the domain from its canonical form to the human-readable form. In addition to punycode, it converts
 * multiple dots to a single one and removes spaces.
 */
export const deCanonizeDomain = (domain: string): string =>
  punycode.toUnicode(
    domain
      .toLowerCase()
      .replace(/\s/g, '') // remove spaces, tabs, and newlines
      .replace(/\.{2,}/g, '.') // replace multiple dots with a single one
  )
