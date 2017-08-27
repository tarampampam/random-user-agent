/* global chrome, API */

/**
 * This file is part of Random User-Agent Browser Extension
 * @link https://github.com/tarampampam/random-user-agent
 *
 * Everyone is permitted to copy and distribute verbatim or modified copies of this license
 * document, and changing it is allowed as long as the name is changed.
 *
 * DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE TERMS AND CONDITIONS FOR COPYING,
 * DISTRIBUTION AND MODIFICATION
 *
 * 0. You just DO WHAT THE FUCK YOU WANT TO.
 */

"use strict";

/**
 * Hook for cookie injection
 */
 
chrome.webRequest.onHeadersReceived.addListener(function(details) {

  //                 !!! IMPORTANT !!!
  // --------------------------------------------------
  // chrome.runtime.sendMessage API does not works here
  // --------------------------------------------------
  //                 !!! IMPORTANT !!!

  if (API.settings.getEnabled() === true && API.settings.getJavascriptProtectionEnabled()) {
    var useragent = API.useragent.get();
    if (typeof useragent === 'string') {
      // Make wildcard search in exceptions list
      //console.log('Catch URI "' + details.url + '"');

      if (API.exceptions.uriMatch({uri: details.url})) {
        console.info('Ignore URI "' + details.url + '"');
        return;
      }

      details.responseHeaders.push({ name: "Set-Cookie", value: 'RUA_TRANSPORT_COOKIE=' + encodeURIComponent(useragent) + ';' });
      return { responseHeaders: details.responseHeaders };
    }
  }
}, {urls: ["<all_urls>"]}, ["blocking", "responseHeaders"]);