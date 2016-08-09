/* global Node, chrome */

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
   * Test element - is inpit?
   *
   * @param   {object} $el
   * @returns {boolean}
   */
  isInput: function($el) {
    return (typeof $el !== 'undefined' && $el.tagName.toLowerCase() === 'input');
  },

  /**
   * Test element - is inpit checkbox?
   *
   * @param   {object} $el
   * @returns {boolean}
   */
  isCheckbox: function($el) {
    return (this.isInput($el) && $el.type.toLowerCase() === 'checkbox');
  },

  /**
   * Test element - is inpit text?
   *
   * @param   {object} $el
   * @returns {boolean}
   */
  isInputText: function($el) {
    return (this.isInput($el) && $el.type.toLowerCase() === 'text');
  },

  /**
   * Test element - is inpit number?
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
   * @returns {boolean}
   */
  changeStateIcon: function(state) {
    var image_src;
    switch (state) {
      case 'active':
        image_src = '/img/48x48.png';
        break;
      default:
        image_src = '/img/48x48g.png';
        break;
    }
    return chrome.browserAction.setIcon({path: image_src}, function(){});
  }
};