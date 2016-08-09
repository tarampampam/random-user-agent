/* global chrome, API */

"use strict";

/**
 * Hook for header replacement
 */
chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {

  //               !!! IMPORTANT !!!
  // -------------------------------------------------
  // chrome.runtime.sendMessage API does not work here
  // -------------------------------------------------
  //               !!! IMPORTANT !!!

  if (API.settings.getEnabled() === true) {
    var useragent = API.useragent.get();
    if (typeof useragent === 'string') {
      // Make wildcard search in exceptions list
      //console.log('Catch URI "' + details.url + '"');
      if (API.exceptions.uriMatch({uri: details.url})) {
        console.info('Ignore URI "' + details.url + '"');
        return;
      }
      // Find User-Agent header, and modify it
      for (var i = 0, len = details.requestHeaders.length; i < len; ++i) {
        if (details.requestHeaders[i].name === 'User-Agent') {
          details.requestHeaders[i].value = useragent;
          break;
        }
      }
      return {requestHeaders: details.requestHeaders};
    }
  }
}, {urls: ["<all_urls>"]}, ["blocking", "requestHeaders"]);