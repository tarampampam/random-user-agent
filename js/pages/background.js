/* global Settings, UI, Timer, API */

"use strict";

/**
 * Auto User-Agent renew timer
 *
 * @type Timer
 */
var useragent_renew_timer = new Timer('User-Agent renew timer', function() {
  console.log('"' + useragent_renew_timer.getName() + '" event called');
  API.useragent.renew();
});

/**
 * Declare actions on settings changes
 *
 * @param   {string} name
 * @param   {mixed} value
 * @returns {void}
 */
Settings.onSet = function(name, value) {
  switch (name) {
    case 'renew_interval':
      useragent_renew_timer.setInterval(value);
      console.log('"' + useragent_renew_timer.getName() + '" updated to "' + value + '"');
      break;
    case 'renew_enabled':
      value === true && useragent_renew_timer.start() || useragent_renew_timer.stop();
      console.log('"' + useragent_renew_timer.getName() + '" changed state to "' + value + '"');
      break;
  }
  //console.log('Property "' + name + '" write "' + value + '" action');
};

/**
 * Load extension settings
 */
if (!Settings.hasOwnProperty('isLoaded') || Settings.isLoaded !== true) {
  Settings.load(function() {
    if (API.settings.getRenewOnstartupEnabled()) {
      API.useragent.renew();
    }
    useragent_renew_timer.setInterval(API.settings.getRenewIntervalInMicroseconds());
    if (API.settings.getRenewEnabled()) {
      useragent_renew_timer.start();
    }
  });
}

