import RpcRouter from "@/services/rpc/router";
import RpcHandlers from "@/services/rpc/handlers";
import Settings from "@/services/settings/settings";

const rpcRouter = new RpcRouter;
const settings = new Settings;
const rpcHandlers = new RpcHandlers(settings);

// Load settings from storage
settings.load()
  .then((): void => {
    // @todo: renew UA if UA renewing on startup is enabled
    // @todo: set auto-renew timer interval (using built-in chrome timer)
    // @todo: start renewal timer
    // @todo: update extension icon state
  })
  .catch((err): void => console.warn(err));

// Register RPC handlers for router
rpcHandlers.registerFor(rpcRouter);

/**
 * Register listener for incoming runtime messages processing.
 *
 * @link <https://developer.chrome.com/extensions/messaging>
 * @link <https://developer.chrome.com/extensions/runtime#event-onMessage>
 */
chrome.runtime.onMessage.addListener((request: any, sender, sendResponse: Function): boolean => {
  rpcRouter.handleRawRequest(request)
    .then((response): void => {
      console.debug(request, ' --> ', response);
      sendResponse(response);
    })
    .catch((err): void => console.error('Runtime error:', err));

  return true;
});

/**
 * Register listener for headers modification.
 *
 * @link <https://developer.chrome.com/extensions/webRequest#event-onBeforeSendHeaders>
 */
chrome.webRequest.onBeforeSendHeaders.addListener((details) => {
  if (settings.isEnabled()) {
    let ua = settings.getUserAgent();

    if (!ua) {
      return;
    }

    // @todo: `return` if `details.url` is in exceptions list
    // @todo: modify request `User-Agent` header

    return;
  }
}, {urls: ['<all_urls>']}, ['blocking', 'requestHeaders']);
