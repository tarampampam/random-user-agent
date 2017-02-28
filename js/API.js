/* global Settings, UAGenerator */

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
 * API provider
 *
 * @type {object}
 */
var API = {

  /**
   * Settings manage controller
   *
   * @type {object}
   */
  settings: {
    /**
     * Get enabled state
     *
     * @returns {boolean}
     */
    getEnabled: function() {
      return Settings.enabled;
    },

    /**
     * Set enabled state
     *
     * @param   {object} params
     * @returns {boolean}
     */
    setEenabled: function(params) {
      var enabled = (typeof params === 'object' && params.hasOwnProperty('enabled')) ? params.enabled : null;
      if (typeof enabled === 'boolean') {
        Settings.enabled = enabled;
        console.log('Enabled state is "' + enabled + '" now');
        return true;
      } else {
        console.error('Invalid input data format - property "enabled" must be boolean');
      }
      return false;
    },

    /**
     * Get auto renew enabled state
     *
     * @returns {boolean}
     */
    getRenewEnabled: function(){
      return Settings.renew_enabled;
    },

    /**
     * Set auto renew enabled state
     *
     * @param   {object} params
     * @returns {boolean}
     */
    setRenewEnabled: function(params) {
      var enabled = (typeof params === 'object' && params.hasOwnProperty('enabled')) ? params.enabled : null;
      if (typeof enabled === 'boolean') {
        Settings.renew_enabled = enabled;
        console.log('Renew enabled state is "' + enabled + '" now');
        return true;
      } else {
        console.error('Invalid input data format - property "enabled" must be boolean');
      }
      return false;
    },

    /**
     * Get auto renew interval raw value (in microseconds)
     *
     * @returns {int}
     */
    getRenewIntervalInMicroseconds: function() {
      var interval = Settings.renew_interval;
      return (typeof interval !== 'undefined') ? parseInt(interval, 10) : -0;
    },

    /**
     * Get auto renew interval value (in minutes)
     *
     * @returns {int}
     */
    getRenewInterval: function() {
      return Math.round(this.getRenewIntervalInMicroseconds() / 60 / 1000);
    },

    /**
     * Set auto renew interval (in minutes)
     *
     * @param   {object} params
     * @returns {boolean}
     */
    setRenewInterval: function(params) {
      var interval = (typeof params === 'object' && params.hasOwnProperty('interval')) ? parseInt(params.interval, 10) * 60 * 1000 : null;
      if (typeof interval === 'number' && !isNaN(interval)) {
        var minimal_interval = 60000;
        interval = (interval <= minimal_interval) ? minimal_interval : interval; // Setup minimal value
        Settings.renew_interval = interval;
        console.log('Renew interval is "' + interval + '" now');
        return true;
      } else {
        console.error('Invalid input data format - property "interval" must be number');
      }
      return false;
    },

    /**
     * Get auto renew on browser startup enabled state
     *
     * @returns {boolean}
     */
    getRenewOnstartupEnabled: function(){
      return Settings.renew_onstartup;
    },

    /**
     * Set auto renew on browser startup enabled state
     *
     * @param   {object} params
     * @returns {boolean}
     */
    setRenewOnstartupEnabled: function(params) {
      var enabled = (typeof params === 'object' && params.hasOwnProperty('enabled')) ? params.enabled : null;
      if (typeof enabled === 'boolean') {
        Settings.renew_onstartup = enabled;
        console.log('Renew on browser startup enabled state is "' + enabled + '" now');
        return true;
      } else {
        console.error('Invalid input data format - property "enabled" must be boolean');
      }
      return false;
    },

    /**
     * Get sync enabled state
     *
     * @returns {boolean}
     */
    getSyncEnabled: function(){
      return Settings.sync;
    },

    /**
     * Set sync enabled state
     *
     * @param   {object} params
     * @returns {boolean}
     */
    setSyncEnabled: function(params) {
      var enabled = (typeof params === 'object' && params.hasOwnProperty('enabled')) ? params.enabled : null;
      if (typeof enabled === 'boolean') {
        Settings.sync = enabled;
        console.log('Sync enabled state is "' + enabled + '" now');
        return true;
      } else {
        console.error('Invalid input data format - property "enabled" must be boolean');
      }
      return false;
    },

    /**
     * Get custom User-Agent enabled state
     *
     * @returns {boolean}
     */
    getCustomUseragentEnabled: function(){
      return Settings.custom_useragent_enabled;
    },

    /**
     * Set custom User-Agent enabled state
     *
     * @param   {object} params
     * @returns {boolean}
     */
    setCustomUseragentEnabled: function(params) {
      var enabled = (typeof params === 'object' && params.hasOwnProperty('enabled')) ? params.enabled : null;
      if (typeof enabled === 'boolean') {
        Settings.custom_useragent_enabled = enabled;
        console.log('Use custom User-Agent enabled state is "' + enabled + '" now');
        return true;
      } else {
        console.error('Invalid input data format - property "enabled" must be boolean');
      }
      return false;
    },

    /**
     * Get replacing User-Agent for Javascript enabled state
     *
     * @returns {boolean}
     */
    getJavascriptProtectionEnabled: function(){
      return Settings.javascript_protection_enabled;
    },

    /**
     * Set replacing User-Agent for Javascript enabled state
     *
     * @param   {object} params
     * @returns {boolean}
     */
    setJavascriptProtectionEnabled: function(params) {
      var enabled = (typeof params === 'object' && params.hasOwnProperty('enabled')) ? params.enabled : null;
      if (typeof enabled === 'boolean') {
        Settings.javascript_protection_enabled = enabled;
        console.log('Use replacing User-Agent for Javascript enabled state is "' + enabled + '" now');
        return true;
      } else {
        console.error('Invalid input data format - property "enabled" must be boolean');
      }
      return false;
    },

    /**
     * Get custom User-Agent
     *
     * @returns {boolean}
     */
    getCustomUseragent: function(){
      return Settings.custom_useragent_value;
    },

    /**
     * Set custom User-Agent
     *
     * @param   {object} params
     * @returns {boolean}
     */
    setCustomUseragent: function(params) {
      var useragent = (typeof params === 'object' && params.hasOwnProperty('useragent')) ? params.useragent : null;
      if (typeof useragent === 'string') {
        Settings.custom_useragent_value = useragent;
        console.log('Custom User-Agent is "' + useragent + '" now');
        return true;
      } else {
        console.error('Invalid input data format - property "useragent" must be string');
      }
      return false;
    }
  },

  useragent: {
    /**
     * Set new User-Agent
     *
     * @param   {object} params
     * @returns {boolean}
     */
    set: function(params) {
      var useragent = (typeof params === 'object' && params.hasOwnProperty('useragent')) ? params.useragent : null;
      if (typeof useragent === 'string') {
        Settings.useragent = useragent;
        console.info('User-agent updated: "' + useragent + '"');
        return true;
      } else {
        console.error('Invalid input data format - property "useragent" must be string');
      }
      return false;
    },

    /**
     * Clear User-Agent
     *
     * @returns {boolean}
     */
    clear: function() {
      Settings.useragent = null;
      console.info('User-agent cleared');
      return true;
    },

    /**
     * Get this extension User-Agent
     *
     * @returns {string|null}
     */
    get: function() {
      if (Settings.custom_useragent_enabled === true) {
        if (typeof Settings.custom_useragent_value === 'string') {
          return Settings.custom_useragent_value;
        }
      } else {
        if (typeof Settings.useragent === 'string') {
          return Settings.useragent;
        }
      }
      return null;
    },

    /**
     * Generate new User-Agent
     *
     * @returns {string}
     */
    getNew: function() {
      var generator = new UAGenerator(), new_useragent;
      for (var i = 0; i < 10; ++i) {
        new_useragent = generator.generate(Settings.generator_types);
        if (this.get() !== new_useragent) {
          break;
        }
      }
      return new_useragent;
    },

    /**
     * Renew User-Agent
     *
     * @returns {boolean}
     */
    renew: function() {
      var new_useragent = this.getNew();
      if (typeof new_useragent === 'string' && new_useragent !== '') {
        if (this.set({useragent: new_useragent})) {
          return true;
        }
      }
      return false;
    }
  },

  /**
   * Exceptions manage controller
   *
   * @type {object}
   */
  exceptions: {
    /**
     * Test uri for pattern match
     *
     * @param   {object} params
     * @returns {boolean}
     */
    uriPatternMatch: function(params) {
      var uri     = (typeof params === 'object' && params.hasOwnProperty('uri'))     ? params.uri : null;
      var pattern = (typeof params === 'object' && params.hasOwnProperty('pattern')) ? params.pattern : null;
      if (typeof uri === 'string' && typeof pattern === 'string') {
        /**
         * Wildcard string search
         *
         * Wildcards:
         *   * - any chars (any length)
         *   ? - any single char (or none)
         *
         * @param   {string}  string
         * @param   {string}  rule
         * @param   {boolean} caseinsensitive (true by default)
         * @returns {boolean}
         */
        var wildcardStringSearch = function(string, rule, caseinsensitive) {
          var regexp_flag = (caseinsensitive === false) ? '' : 'i';
          rule = rule.split('*').join('.*');
          rule = rule.split('?').join('.?');
          return new RegExp('^' + rule + '$', regexp_flag).test(string);
        };
        if (wildcardStringSearch(uri, pattern)) {
          return true;
        }
      } else {
        console.error('Invalid input data format - property "uri" and "pattern" must be strings');
      }
      return false;
    },

    /**
     * Test uri for mathing in exceptions list
     *
     * @param   {object} params
     * @returns {boolean}
     */
    uriMatch: function(params) {
      var uri = (typeof params === 'object' && params.hasOwnProperty('uri')) ? params.uri : null;
      if (typeof uri === 'string' && uri !== '') {
        for (var exceptions = this.get(), i = 0, len = exceptions.length; i < len; ++i) {
          if (this.uriPatternMatch({uri: uri, pattern: exceptions[i]})) {
            return true;
          }
        }
      } else {
        console.error('Invalid input data format - property "uri" must be string');
      }
      return false;
    },

    /**
     * Get exception pattern by passed URI
     *
     * @param   {object} params
     * @returns {Boolean}
     */
    getPatternByUri: function(params) {
      var uri = (typeof params === 'object' && params.hasOwnProperty('uri')) ? params.uri : null;
      if (typeof uri === 'string' && uri !== '') {
        /**
         * Return substring, based on regex extension
         *
         * @param   {string} string
         * @param   {regexp} regexp
         * @returns {string}
         */
        var getSubstringByRegexp = function(string, regexp) {
          var matches = string.match(regexp);
          return matches && matches[1];
        };
        /**
         * Get URI part (substring)
         *
         * @param   {string} uri
         * @param   {string} part_name
         * @returns {string|boolean}
         */
        var getUriPart = function(uri, part_name) {
          switch (part_name) {
            case 'protocol':
              return getSubstringByRegexp(uri, /^([^:]+)\:\/\//);
            case 'domain':
              return getSubstringByRegexp(uri, /\:\/\/([^\/]*)\//);
          }
          return false;
        };
        var protocol = getUriPart(uri, 'protocol'),
            domain   = getUriPart(uri, 'domain');
        if ((typeof protocol === 'string') && (typeof domain === 'string')) {
          protocol = protocol.replace(new RegExp('^https', 'i'), 'http'); // https -> http
          protocol = protocol.replace(new RegExp('^http', 'i'), 'http?'); // http -> http?
          return protocol + '://' + domain + '/*';
        }
      } else {
        console.error('Invalid input data format - property "uri" must be string');
      }
      return false;
    },

    /**
     * Get exceptions list
     *
     * @returns {array}
     */
    get: function() {
      var exceptions = Settings.exceptions_list;
      if (Object.prototype.toString.call(exceptions) === '[object Array]') {
        return exceptions;
      } else {
        throw new Error('Exceptions list must be an array');
      }
      return [];
    },

    /**
     * Set exceptions list
     *
     * @param   {object} params
     * @returns {array}
     */
    set: function(params) {
      var exceptions = (typeof params === 'object' && params.hasOwnProperty('exceptions')) ? params.exceptions : null;
      if (Object.prototype.toString.call(exceptions) === '[object Array]') {
        var new_exceptions = [];
        for (var i = 0, len = exceptions.length; i < len; i++) {
          // Make each string clean
          var temp_exception = exceptions[i].toString().replace(/^\s+|\s+$/g, '');
          temp_exception !== '' && new_exceptions.push(temp_exception);
        }
        Settings.exceptions_list = new_exceptions;
        console.log('Exceptions list updated: ["' + new_exceptions.join('", "') + '"]');
        return true;
      } else {
        console.error('Invalid input data format - property "exceptions" must be an array');
      }
      return false;
    },

    /**
     * Check exception exists
     *
     * @param   {object} params
     * @returns {boolean}
     */
    exists: function(params) {
      var pattern = (typeof params === 'object' && params.hasOwnProperty('pattern')) ? params.pattern : null;
      if (typeof pattern === 'string' && pattern !== '') {
        return (this.get().indexOf(pattern) >= 0);
      } else {
        console.error('Invalid input data format - property "pattern" must be string');
      }
      return null;
    },

    /**
     * Add exception and save
     *
     * @param   {object} params
     * @returns {boolean}
     */
    add: function(params) {
      var pattern = (typeof params === 'object' && params.hasOwnProperty('pattern')) ? params.pattern : null;
      if (typeof pattern === 'string' && pattern !== '') {
        var exceptions = this.get();
        if (!this.exists({pattern: pattern})) {
          exceptions.unshift(pattern);
          if (this.set({exceptions: exceptions})) {
            console.log('Pattern "' + pattern + '" added to exceptions list');
            return true;
          }
        } else {
          console.info('Pattern "' + pattern + '" already exists in exceptions list');
        }
      } else {
        console.error('Invalid input data format - property "pattern" must be string');
      }
      return false;
    },

    /**
     * Remove exception and save
     *
     * @param   {object} params
     * @returns {boolean}
     */
    remove: function(params) {
      var pattern = (typeof params === 'object' && params.hasOwnProperty('pattern')) ? params.pattern : null;
      if (typeof pattern === 'string' && pattern !== '') {
        var exceptions = this.get();
        if (this.exists({pattern: pattern})) {
          var index = exceptions.indexOf(pattern);
          exceptions.splice(index, 1);
          console.log('Pattern "' + pattern + '" removed from exceptions list');
          return true;
        } else {
          console.info('Nothing to remove - pattern "' + pattern + '" is not exists in exceptions list');
        }
      } else {
        console.error('Invalid input data format - property "pattern" must be string');
      }
      return false;
    },

    /**
     * Add to exceptions list pattern, based on passed URI
     *
     * @param   {object} params
     * @returns {Boolean}
     */
    addUriPattern: function(params) {
      var uri = (typeof params === 'object' && params.hasOwnProperty('uri')) ? params.uri : null;
      if (typeof uri === 'string' && uri !== '') {
        return this.add({pattern: this.getPatternByUri({uri: uri})});
      } else {
        console.error('Invalid input data format - property "uri" must be string');
      }
      return false;
    },

    /**
     * Remove from exceptions list pattern, based on passed URI
     *
     * @param   {object} params
     * @returns {Boolean}
     */
    removeUriPattern: function(params) {
      var uri = (typeof params === 'object' && params.hasOwnProperty('uri')) ? params.uri : null;
      if (typeof uri === 'string' && uri !== '') {
        return this.remove({pattern: this.getPatternByUri({uri: uri})});
      } else {
        console.error('Invalid input data format - property "uri" must be string');
      }
      return false;
    }
  },

  /**
   * Generator controller
   *
   * @type {object}
   */
  generator: {
    /**
     * Return all generator types
     *
     * @returns {array}
     */
    getTypes: function() {
      return Settings.generator_types;
    },

    /**
     * Set new types and save
     *
     * @param   {object} params
     * @returns {boolean}
     */
    setTypes: function(params) {
      var types = (typeof params === 'object' && params.hasOwnProperty('types')) ? params.types : [];
      if (typeof types === 'string') {
        types = [types];
      }
      if (Object.prototype.toString.call(types) === '[object Array]') {
        Settings.generator_types = types;
        console.log('Generator types updated: ["' + types.join('", "') + '"]');
        return true;
      } else {
        console.error('Invalid input data format - property "types" must be array or string');
      }
      return false;
    }
  },

  /**
   * Links controller
   *
   * @type {object}
   */
  links: {
    bugreport: function() {
      return Settings.links_bugreport;
    },
    donate: function() {
      return Settings.links_donate;
    }
  }
};