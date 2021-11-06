import { defineComponent } from 'vue'

export default defineComponent({
  methods: {

    // Localize string (with the fallback value)
    i18n(key: string, fallback?: string): string {
      let localized: string = ''

      if (typeof chrome === 'object' && typeof chrome['i18n'] === 'object') {
        localized = chrome.i18n.getMessage(key)
      } else {
        // i18n API is not available (page loaded outside of the extension sandbox?)
      }

      if (localized.length > 0) {
        return localized
      }

      if (fallback !== undefined) {
        return fallback
      }

      return key
    },

  },
})
