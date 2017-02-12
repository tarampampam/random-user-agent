/* global UI, UAGenerator, chrome */

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

(function () {

  /**
   * Typical GUI methods
   *
   * @type {object}
   */
  var gui = {
    /**
     * Live methods
     *
     * @type {object}
     */
    live: {
      /**
       * Checkbox
       *
       * @param   {string} api_get_method
       * @param   {string} api_set_method
       * @param   {string} checkbox_id
       * @returns {undefined}
       */
      checkbox: function (api_get_method, api_set_method, checkbox_id) {
        chrome.runtime.sendMessage({action: api_get_method},
          function (is_enabled) {
            typeof is_enabled === 'boolean' ? UI.getElementById(checkbox_id, function ($el) {
              UI.isCheckbox($el) && ($el.checked = is_enabled, UI.addEvent($el, 'change', function () {
                chrome.runtime.sendMessage({
                  action: api_set_method,
                  data: {enabled: $el.checked}
                });
              }));
            }) : console.error('API method "' + api_get_method + '" returns invalid answer');
          });
      }
    }
  };

  /**
   * Switcher enabled
   */
  gui.live.checkbox('settings.getEnabled', 'settings.setEenabled', 'extension_enabled');

  /**
   * Renew enabled
   */
  gui.live.checkbox('settings.getRenewEnabled', 'settings.setRenewEnabled', 'auto_renew');

  /**
   * Renew interval
   */
  chrome.runtime.sendMessage({action: 'settings.getRenewInterval'},
    function (interval) {
      typeof interval === 'number' ? UI.getElementById('auto_renew_interval', function ($el) {
        if (UI.isInputNumber($el) || UI.isInputText($el)) {
          $el.value = interval;
          UI.addEvent($el, 'keyup', function () {
            var new_interval = parseInt($el.value, 10), max_value = 1440;
            $el.value = (new_interval > max_value) ? max_value : $el.value;
            chrome.runtime.sendMessage({
              action: 'settings.setRenewInterval',
              data: {interval: $el.value}
            });
          });
        }
      }) : console.error('API method "settings.getRenewInterval" returns invalid answer');
    });

  /**
   * Renew on browser startup enabled
   */
  gui.live.checkbox('settings.getRenewOnstartupEnabled', 'settings.setRenewOnstartupEnabled', 'auto_renew_onstartup');

  /**
   * Hide real User-Agent from detection by javascript
   */
  gui.live.checkbox('settings.getJavascriptProtectionEnabled', 'settings.setJavascriptProtectionEnabled', 'javascript_protection_enabled');

  /**
   * Sync enabled
   */
  gui.live.checkbox('settings.getSyncEnabled', 'settings.setSyncEnabled', 'sync_enabled');

  /**
   * Custom user-agent
   */
  chrome.runtime.sendMessage({action: 'settings.getCustomUseragent'},
    function (useragent) {
      UI.getElementById('custom_useragent', function ($el) {
        if (UI.isInputText($el)) {
          $el.value = (typeof useragent === 'string') ? useragent : '';
          UI.addEvent($el, 'keyup', function () {
            var max_length = 256;
            $el.value = ($el.value.length > max_length) ? $el.value.substr(0, max_length) : $el.value;
            chrome.runtime.sendMessage({
              action: 'settings.setCustomUseragent',
              data: {useragent: $el.value}
            });
          });
        }
      });
    });

  /**
   * Custom user-agent enabled
   */
  gui.live.checkbox('settings.getCustomUseragentEnabled', 'settings.setCustomUseragentEnabled', 'custom_useragent_enabled');


  /**
   * Generate generators switchers
   */
  chrome.runtime.sendMessage({action: 'generator.getTypes'},
    function (types) {
      if (Object.prototype.toString.call(types) === '[object Array]') {
        UI.getElementById('generator_settings', function ($el) {
          var generator = new UAGenerator(),
            generator_browsers = generator.useragents,
            generators = [];
          if (typeof generator_browsers === 'object') {
            for (var major in generator_browsers) {
              for (var minor in generator_browsers[major]) {
                if (generator_browsers.hasOwnProperty(major)) {
                  if (generator_browsers[major].hasOwnProperty(minor)) {
                    var browser_generator = generator_browsers[major][minor];
                    if (browser_generator.hasOwnProperty('name')) {
                      var name = browser_generator.name, type = major + '_' + minor;
                      generators.push({name: name,
                        type: type});
                    }
                  }
                }
              }
            }
          }
          if (generators.length > 0) {
            var list = document.createElement('ul'),
              checkbox_class = 'generator-type',
              checkbox_data_attr = 'data-type';
            list.className = 'generator-types';
            for (var i = 0, len = generators.length; i < len; i++) {
              var item = document.createElement('li'),
                checked = (types.indexOf(generators[i].type) >= 0) ? 'checked' : '';
              item.innerHTML = '<label><span class="box-min"><input type="checkbox" ' + checked + ' ' + checkbox_data_attr + '="' + generators[i].type + '" class="' + checkbox_class + '" /><i></i></span>' + generators[i].name + '</label>';
              list.appendChild(item);
            }
            $el.appendChild(list);
            UI.forEachCssClass(checkbox_class, function ($el) {
              UI.addEvent($el, 'change', function () {
                var all_checkboxes = document.getElementsByClassName(checkbox_class);
                if (typeof all_checkboxes === 'object' && all_checkboxes.length > 0) {
                  var new_types = [];
                  for (var i = 0, len = all_checkboxes.length; i < len; i++) {
                    var $checkbox = all_checkboxes[i], type;
                    if ($checkbox.checked === true) {
                      type = (typeof $checkbox.getAttribute(checkbox_data_attr) !== 'undefined') ? $checkbox.getAttribute(checkbox_data_attr) : null;
                      if (type !== null) {
                        new_types.push(type);
                      }
                    }
                  }
                  chrome.runtime.sendMessage({
                    action: 'generator.setTypes',
                    data: {types: new_types}
                  },
                    function (result) {
                      result !== true && console.error('API method "generator.setTypes" failed');
                    });
                }
                chrome.runtime.sendMessage({action: 'useragent.renew'},
                  function () {});
              });
            });
          }
        });
      } else {
        console.error('API method "generator.getTypes" returns invalid answer');
      }
    });

  /**
   * Exceptions list
   */
  chrome.runtime.sendMessage({action: 'exceptions.get'},
    function (exceptions) {
      if (Object.prototype.toString.call(exceptions) === '[object Array]') {
        UI.getElementById('exceptions_patterns', function ($el) {
          if (UI.isTextarea($el)) {
            $el.value = exceptions.join('\n');
            UI.addEvent($el, 'keyup', function () {
              var new_exceptions = $el.value.split('\n');
              chrome.runtime.sendMessage({
                action: 'exceptions.set',
                data: {exceptions: new_exceptions}
              },
                function (result) {
                  result !== true && console.error('API method "exceptions.set" failed');
                });
            });
          }
        });
      } else {
        console.error('API method "exceptions.get" returns invalid answer (not array)');
      }
    });

  /**
   * Localize UI
   */
  UI.forEachWithDataAttrib('l10n', function ($el, data_attrib_value) {
    UI.localizeElement($el, data_attrib_value);
  });

})();