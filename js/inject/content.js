/* global chrome */

/**
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

chrome.runtime.sendMessage({action: 'settings.getEnabled'}, function(enabled){
  if (enabled === true) {
    chrome.runtime.sendMessage({action: 'settings.getJavascriptProtectionEnabled'}, function(js_protection_enabled){
      if (js_protection_enabled === true) {
        chrome.runtime.sendMessage({action: 'useragent.get'}, function(useragent){
          if (typeof useragent === 'string') {
            // Make wildcard search in exceptions list
            chrome.runtime.sendMessage({
              action: 'exceptions.uriMatch', data: {uri: window.location.href}
            }, function(uri_match){
              if (uri_match === false) {
                console.warn('work');
                chrome.runtime.sendMessage({action: 'useragent.get'}, function(useragent){
                  if (typeof useragent === 'string' && useragent !== '') {
                    var d = document.documentElement,
                          injection_code = '(' + function(new_useragent) {
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
                    d.setAttribute('onreset', injection_code);
                    d.dispatchEvent(new CustomEvent('reset'));
                    d.removeAttribute('onreset');
                    if (typeof navigator === 'object') {
                      Object.defineProperties(navigator, {
                        userAgent:  {get: function() {return useragent;}},
                        appVersion: {get: function() {return useragent;}}
                      });
                    }
                  } else {
                    console.warn('User-Agent JavaScript protection disabled!');
                  }
                });
              }
            });
          }
        });
      }
    });
  }
});