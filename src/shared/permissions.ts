type Permissions = chrome.permissions.Permissions

const permissions: Permissions = {
  origins: ['<all_urls>'],
}

/**
 * Check if the extension has the necessary permissions. In addition, if the permissions are not granted, it can
 * open the onboarding page.
 */
export const checkPermissions = async (openOnboardingPageIfNot: boolean = false): Promise<boolean> => {
  return new Promise((resolve) => {
    chrome.permissions.contains(permissions, async (has): Promise<void> => {
      if (openOnboardingPageIfNot && !has) {
        await chrome.tabs.create({ url: chrome.runtime.getURL('/onboard/index.html') })
      }

      return resolve(has)
    })
  })
}

/** Ask the user for the necessary permissions. Must be called from a user gesture. */
export const askForPermissions = async (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    chrome.permissions.request(permissions, (granted) => {
      if (chrome.runtime.lastError) {
        return reject(new Error(chrome.runtime.lastError.message))
      }

      resolve(granted)
    })
  })
}

/** Watch for changes in the permissions. */
export const watchPermissionsChange = (fn: (delta: Permissions) => void): void => {
  chrome.permissions.onAdded.addListener(fn)
  chrome.permissions.onRemoved.addListener(fn)
}
