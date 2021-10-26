import { defineComponent } from 'vue'

export default defineComponent({
  methods: {

    // Localize string (with the fallback value)
    i18n: (key: string, fallback?: string): string => {
      const localized = chrome.i18n.getMessage(key)

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
