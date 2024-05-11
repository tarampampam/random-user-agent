// ⚠ DO NOT IMPORT ANYTHING EXCEPT TYPES HERE DUE THE `import()` ERRORS ⚠

// wrap everything to avoid polluting the global scope
// eslint-disable-next-line no-extra-semi
;(() => {
  try {
    // Important Note:
    //
    // Chromium-based browsers (like Chrome, Edge, Opera, etc.) support the `world` property in the
    // `chrome.scripting.registerContentScripts` API. However, FireFox does not. Therefore, I need to ensure that the
    // "inject" script code is executed in both environments.
    //
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/scripting/RegisteredContentScript

    const script = document.createElement('script')
    const parent = document.head || document.documentElement

    script.type = 'module'
    script.setAttribute('id', __UNIQUE_INJECT_FILENAME__)
    script.src = chrome.runtime.getURL(__UNIQUE_INJECT_FILENAME__)

    parent.prepend(script)
  } catch (err) {
    console.warn('🧨 RUA: An error occurred in the content script', err)
  }
})()
