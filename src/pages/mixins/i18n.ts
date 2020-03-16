export default {
  methods: {

    /**
     * Localize string (with fallback value).
     *
     * @param {string} key Localization key
     * @param {string} fallback Fallback string, if passed key is unknown or empty
     */
    i18n: (key: string, fallback: string): string => {
      let result = chrome.i18n.getMessage(key);

      return result === ''
        ? fallback
        : result;
    },

  },
};
