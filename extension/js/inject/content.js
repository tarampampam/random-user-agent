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

function getCookie(cookie)
{
  return document.cookie.split(';').reduce(function(prev, c) {
    var arr = c.split('=');
    return (arr[0].trim() === cookie) ? decodeURIComponent(arr[1]) : prev;
  }, undefined);
}

var userAgent=getCookie('RUA_TRANSPORT_COOKIE');
document.cookie = 'RUA_TRANSPORT_COOKIE=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';

if (userAgent)
{
  var injection_code = '(' + function(new_useragent) {
    if (typeof window === 'object' && typeof window.navigator === 'object') {
      navigator = Object.create(window.navigator);
      Object.defineProperties(navigator, {
        userAgent: {get: function() {return new_useragent;}},
        appVersion: {get: function() {return new_useragent;}}
      });
      Object.defineProperty(window, 'navigator', {
        value: navigator, configurable: false, enumerable: false, writable: false
      });
    }
  } + ')("' + userAgent.replace(/([\"\'])/g, '\\$1') + '");';

  var script = document.createElement('script');
  script.textContent = injection_code;
  document.documentElement.appendChild(script);

  script.remove();

  if (typeof navigator === 'object') {
    Object.defineProperties(navigator, {
      userAgent: {get: function() {return userAgent;}},
      appVersion: {get: function() {return userAgent;}}
    });
  }
}
