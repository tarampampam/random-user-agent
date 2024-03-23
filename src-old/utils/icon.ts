export enum IconState {
  Active,
  Inactive,
}

export function setExtensionIcon(state: IconState, tabId?: number) {
  const details: chrome.browserAction.TabIconDetails = {
    path: {},
  }

  switch (state) {
    case IconState.Inactive:
      details.path = {
        // 16: 'icons/logo/16-gray.png',
        48: 'icons/logo/48-gray.png',
        128: 'icons/logo/128-gray.png',
      }
      break

    case IconState.Active:
      details.path = {
        // 16: 'icons/logo/16.png',
        48: 'icons/logo/48.png',
        128: 'icons/logo/128.png',
      }
  }

  if (typeof tabId === 'number') {
    details.tabId = tabId
  }

  chrome.browserAction.setIcon(details, (): void => {})
}
