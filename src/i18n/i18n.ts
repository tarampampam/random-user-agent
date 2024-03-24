import type { Localization } from './types'

export default function i18n(key: keyof Localization, fallback?: string): string {
  if (typeof chrome === 'object' && typeof chrome['i18n'] === 'object') {
    const localized = chrome.i18n.getMessage(key)

    if (localized.length > 0) {
      return localized
    }
  }

  if (fallback) {
    return fallback
  }

  return key // fallback to the key itself
}
