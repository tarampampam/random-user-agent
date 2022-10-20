export async function setExtensionTitle(title:string, tabId?: number) {
  const details: chrome.browserAction.TitleDetails = {
    title: title,
  }

  if (typeof tabId === 'number') {
    details.tabId = tabId
  }

  await chrome.browserAction.setTitle(details)
}
