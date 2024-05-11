import { type Localization } from './types'

const cache: Record<string, string> = {}

export default function (key: keyof Localization, fallback?: string): string {
  if (cache[key]) {
    return cache[key]
  }

  if (typeof chrome === 'object' && typeof chrome['i18n'] === 'object') {
    const localized = chrome.i18n.getMessage(key)

    if (localized.length > 0) {
      cache[key] = localized

      return localized
    }
  }

  if (fallback) {
    return fallback
  }

  return key // fallback to the key itself
}
