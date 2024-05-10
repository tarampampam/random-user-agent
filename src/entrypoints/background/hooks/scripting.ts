import RegisteredContentScript = chrome.scripting.RegisteredContentScript

// the common properties for the content scripts
const common: Omit<RegisteredContentScript, 'id'> = {
  matches: ['<all_urls>'],
  allFrames: true,
  runAt: 'document_start',
}

// properties for the content script that will be executed in the isolated world (as a content script)
const content: RegisteredContentScript = { ...common, id: 'content', js: ['content.js'] }

// properties for the content script that will be executed in the main world (as an injected script)
const inject: RegisteredContentScript = { ...common, id: 'inject', js: [__UNIQUE_INJECT_FILENAME__] }

/** Register the content scripts */
export async function registerContentScripts() {
  // first, unregister (probably) previously registered content scripts
  await chrome.scripting.unregisterContentScripts()

  try {
    await chrome.scripting.registerContentScripts([
      { ...content, world: 'ISOLATED' },
      { ...inject, world: 'MAIN' },
    ])
  } catch (err) {
    if (
      err instanceof Error &&
      err.message.toLowerCase().includes('unexpected property') &&
      err.message.includes('world')
    ) {
      // if so, it means that the "world" property is not supported by the current browser (FireFox at this moment)
      // so we need to register the content scripts without the "world" property
      //
      // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/scripting/RegisteredContentScript#browser_compatibility
      return await chrome.scripting.registerContentScripts([content])
    }

    throw err
  }
}
