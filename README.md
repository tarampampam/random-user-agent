[![GitHub license](https://img.shields.io/badge/license-WTFPL-blue.svg)](https://raw.githubusercontent.com/tarampampam/nod32-update-mirror/master/LICENSE) ![Language](https://img.shields.io/badge/language-javascript-yellowgreen.svg)

# Random User-Agent

Automatically replaces the User-Agent after a specified time interval

![Screenshot](https://raw.githubusercontent.com/tarampampam/random-user-agent/master/webstore_content/slides/slide-1.jpg)

### Get the Plugin! [Google Webstore]

User-Agent - a string that is sent along to any website you visit. This is a sort of "fingerprint" your browser leaves behind which contains:
- The name and version of your browser;
- The name of the operating system (Mac, Windows, Linux, etc.) and its version;
- Information about some of the plugins installed on the browser;
- Other information that identifies and exposes you.

This extension has been created to stop data leakage. It automatically replaces User-Agent strings after a specified period of time with a randomly selected one. User-Agent strings can also be set manually. The extension is incredibly lightweight, using very few resources. User-Agent randomization can be customized by the user (what browsers and OS are spoofed, etc.). Exceptions list available with option of wildcards. Protects against Javascript exploits to hide your identity and protect your anonymity.

Source code: https://github.com/tarampampam/random-user-agent

> Thanks to [@SmudgedMuffin](https://github.com/SmudgedMuffin) for English localization, and [@nazarpc](https://github.com/nazar-pc) for Ukrainian localization

Version History (Changelog)
----

* **2.1.8** - Fixes by @neroux
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

[Google Webstore]:https://chrome.google.com/webstore/detail/random-hide-user-agent/einpaelgookohagofgnnkcfjbkkgepnp
[randexp.js]:http://github.com/fent/randexp.js
