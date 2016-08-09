"use strict";

/**
 * Timer component
 *
 * Usage examples:
 *   var t = new Timer('My timer');
 *   // Setup and start
 *   t.ontimer = function(){ console.log('Yeah!'); };
 *   t.setInterval(1000).start();
 *   // Stop timer
 *   t.stop();
 *
 * @param   {string}   name
 * @param   {callable} ontimer
 * @returns {Timer}
 */
var Timer = function(name, ontimer) {
  /**
   * Settings
   */
  this.settings = {
    name: 'timer_' + Math.floor(Date.now()),
    enabled: false,
    interval: 5000
  };

  /**
   * Timer handler
   */
  this.handler = null;

  /**
   * OnTimer event
   *
   * @returns {void}
   */
  this.ontimer = function() {
    console.info('Timer "' + this.getName() + '" event');
  };

  /**
   * Start timer
   *
   * @returns {self}
   */
  this.start = function() {
    var self = this;
    this.settings.enabled = true;
    this.handler = setInterval(function() {
      if (typeof self.ontimer === 'function') {
        self.ontimer.call(self);
      } else {
        console.error('Invalid "' + this.getName() + '" ontimer event');
      }
    }, this.settings.interval);
    console.log('Timer "' + this.getName() + '" started, interval is "' + this.settings.interval + '"');
    return this;
  };

  /**
   * Stop timer
   *
   * @returns {self}
   */
  this.stop = function() {
    this.settings.enabled = false;
    window.clearInterval(this.handler);
    console.log('Timer "' + this.getName() + '" stopped');
    return this;
  };

  /**
   * Restart timer
   *
   * @returns {self}
   */
  this.restart = function() {
    if (this.settings.enabled === true) {
      this.stop();
    }
    this.start();
    return this;
  };

  /**
   * Set timer interval
   *
   * @param   {int} value
   * @returns {self}
   */
  this.setInterval = function(value) {
    this.settings.interval = parseInt(value.toString().replace(/[^\/\d]/g, ''), 10);
    console.log('New "' + this.getName() + '" timer interval is "' + this.settings.interval + '"');
    if (this.settings.enabled === true) {
      this.restart();
    }
    return this;
  };

  /**
   * Set timer name
   *
   * @param   {string} name
   * @returns {self}
   */
  this.setName = function(name) {
    this.settings.name = name.toString();
    return this;
  };

  /**
   * Get timer name
   *
   * @returns {self}
   */
  this.getName = function() {
    return this.settings.name;
  };

  // Setup passed to constructor name
  if (typeof name !== 'undefined') {
    this.setName(name);
  }

  // Setup passed to constructor ontimer callback
  if (typeof ontimer === 'function') {
    this.ontimer = ontimer;
  }
};