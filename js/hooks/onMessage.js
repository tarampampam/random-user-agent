/* global chrome, API */

"use strict";

/**
 * Hooking system messages (for API)
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // request example:
  //   {action: 'exceptions_add', data: {pattern: 'some_pattern*'}}
  if (typeof request === 'object') {
    var result;
    if (request.hasOwnProperty('action') && typeof request.action === 'string') {
      var arr = request.action.split('.'),
          controller = (typeof arr[0] !== 'undefined')    ? arr[0] : null,
          method     = (typeof arr[1] !== 'undefined')    ? arr[1] : null,
          params     = (typeof request.data === 'object') ? request.data : {};
      if (typeof controller === 'string' && typeof method === 'string') {
        if (typeof API[controller][method] === 'function') {
          result = API[controller][method](params);
        } else {
          console.warn('Unknown controller / method: "' + controller + '.' + method + '"');
        }
      } else {
        console.warn('Invalid controller / method: "' + controller + '.' + method + '"');
      }
    }
    sendResponse(result);
  }
  return true;
});