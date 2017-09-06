/* global UI, chrome */

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

"use strict";

(function() {

  /**
   * Actual User-Agent
   */
  var updateActualUserAgentLabel = function() {
    chrome.runtime.sendMessage({action: 'useragent.get'}, function(actual_useragent) {
      if ((typeof actual_useragent !== 'string') || (actual_useragent === '')) {
        actual_useragent = 'User-Agent (managed by this extension) is not available';
      }
      UI.forEachCssClass('actual-user-agent', function($el) {
        if ($el.innerHTML !== actual_useragent) {
          $el.innerHTML = actual_useragent;
        }
      });
    });
  }, actual_useragent_interval = window.setInterval(updateActualUserAgentLabel, 500);
  updateActualUserAgentLabel();

  /**
   * Enabled on this site
   */
  UI.forEachCssClass('enabled-on-this-domain', function($el) {
    if (UI.isCheckbox($el)) {
      var getThisPageUri = function(callback) {
        if (typeof chrome.tabs === 'object') {
          chrome.tabs && chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            callback.call(null, tabs[0].url);
          });
        } else {
          callback.call(null, window.location.href);
        }
      };
      getThisPageUri(function(uri) {
        chrome.runtime.sendMessage({action: 'exceptions.uriMatch', data: {uri: uri}}, function(is_match) {
          $el.checked = !is_match;
          UI.addEvent($el, 'change', function() {
            chrome.runtime.sendMessage({
              action: 'exceptions.' + ($el.checked === true ? 'remove' : 'add') + 'UriPattern',
              data: {uri: uri}
            }, function(result) {
              if (typeof result === 'boolean') {
                chrome.runtime.sendMessage({action: 'exceptions.uriMatch', data: {uri: uri}}, function(is_match) {
                  $el.checked = !is_match;
                });
              } else {
                console.error('Invalid response format (not boolean)');
              }
            });
          });
        });
      });
    }
  });

  /**
   * Change 'enabled' state
   */
  chrome.runtime.sendMessage({ action: 'settings.getEnabled'}, function(is_enabled) {
    if (typeof is_enabled === 'boolean') {
      var guiSetEnabled = function(is_enabled) {
        UI.forEachCssClass('change-enabled-state', function($el) {
          if ((UI.hasCssClass($el, 'disable') && !is_enabled) || (UI.hasCssClass($el, 'enable') && is_enabled)) {
            UI.addCssClass($el, 'hidden');
          } else {
            UI.removeCssClass($el, 'hidden');
          }
        });
      }, apiSetEnabled = function(is_enabled) {
        chrome.runtime.sendMessage({action: 'settings.setEenabled', data: {enabled: is_enabled}}, function(result) {
          if (result === true) {
            guiSetEnabled(is_enabled);
          } else {
            console.error('Error while changing enabled state:\n', result);
          }
        });
      };
      guiSetEnabled(is_enabled);
      UI.forEachCssClass('change-enabled-state', function($el) {
        if (UI.hasCssClass($el, 'disable')) {
          UI.addEvent($el, 'click', function() {
            apiSetEnabled(false);
          });
        }
        if (UI.hasCssClass($el, 'enable')) {
          UI.addEvent($el, 'click', function() {
            apiSetEnabled(true);
          });
        }
      });
    } else {
      console.error('Invalid "settings.getEnabled" response format:\n', is_enabled);
    }
  });

  /**
   * Renew useragent
   */
  UI.forEachCssClass('renew-useragent', function($el) {
    UI.addEvent($el, 'click', function() {
      chrome.runtime.sendMessage({action: 'useragent.renew'}, function(result) {
        if (result === true) {
          updateActualUserAgentLabel();
        } else {
          console.error('Renew useragent completed with error');
        }
      });
    });
    // Hide item if custom user-agent is enabled
    chrome.runtime.sendMessage({action: 'settings.getCustomUseragentEnabled'}, function(is_enabled) {
      is_enabled === true && UI.addCssClass($el, 'hidden');
    });
  });

  /**
   * Open settings panel
   */
  UI.forEachCssClass('open-settings-panel', function($el) {
    UI.addEvent($el, 'click', function() {
      if (chrome.runtime) {
        if (chrome.runtime.openOptionsPage) {
          // New way to open options pages, if supported (Chrome 42+)
          chrome.runtime.openOptionsPage();
        } else {
          // Reasonable fallback
          if (chrome.runtime.getURL) {
            window.open(chrome.runtime.getURL('/html/options.html'));
          } else {
            alert('Cannot open settings page from here, click on popup frame only');
          }
        }
      }
    });
  });

  /**
   * Open bugreport link
   */
  chrome.runtime.sendMessage({action: 'links.bugreport'}, function(bugreport_uri) {
    UI.forEachCssClass('bugreport-link', function($el) {
      if (typeof bugreport_uri === 'string' && bugreport_uri !== '') {
        UI.addEvent($el, 'click', function() {
          chrome.tabs.create({ url: bugreport_uri });
        });
      } else {
        UI.addCssClass($el, 'hidden');
      }
    });
  });

  /**
   * Open donation link
   */
  chrome.runtime.sendMessage({action: 'links.donate'}, function(donate_uri) {
    UI.forEachCssClass('donate-link', function($el) {
      if (typeof donate_uri === 'string' && donate_uri !== '') {
        UI.addEvent($el, 'click', function() {
          chrome.tabs.create({ url: donate_uri });
        });
      } else {
        UI.addCssClass($el, 'hidden');
      }
    });
  });

  /**
   * Auto-height hack
   */
  var autoheight_interval = window.setInterval(function() {
    UI.getElementById('main', function($el) {
      var body_height = document.body.style.height,
        self_height = $el.offsetHeight;
      if (body_height !== self_height) {
        document.body.style.height = self_height + 'px';
      }
    });
  }, 50);

  /**
   * Localize UI
   */
  UI.forEachWithDataAttrib('l10n', function($el, data_attrib_value) {
    UI.localizeElement($el, data_attrib_value);
  });

})();
