# Random User-Agent

[![GitHub license](https://img.shields.io/badge/license-WTFPL-blue.svg)](https://raw.githubusercontent.com/tarampampam/nod32-update-mirror/master/LICENSE)
![Language](https://img.shields.io/badge/language-javascript-yellowgreen.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/ca0e129db186bac5f1b4/maintainability)](https://codeclimate.com/github/tarampampam/random-user-agent/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ca0e129db186bac5f1b4/test_coverage)](https://codeclimate.com/github/tarampampam/random-user-agent/test_coverage)

Automatically replaces the User-Agent after a specified time interval

![Screenshot](https://raw.githubusercontent.com/tarampampam/random-user-agent/master/webstore_content/slides/slide-1.jpg)

### Warning

Depending on your threat model, faking your user agent might make you _more_ fingerprintable, not less. There are ways other than `User-Agent` sniffing to determine what browser you're using, so malicious sites could learn what browser you're _really_ using through other means and then combine that with your randomly changing `User-Agent` to pretty effectively track you. For background, see [this GitHub issue](https://github.com/tarampampam/random-user-agent/issues/47). You've been warned.

### Get the Plugin! [Google Webstore] & [Firefox Add-ons]

User-Agent - a string that is sent along to any website you visit. This is a sort of "fingerprint" your browser leaves behind which contains:
- The name and version of your browser;
- The name of the operating system (Mac, Windows, Linux, etc.) and its version;
- Information about some of the plugins installed on the browser;
- Other information that identifies and exposes you.

This extension has been created to stop data leakage. It automatically replaces User-Agent strings after a specified period of time with a randomly selected one. User-Agent strings can also be set manually. The extension is incredibly lightweight, using very few resources. User-Agent randomization can be customized by the user (what browsers and OS are spoofed, etc.). Exceptions list available with option of wildcards. Protects against Javascript exploits to hide your identity and protect your anonymity.

Source code: https://github.com/tarampampam/random-user-agent

> Thanks to SmudgedMuffin for English localization, and [@nazarpc](https://github.com/nazar-pc) for Ukrainian localization

Version History (Changelog)
----

* **2.2.5** - Updated Chrome, Firefox, and Edge versions, added support for Firefox on Android
* **2.2.4** - Fixes for #12 and #56
* **2.2.3** - [cf1446f](https://github.com/tarampampam/random-user-agent/commit/cf1446f6bfdcba7b7f505a9fe653bf98a8a1bea2) and [a865956](https://github.com/tarampampam/random-user-agent/commit/a86595668389b764ac5402a602826ed7c1546832)
* **2.2.2** - Major user agent update
* **2.2.1** - Fixed options windows height in Chrome 65
* **2.2.0** - [Added support for more than one custom user agent (chosen at random as well)](https://github.com/tarampampam/random-user-agent/commit/4aed6f999a378f0e676349ada2e57e13a0a0ece9) and [Edge 52 support](https://github.com/tarampampam/random-user-agent/commit/cd260fdd3781df169f5b83439e1c24e11ff45f9c)
* **2.1.11** - [Issue fixed where non-keyboard input of option values was ignored](https://github.com/tarampampam/random-user-agent/commit/660b8002b05fb0c8f050e11e0fa419357b5bd99b) ([#40](https://github.com/tarampampam/random-user-agent/issues/40)) and [update of Chrome versions](https://github.com/tarampampam/random-user-agent/commit/a6dd025cc60755f54e760317fd1014eb2699d25a)
* **2.1.10** - Added `zh_CN` localization (thx to [@yfdyh000](https://github.com/yfdyh000))
* **2.1.9** - Safari version update, preparations for Firefox version, regex fixes and JavaScript support enabled by default (88be3bd, 64f9eba, e2812b9, e34ba2d, ea9b9ba, 5f53fe3)
* **2.1.8** - Fixes by [@neroux](https://github.com/neroux)
* **2.1.7** - Small UA generator fixes
* **2.1.6** - Small UA generator fixes
* **2.1.5** - Try to fix "Issue #15"
* **2.1.4** - Text adjustments
* **2.1.3** - Up generated browsers versions
* **2.1.2** - Added gulp & bower supports, added donation link, refactoring
* **2.1.1** - Up generated browsers versions, fix JS-protection method (issue #10)
* **2.1.0.1** - Fix translation error
* **2.1.0** - All tests passed, stable release
* **2.0.5** - Added Ukrainian localization, removed font 'Roboto', font 'Material Icons' replaced with 'Flaticon' costom icons set
* **2.0.4** - Fixed manifest file error
* **2.0.3.1** - Small fixes
* **2.0.3** - Fixed synchronization event
* **2.0.2** - Added JS-protection, changed icons, added russian localization, small fixes
* **2.0.1** - Extension totally re-writed, repository re-created
* **1.5.5** - Updated User-Agent strings. (Updated the extension to use more "current" browsers)
* **1.5.4** - Fixed issue where auto-refresh interval wouldn't change
* **1.5.3** - Minor syntax amendments related to 'use strict'
* **1.5.2** - Fixed a bug with loading settings (caused by the previous version update =) )
* **1.5.1** - Fixed a bug with loading settings (default only after restarting the browser)
* **1.5** - Added exclusion (exception) list, changed the default settings, excluded files "content.js", minor bug fixes
* **1.4.1** - Updated language packs, minor improvements
* **1.4** - Redesigned User-agent's algorithm change - no longer selects from one preset option, it now generates fully - have randexp.js to thank for it. Removed the field "Description" as it was not correct. A large number of small improvements
* **1.3** - Added German (de) localization, fixed bugs in the absence of initialization
* **1.2** - First release on Github

### Building from sources

For a building extension from sources _(and pack as a `zip` file)_ use next commands:

```bash
$ cd /path/to/the/sources
$ gulp
```

> You can install `gulp` globally with next command: `$ sudo npm install -g gulp`

[Google Webstore]:https://chrome.google.com/webstore/detail/random-hide-user-agent/einpaelgookohagofgnnkcfjbkkgepnp
[randexp.js]:http://github.com/fent/randexp.js
[Firefox Add-ons]:https://addons.mozilla.org/firefox/addon/random_user_agent/
