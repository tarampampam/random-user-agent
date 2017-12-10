/* global Node, chrome */

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

/**
 * UI methods
 *
 * @type {object}
 */
var UI = {
  /**
   * Add event to DOM element
   *
   * @param   {object}       $el
   * @param   {string|array} name
   * @param   {callable}     callback
   * @returns {void}
   */
  addEvent: function ($el, name, callback) {
    var aE = function ($el, name, callback) {
      if ($el.addEventListener) {
        $el.addEventListener(name, callback, false);
      } else if ($el.attachEvent) {
        $el.attachEvent('on' + name, callback);
      } else {
        $el['on' + name] = callback;
      }
    };

    if (typeof name === 'string') {
      name = [name];
    }
    if (Object.prototype.toString.call(name) === '[object Array]') {
      for (var i = 0, len = name.length; i < len; i++) {
        switch (typeof $el) {
          case 'object':
            if ($el instanceof Node) {
              aE($el, name[i], callback);
            } else if ($el instanceof Array) {
              for (var j = $el.length - 1; j >= 0; j--) {
                aE($el[j], name[i], callback);
              }
            }
            break;
          default:
            throw new Error('Element must be object or instance of an array!');
        }
      }
    } else {
      throw new Error('Event name must be string or array');
    }
  },

  /**
   * Check for exists css class with element
   *
   * @param   {object} $el
   * @param   {string} css_class
   * @returns {boolean}
   */
  hasCssClass: function ($el, css_class) {
    return $el.className.split(' ').indexOf(css_class) > -1;
  },

  /**
   * Add element css class
   *
   * @param   {object} $el
   * @param   {string} css_class
   * @returns {void}
   */
  addCssClass: function ($el, css_class) {
    $el.className += ' ' + css_class.replace(new RegExp('  ', 'g'), ' ').trim();
  },

  /**
   * Remove element css class
   *
   * @param   {object} $el
   * @param   {string} css_class
   * @returns {void}
   */
  removeCssClass: function ($el, css_class) {
    $el.className = $el.className.replace(new RegExp(css_class, 'g'), '').replace(new RegExp('  ', 'g'), ' ').trim();
  },

  /**
   * Find all objects with some css class and execute callback
   *
   * @param   {string}   class_name
   * @param   {callable} callback
   * @returns {void}
   */
  forEachCssClass: function (class_name, callback) {
    if ((typeof class_name === 'string') && (class_name !== '') && (typeof callback === 'function')) {
      for (var elements = document.getElementsByClassName(class_name), i = 0, len = elements.length; i < len; i++) {
        callback.call(null, elements[i]);
      }
    }
  },

  /**
   * Get element by ID and execute callback if element is exists
   *
   * @param   {string}   element_id
   * @param   {callable} callback
   * @returns {void}
   */
  getElementById: function(element_id, callback) {
    if ((typeof element_id === 'string') && (element_id !== '') && (typeof callback === 'function')) {
      var $el = document.getElementById(element_id);
      typeof $el !== 'undefined' && callback.call(null, $el);
    }
  },

  /**
   * Test element - is textarea?
   *
   * @param   {object} $el
   * @returns {boolean}
   */
  isTextarea: function($el) {
    return (typeof $el !== 'undefined' && $el.tagName.toLowerCase() === 'textarea');
  },

  /**
   * Test element - is input?
   *
   * @param   {object} $el
   * @returns {boolean}
   */
  isInput: function($el) {
    return (typeof $el !== 'undefined' && $el.tagName.toLowerCase() === 'input');
  },

  /**
   * Test element - is input checkbox?
   *
   * @param   {object} $el
   * @returns {boolean}
   */
  isCheckbox: function($el) {
    return (this.isInput($el) && $el.type.toLowerCase() === 'checkbox');
  },

  /**
   * Test element - is input text?
   *
   * @param   {object} $el
   * @returns {boolean}
   */
  isInputText: function($el) {
    return (this.isInput($el) && $el.type.toLowerCase() === 'text');
  },

  /**
   * Test element - is input number?
   *
   * @param   {object} $el
   * @returns {boolean}
   */
  isInputNumber: function($el) {
    return (this.isInput($el) && $el.type.toLowerCase() === 'number');
  },

  /**
   * Change extension icon (based on state)
   *
   * @param   {string} state
   * @param   {number} tabId
   * @returns {void}
   */
  changeStateIcon: function(state, tabId) {
    var details = {};
    switch (state) {
      case 'active':
        details.path = '/img/48x48.png';
        break;
      case 'inactive':
        details.path = '/img/48x48g.png';
        break;
      default:
        details.path = '/img/48x48t.png';
        break;
    }
    if (typeof tabId === 'number') details.tabId = tabId;
    chrome.browserAction.setIcon(details);
  },

  /**
   * Call callback for all elements with not empty attribute like 'data-%data_attrib_name%'
   *
   * @param   {string} data_attrib_name
   * @param   {callable} callback
   * @returns {void}
   */
  forEachWithDataAttrib: function(data_attrib_name, callback) {
    if ((typeof data_attrib_name === 'string') && (data_attrib_name !== '') && (typeof callback === 'function')) {
      for (var elements = document.body.getElementsByTagName('*'), i = 0, len = elements.length; i < len; i++) {
        var $el = elements[i], data_attrib_value = $el.getAttribute('data-' + data_attrib_name);
        if (data_attrib_value !== '' && data_attrib_value !== null) {
          callback.call(null, $el, data_attrib_value);
        }
      }
    }
  },

  /**
   * Locatize element content with 'chrome.i18n'
   *
   * @param   {object} $el
   * @param   {string} data_attrib_value
   * @returns {boolean}
   */
  localizeElement: function($el, data_attrib_value) {
    if (typeof $el !== 'undefined' && typeof data_attrib_value === 'string') {
      var localized_text = chrome.i18n.getMessage(data_attrib_value);
      if (typeof localized_text === 'string' && localized_text !== '') {
        $el.innerHTML = localized_text;
        return true;
      }
    }
    return false;
  }
};
