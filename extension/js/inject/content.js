/* global chrome */

/*!
 * This file is part of Random User-Agent Browser Extension
 * @link https://github.com/tarampampam/random-user-agent
 *
 * Copyright (C) 2016 tarampampam <github.com/tarampampam>
 *
 * Everyone is permitted to copy and distribute verbatim or modified copies of this license
 * document, and changing it is allowed as long as the name is changed.
 *
 * DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE TERMS AND CONDITIONS FOR COPYING,
 * DISTRIBUTION AND MODIFICATION
 *
 * 0. You just DO WHAT THE FUCK YOU WANT TO.
 */

chrome.runtime.sendMessage([
  {action: 'settings.getEnabled'},
  {action: 'settings.getJavascriptProtectionEnabled'},
  {action: 'useragent.get'},
  {action: 'exceptions.uriMatch', data: {uri: window.location.href}} // Make wildcard search in exceptions list
], function(results) {
  var enabled = results[0],
    js_protection_enabled = results[1],
    useragent = results[2],
    uri_match = results[3];
  if (enabled === true) {
    if (js_protection_enabled === true) {
      if (typeof useragent === 'string' && useragent !== '') {
        if (uri_match === false) {
          var injection_code = '(' + function(new_useragent) {
                if (typeof window === 'object' && typeof window.navigator === 'object') {
                  navigator = Object.create(window.navigator);
                  Object.defineProperties(navigator, {
                    userAgent:  {get: function() {return new_useragent;}},
                    appVersion: {get: function() {return new_useragent;}}
                  });
                  Object.defineProperty(window, 'navigator', {
                    value: navigator, configurable: false, enumerable: false, writable: false
                  });
                }
              } + ')("' + useragent.replace(/([\"\'])/g, '\\$1') + '");';
          var script = document.createElement('script');
          script.textContent = injection_code;
          document.documentElement.appendChild(script);
          script.remove();
          if (typeof navigator === 'object') {
            Object.defineProperties(navigator, {
              userAgent:  {get: function() {return useragent;}},
              appVersion: {get: function() {return useragent;}}
            });
          }
        }
      }
    }
  }
});
