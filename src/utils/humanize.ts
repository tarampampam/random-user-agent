import UseragentInfo from '../useragent/useragent-info'

export function humanizeUserAgent(ua: UseragentInfo): string {
  const parts: string[] = []

  switch (ua.browser) {
    case 'chrome':
      parts.push('🌐 Chrome')
      break

    case 'firefox':
      parts.push('🦊 FireFox')
      break

    case 'opera':
      parts.push('⭕ Opera')
      break

    case 'safari':
      parts.push('🧭 Safari')
      break

    case 'edge':
      parts.push('🛸 Edge')
      break

    default:
      parts.push('👻 Browser')
  }

  if (ua.brandBrowserVersion && ua.brandBrowserVersion.major > 0) {
    parts.push(`(v${ua.brandBrowserVersion.major})`)
  } else if (ua.browserVersion.major > 0) {
    parts.push(`(v${ua.browserVersion.major})`)
  }

  switch (ua.osType) {
    case 'windows':
      parts.push('🖥 Windows')
      break

    case 'linux':
      parts.push('🐧 Linux')
      break

    case 'macOS':
      parts.push('🍏 macOS')
      break

    case 'iOS':
      parts.push('🍏 iOS')
      break

    case 'android':
      parts.push('📱 Android')
      break

    default:
      parts.push('🧮 Device')
  }

  return parts.join(' ')
}
