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

"use strict";

var Settings = new Proxy({
  data: {
    // Unique key for storing in storage
    storage_key: 'extension_settings_v2',
    // Extension enabled?
    enabled: true,
    // Active User-Agent
    useragent: null,
    // Auto renew settings
    renew_enabled: true,
    renew_interval: 10 * 60 * 1000, // In milliseconds
    renew_onstartup: true,
    // Store settings in localstorage or in cloud?
    sync: true,
    // Custom User-Agent settings
    custom_useragent_enabled: false,
    custom_useragent_value: null,
    custom_useragent_list: [],
    // Replace User-Agent by javascript detection
    javascript_protection_enabled: true,
    // Generator settings
    generator_types: ['chrome_win', 'chrome_mac', 'chrome_linux'],
    // Exceptions settings
    exceptions_list: ['chrome://*'],
    // Any links
    links_bugreport: 'https://github.com/tarampampam/random-user-agent/issues/new',
    // Donation link
    links_donate: 'http://yasobe.ru/na/paramtamtam'
  },

  // Flag - load() method already called, or not?
  isLoaded: false,

  /**
   * Callback - on any property/value read
   *
   * @param   {string} name
   * @returns {void}
   */
  onGet: function(name) {
    //console.log('Property "' + name + '" read action');
  },

  /**
   * Callback - on any property/value write
   *
   * @param   {string} name
   * @param   {mixed} value
   * @returns {void}
   */
  onSet: function(name, value) {
    //console.log('Property "' + name + '" write "' + value + '" action');
  },

  /**
   * Load settings from storage
   *
   * @param   {callable} callback
   * @returns {void|object}
   */
  load: function(callback) {
    var self = this,
        storage = localStorage['config_store'] === 'local' ? chrome.storage.local : chrome.storage.sync;
    storage.get(self.data.storage_key, function(stored_settings) {
      // Firefox workaround when storage sync has been disabled
      // https://github.com/tarampampam/random-user-agent/issues/56
      if (chrome.runtime.lastError && chrome.runtime.lastError.message.includes('webextensions.storage.sync.enabled'))
      {
        console.log('Sync disabled, falling back to local storage');
        localStorage['config_store'] = 'local';
        self.data.sync = false;
        self.load(callback);
        return;
      }

      console.info('Settings loaded');
      if (stored_settings.hasOwnProperty(self.data.storage_key)) {
        stored_settings = stored_settings[self.data.storage_key];
        for (var value in stored_settings) {
          if (stored_settings.hasOwnProperty(value)) {
            self.data[value] = stored_settings[value];
          }
        }
      }

      // Migrate the single custom agent to the array
      if (typeof self.custom_useragent_value === 'string' && self.custom_useragent_value != '') {
        self.custom_useragent_list = [ self.custom_useragent_value ];
        self.custom_useragent_value = null;
      }

      self.isLoaded = true;
      return (typeof callback === 'function') ? callback.call(null, self.data) : self.data;
    });
  },

  /**
   * Save settings in storage
   *
   * @param   {callable} callback
   * @returns {void|boolean}
   */
  save: function(callback) {
    var self = this,
        storage = (self.data.sync === true) ? chrome.storage.sync : chrome.storage.local,
        data = {};
    data[self.data.storage_key] = self.data;
    storage.set(data, function() {
      var error = chrome.runtime.lastError, is_error = (typeof error !== 'undefined' && error !== null);

      // Firefox workaround when storage sync has been disabled
      // https://github.com/tarampampam/random-user-agent/issues/56
      if (is_error && chrome.runtime.lastError.message.includes('webextensions.storage.sync.enabled'))
      {
        console.log('Sync disabled, falling back to local storage');
        self.data.sync = false;
        self.save(callback);
        return;
      }

      is_error ? console.error(error) : console.info('Settings saved');
      return (typeof callback === 'function') ? callback.call(null, !is_error) : !is_error;
    });

    localStorage['config_store'] = self.data.sync ? 'sync' : 'local';
  },

  /**
   * Remove all settings from storage
   *
   * @param   {callable} callback
   * @returns {void|boolean}
   */
  clear: function(callback) {
    var self = this,
        storage = (self.data.sync === true) ? chrome.storage.sync : chrome.storage.local;
    storage.clear(function() {
      var error = chrome.runtime.lastError, is_error = (typeof error !== 'undefined' && error !== null);
      is_error ? console.error(error) : console.warn('Settings cleared');
      return (typeof callback === 'function') ? callback.call(null, !is_error) : !is_error;
    });
  }
}, {
  /**
   * Getter
   *
   * @param   {object} target
   * @param   {string} name
   * @returns {mixed}
   */
  get: function(target, name) {
    var result = undefined;
    if (name in target.data) {
      result = target.data[name];
    }
    if (name in target) {
      result = target[name];
    }
    if (typeof target.onGet === 'function') {
      target.onGet.call(target, name);
    }
    return result;
  },

  /**
   * Setter
   *
   * @param   {object} target
   * @param   {string} name
   * @param   {mixed} value
   * @returns {boolean}
   */
  set: function(target, name, value) {
    if (name in target.data) {
      target.data[name] = value;
      // Save changes in storage
      if (typeof target.save === 'function') {
        target.save.call(target);
      } else {
        console.error('Invalid save() settings method!');
      }
    }
    if (name in target) {
      target[name] = value;
    }
    if (typeof target.onSet === 'function') {
      target.onSet.call(target, name, value);
    }
    return true;
  }
});
