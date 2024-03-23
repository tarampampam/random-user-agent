// Assert that passed string (what) matches wildcard (pattern). The case is ignored. Allowed sugar is: * and ?
export function matchesWildcard(what: string, pattern: string): boolean {
  const rule = pattern
    .replace(/[[\]{}()+.\\^$|]/g, '\\$&') // escape regex tokens, except for * and ?
    .replace(/[*?]/g, '.$&') // replace * and ? with their regex counterparts

  return new RegExp(`^${rule}$`, 'i').test(what)
}

// Converts passed URI into a pattern. On wrong, URI empty string will be returned
export function uriToPattern(uri: string): string {
  try {
    const url = new URL(uri)

    if (url.protocol !== '' && url.hostname !== '') {
      return url.protocol.replace(/^https?/i, 'http?') + '//' + url.hostname + '/*'
    }
  } catch (_) {
    // do nothing
  }

  return ''
}
