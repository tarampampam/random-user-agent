/* global RandExp */

"use strict";

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

/**
 * Pseudo-random 'User-Agent' strings generator.
 *
 * Usage examples:
 *   var generator = new UAGenerator();
 *   // Generate user agent
 *   console.info(generator.generate());
 *   // Generate user agent based on patterns for 'Opera on Windows' or 'Internet Explorer v7'
 *   console.info(generator.generate(['opera_win', 'ie_v7']));
 *
 * @returns  {UAGenerator}
 */
var UAGenerator = function() {
  /**
   * Test - var is an array?
   *
   * @param   {*} obj
   * @returns {boolean}
   */
  this.isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  /**
   * Test - var is a string?
   *
   * @param   {*} obj
   * @returns {boolean}
   */
  this.isString = function(obj) {
    return typeof obj === 'string';
  };

  /**
   * Test - var is defined?
   *
   * @param   {*} obj
   * @returns {boolean}
   */
  this.isUndefined = function(obj) {
    return typeof obj === 'undefined';
  };

  /**
   * Get random array item
   *
   * @param   {Array} array
   * @returns {Array|null}
   */
  this.get = function(array) {
    return this.isArray(array) ? array[Math.floor(Math.random() * array.length)] : null;
  };

  /**
   * Multi-usable regex patterns
   */
  this.patterns = {
    locales:  ['en-(US|AU|CA|IN|IE|MT|NZ|PH|SG|ZA|GB|US)'],
    net_clr: {
      v1:   ['( \\.NET CLR 1\\.[0-1]\\.[4-5]07[0-5][0-9];|)'],
      v2up: ['( \\.NET CLR [2-3]\\.[1-8]\\.[3-5]07[0-9][0-9];|)']
    },
    media_server: ['( Media Center PC [4-6]\\.0;|)'],
    windows: ['Windows NT (6\\.[1-3]|10\\.0)'],
    macos: {
      v10_blink:   ['Intel Mac OS X 10_(1[0-4])_[0-4]'],
      v10_firefox: ['Intel Mac OS X 10\\.(1[0-4])']
    },
    applewebkit: ['AppleWebKit/(60[1-5]\\.[1-7]\\.[1-8])', 'AppleWebKit/(53[5-8]\\.[1-2][0-9]\\.[1-3][0-9])'],
    browsers_versions: {
      chrome:  ['(73\\.0\\.3683|74\\.0\\.3729|75\\.0\\.3770|76\\.0\\.3783)\\.(?:[89]\\d|1[0-4]{2})'],
      safari:  ['1[12]\\.[0-1]\\.[1-5]'],
      firefox: ['6[06-9]\\.0'],
      opera:   ['4[4-6]\\.0\\.2[1-3][0-9][0-9]\\.([1-2]|)[1-9][0-9]'],
      edge:    ['Chrome/52\\.0\\.2743\\.116 Safari/537\\.36 Edge/15\\.15063',
          'Chrome/58\\.0\\.3029\\.110 Safari/537\\.36 Edge/16\\.16299',
          'Chrome/64\\.0\\.3282\\.140 Safari/537\\.36 Edge/17\\.17134',
          'Chrome/64\\.0\\.3282\\.140 Safari/537\\.36 Edge/18\\.17763']
    }
  };

  /**
   * User-Agent regex patterns
   */
  this.useragents = {
    ie: {
      v6: {
        name: 'Internet Explorer 6',
        regexp: ['Mozilla/4\\.0 \\(compatible; MSIE 6\\.0; Windows NT 5\\.1;( SV1;||)' + this.get(this.patterns.net_clr.v2up) + ' ' + this.get(this.patterns.locales) + '\\)']
      },
      v7: {
        name: 'Internet Explorer 7',
        regexp: ['Mozilla/4\\.0 \\((compatible|compatible|Windows; U); MSIE 7\\.0; Windows NT (5\\.1|6\\.0);( WOW64;|)' + this.get(this.patterns.net_clr.v1) + this.get(this.patterns.media_server) + ' InfoPath\\.[1-3]; ' + this.get(this.patterns.locales) + '\\)']
      },
      v8: {
        name: 'Internet Explorer 8',
        regexp: ['Mozilla/4\\.0 \\(compatible; MSIE 8\\.0; Windows NT (5\\.1|6\\.[01]); Trident/4\\.0; (WOW64|WOW64|GTB7\\.[2-6]); InfoPath\\.[2-3];( SV1;|)' + this.get(this.patterns.net_clr.v1) + ' ' + this.get(this.patterns.locales) + '\\)']
      },
      v9: {
        name: 'Internet Explorer 9',
        regexp: ['Mozilla/5\\.0 \\((compatible|Windows; U); MSIE 9\\.0; Windows NT 6\\.[01]; (Win64; x64; |WOW64; |)' + 'Trident/5\\.0;' + this.get(this.patterns.net_clr.v2up) + this.get(this.patterns.media_server) + '( Zune 4\\.[0-7];|||)( \\.NET4\\.0(C|E);) ' + this.get(this.patterns.locales) + '\\)']
      },
      v10: {
        name: 'Internet Explorer 10',
        regexp: ['Mozilla/5\\.0 \\(compatible; MSIE 10\\.0; Windows NT 6\\.[12];( InfoPath\\.[2-3];|)' + this.get(this.patterns.net_clr.v2up) + ' (WOW64; |)Trident/6\\.0(; ' + this.get(this.patterns.locales) + '|)\\)']
      },
      v11: {
        name: 'Internet Explorer 11',
        regexp: ['Mozilla/5\\.0 \\(' + this.get(this.patterns.windows) + '; (?:WOW64; )?Trident/7\\.0; rv:11\\.0\\) like Gecko']
      }
    },
    edge: {
      desktop: {
        name: 'Edge on Windows',
        regexp: ['Mozilla/5\\.0 \\(Windows NT 10\\.0; Win64; x64\\) AppleWebKit/537\\.36 \\(KHTML, like Gecko\\) ' + this.get(this.patterns.browsers_versions.edge)]
      },
      /*mobile: {
        name: 'Edge on Mobile',
        regexp: ['']
      },*/
      xbox: {
        name: 'Edge on Xbox',
        regexp: ['Mozilla/5\\.0 \\(Windows NT 10\\.0; Win64; x64; Xbox; Xbox One\\) AppleWebKit/537\\.36 \\(KHTML, like Gecko\\) ' + this.get(this.patterns.browsers_versions.edge)]
      }
    },
    chrome: {
      win: {
        name: 'Chrome on Windows',
        regexp: ['Mozilla/5\\.0 \\(' + this.get(this.patterns.windows) + '(; Win64; x64|; WOW64|)\\) AppleWebKit/537\\.36 \\(KHTML, like Gecko\\) Chrome/(' + this.get(this.patterns.browsers_versions.chrome) + ') Safari/537\\.36']
      },
      mac: {
        name: 'Chrome on Mac',
        regexp: ['Mozilla/5\\.0 \\(Macintosh; ' + this.get(this.patterns.macos.v10_blink) + '\\) AppleWebKit/537\\.36 \\(KHTML, like Gecko\\) Chrome/(' + this.get(this.patterns.browsers_versions.chrome) + ') Safari/537\\.36']
      },
      linux: {
        name: 'Chrome on Linux',
        regexp: ['Mozilla/5\\.0 \\(X11;( U; | )Linux (x86_64|i686)\\) AppleWebKit/537\\.36 \\(KHTML, like Gecko\\) Chrome/(' + this.get(this.patterns.browsers_versions.chrome) + ') Safari/537\\.36']
      }
    },
    firefox: {
      win: {
        name: 'Firefox on Windows',
        regexp: ['Mozilla/5\\.0 \\(' + this.get(this.patterns.windows) + '; (WOW64|Win64); rv:(' + this.get(this.patterns.browsers_versions.firefox) + ')\\) Gecko/20100101 Firefox/(\\3)']
      },
      mac: {
        name: 'Firefox on Mac',
        regexp: ['Mozilla/5\\.0 \\(Macintosh;( U; | )' + this.get(this.patterns.macos.v10_firefox) + '; rv:(' + this.get(this.patterns.browsers_versions.firefox) + ')\\) Gecko/20100101 Firefox/(\\3)']
      },
      linux: {
        name: 'Firefox on Linux',
        regexp: ['Mozilla/5\\.0 \\(X11; (NetBSD i686|Linux i686|Linux x86_64|Ubuntu; Linux|SunOS sun4u|Gentoo); rv:(' + this.get(this.patterns.browsers_versions.firefox) + ')\\) Gecko/20100101 Firefox/(\\2)']
      },
      android: {
        name: 'Firefox on Android',
        regexp: ['Mozilla/5\\.0 \\(Android (?:6\\.0(?:\\.1)?|7\\.(?:0|1(?:\\.[12])?)|8\\.[01]|9\\.0); Mobile; rv:(' + this.get(this.patterns.browsers_versions.firefox) + ')\\) Gecko/\\1 Firefox/\\1']
      }
    },
    safari: {
      mac: {
        name: 'Safari on Mac',
        regexp: ['Mozilla/5\\.0 \\(Macintosh;( U; | )' + this.get(this.patterns.macos.v10_blink) + '; ' + this.get(this.patterns.locales) + '\\) ' + this.get(this.patterns.applewebkit) + ' \\(KHTML, like Gecko\\) Version/' + this.get(this.patterns.browsers_versions.safari) + ' Safari/(\\4)']
      },
      iphone: {
        name: 'Safari on iPhone',
        regexp: ['Mozilla/5\\.0 \\(iPhone; U; CPU iPhone OS 11_[0-3]_[0-9] like Mac OS X; ' + this.get(this.patterns.locales) + '\\) ' + this.get(this.patterns.applewebkit) + ' \\(KHTML, like Gecko\\) Version/' + this.get(this.patterns.browsers_versions.safari) + ' Mobile/8(J|F|C)[1-4](8a|90|) Safari/6533\\.18\\.5']
      },
      ipad: {
        name: 'Safari on iPad',
        regexp: ['Mozilla/5\\.0 \\(iPad;( U;|) CPU OS 11_[0-3](_2|) like Mac OS X(; ' + this.get(this.patterns.locales) + ')\\) ' + this.get(this.patterns.applewebkit) + ' \\(KHTML, like Gecko\\) Version/' + this.get(this.patterns.browsers_versions.safari) + ' Mobile/8(J|F|C)[1-4](8a|90|) Safari/(\\5)']
      }
    },
    opera: {
      win: {
        name: 'Opera on Windows',
        regexp: ['Mozilla/5\\.0 \\(' + this.get(this.patterns.windows) + '(; Win64; x64|; WOW64|)\\) AppleWebKit/537\\.36 \\(KHTML, like Gecko\\) Chrome/(' + this.get(this.patterns.browsers_versions.chrome) + ') Safari/537\\.36 OPR/' + this.get(this.patterns.browsers_versions.opera)]
      },
      mac: {
        name: 'Opera on Mac',
        regexp: ['Mozilla/5\\.0 \\(Macintosh; ' + this.get(this.patterns.macos.v10_blink) + '\\) AppleWebKit/537\\.36 \\(KHTML, like Gecko\\) Chrome/(' + this.get(this.patterns.browsers_versions.chrome) + ') Safari/537\\.36 OPR/' + this.get(this.patterns.browsers_versions.opera)]
      },
      linux: {
        name: 'Opera on Linux',
        regexp: ['Mozilla/5\\.0 \\(X11;( U; | )Linux (x86_64|i686)\\) AppleWebKit/537\\.36 \\(KHTML, like Gecko\\) Chrome/(' + this.get(this.patterns.browsers_versions.chrome) + ') Safari/537\\.36 OPR/' + this.get(this.patterns.browsers_versions.opera)]
      }
    }
  };

  /**
   * Generate value, based on 'RandExp' regexp
   *
   * @param   {string} regexp
   * @returns {string|boolean}
   */
  this.randexp = function(regexp) {
    if (typeof RandExp === 'undefined') {
      throw new Error('"RandExp" component must be included first');
    }
    if (this.isString(regexp)) {
      return new RandExp(regexp).gen();
    } else {
      return !!console.error('regexp must be string');
    }
  };

  /**
   * Return all object values by name (recursive) as array
   *
   * @param   {object} object
   * @param   {string} key_name
   * @returns {Array}
   */
  this.getAllByKeyName = function(object, key_name) {
    var result = [];
    this.recursive = function(object, key_name) {
      for (var key in object) {
        if (typeof object[key] === 'object' && !this.isArray(object[key]) && object[key] !== null) {
          this.recursive(object[key], key_name);
        } else {
          if (key === key_name) {
            result.push(object[key]);
          }
        }
      }
    };
    this.recursive(object, key_name);
    return result;
  };

  /**
   * Regexs tester
   *
   * Usage example (execute in console):
   *   var t = new UAGenerator(); t.testAllRegexp();
   *
   * @returns {void}
   */
  this.testAllRegexp = function() {
    var regexps = this.getAllByKeyName(this.useragents, 'regexp');
    if (this.isArray(regexps)) {
      var length = regexps.length;
      if (length > 0) {
        for (var i = 0; i < length; i++) {
          var current_regexps = regexps[i],
              current_regexps_count = current_regexps.length;
          console.info('Testing regexps (' + current_regexps_count + ') "' + current_regexps + '"');
          for (var j = 0; j < current_regexps_count; j++) {
            console.log('> Generate value for regexp: ' + current_regexps[j]);
            for (var l = 0; l < 9; l++) {
              console.log('>> Generated value: ' + this.randexp(current_regexps[j]));
            }
          }
        }
      }
    } else {
      console.error('Regexps variable must be an array and dont be empty', regexps);
    }
    return null;
  };

  /**
   * Main method
   *
   * Generate User-Agent string, based on passed template (templates), or totally random.
   *
   * If you pass null, empty array or '*' as parameter - method returns totally random user-agent.
   * Also you can pass user-agent template name, based on 'this.useragents' properties names. For
   * example:
   *   'opera_win'   for search regex template in 'this.useragents.opera.win.regexp'
   *   'safari_ipad' for search regex template in 'this.useragents.safari.ipad.regexp'
   *
   * Also you can pass array of templates names.
   *
   * @param   {string|array} types
   * @returns {string|boolean}
   */
  this.generate = function(types) {
    if (this.isString(types)) {
      types = [types];
    }
    if (!this.isArray(types)) {
      types = [];
    }
    if (types.length <= 0) {
      types = ['*'];
    }
    var regexps = [];
    for (var i = 0, len = types.length; i < len; i++) {
      if (types[i] === '*') {
        return this.randexp(this.get(this.get(this.getAllByKeyName(this.useragents, 'regexp'))));
      }
      var parts = types[i].split('_'), major, minor;
      if (!this.isUndefined(parts[0]) && this.isString(parts[0])) {
        major = parts[0];
      }
      if (!this.isUndefined(parts[1]) && this.isString(parts[1])) {
        minor = parts[1];
      }
      if (!this.isUndefined(major) && !this.isUndefined(minor) && !this.isUndefined(this.useragents[major][minor])) {
        regexps.push(this.get(this.useragents[major][minor].regexp));
        continue;
      }
    }
    return (regexps.length > 0) ? this.randexp(this.get(regexps)) : !!console.error('User-Agent patterns not found');
  };
};
