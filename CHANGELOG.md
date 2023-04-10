# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][keepachangelog] and this project adheres to [Semantic Versioning][semver].

## v3.17.0

### Changed

- Update of user agent versions

### Added

- 🇺🇦 Ukrainian localization by [@Yctftcyfc](https://github.com/Yctftcyfc)
- 🇵🇱 Polish localization by [@Yctftcyfc](https://github.com/Yctftcyfc)
- 🇯🇵 Japanese localization by [@webact1](https://github.com/webact1)
- 🇹🇷 Turkish localization by [@webact1](https://github.com/webact1)
- 🇪🇸 Spanish localization by [@webact1](https://github.com/webact1)

## v3.16.2

### Changed

- Update of user agent versions

## v3.16.1

### Changed

- Update of user agent versions

### Fixed

- Indonesian localization [#379]

[379]:https://github.com/tarampampam/random-user-agent/pull/379

## v3.16.0

### Added

- 🇮🇩 Indonesian localization by [@tustoz](https://github.com/tustoz) [#377]

[#377]:https://github.com/tarampampam/random-user-agent/pull/377

## v3.15.1

### Fixed

- Hover icon title text [#370]

[#370]:https://github.com/tarampampam/random-user-agent/issues/370

## v3.15.0

### Added

- Displaying current user-agent on extension icon hover [#364]

### Changed

- The whitelist/blacklist modes toggle was redesigned [#369]

### Fixed

- Settings toggle for Black\White-List logic [#367]

[#364]:https://github.com/tarampampam/random-user-agent/issues/364
[#367]:https://github.com/tarampampam/random-user-agent/issues/367
[#369]:https://github.com/tarampampam/random-user-agent/pull/369

## v3.14.2

### Fixed

- War hint offsets (popup window scrolling)
- Icons size of quick generator switcher

## v3.14.1

### Fixed

- Quick generator switcher behavior

## v3.14.0

### Added

- Quick generator switcher in the popup window [#354]
- "Rate this addon" button (displayed until it is clicked once) [#356]
- 🇫🇷 French localization by [@maxgfr](https://github.com/maxgfr) [#355]

### Changed

- Extension name `Random User-Agent` &rarr; `Random User-Agent (Switcher)` [#354]
- Default generator type settings (for new users) [#356]

### Fixed

- Browser detection method (for internal usage only; [reason](https://bugzilla.mozilla.org/show_bug.cgi?id=1754441)) [#356]

[#354]:https://github.com/tarampampam/random-user-agent/pull/354
[#356]:https://github.com/tarampampam/random-user-agent/pull/356
[#355]:https://github.com/tarampampam/random-user-agent/pull/355

## v3.13.1

### Fixed

- Required locale for displaying the war hint

## v3.13.0

### Changed

- Extension icon reverted

### Added

- A war hint for Russian users

### Removed

- "Previous settings" tab from the options page

## v3.12.0

### Added

- Keyboard shortcut to user-agent renewal (`Ctrl+Shift+U` by default) [#289], [#352]

[#289]:https://github.com/tarampampam/random-user-agent/issues/289
[#352]:https://github.com/tarampampam/random-user-agent/pull/352

## v3.11.0

### Added

- Additional HTTP header (`Sec-CH-UA-Full-Version`, header is [deprecated](https://mzl.la/3g1NzEI)) faking [#351]
- HTTP header `Sec-CH-UA-Platform-Version` replacing with empty value [#351]
- [`navigator.userAgentData`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgentData) object faking [#350], [#351]

### Changed

- Better **custom** user agents _(including remote)_ OS/engine/browser determination (is needed for more accurate masking of the browser) [#351]

[#350]:https://github.com/tarampampam/random-user-agent/issues/350
[#351]:https://github.com/tarampampam/random-user-agent/pull/351

## v3.10.0

### Added

- Additional HTTP headers (`Sec-CH-UA`, `Sec-CH-UA-Full-Version-List`, `Sec-CH-UA-Platform`, `Sec-CH-UA-Mobile`) faking [#348]

[#348]:https://github.com/tarampampam/random-user-agent/issues/348

## v3.9.0

### Changed

- Versions of the generated user-agents

## v3.8.0

### Changed

- Versions of the generated user-agents

## v3.7.0

### Changed

- Versions of the generated user-agents

## v3.6.0

### Changed

- Versions of the generated user-agents

## v3.5.0

### Added

- Generator for "Edge on Mac" [#222]

[#222]:https://github.com/tarampampam/random-user-agent/issues/222

## v3.4.0

### Added

- German `de` localization (thanks to [@Xenorio](https://github.com/Xenorio))

### Changed

- Versions of the generated user-agents

### Fixed

- Portuguese translation

## v3.3.1

### Fixed

- Navigator `oscpu` leaking [#191]

[#191]:https://github.com/tarampampam/random-user-agent/issues/191

## v3.3.0

### Added

- Chinese `zh_CN` localization (thanks to [@yfdyh000](https://github.com/yfdyh000))
- Portuguese `pt_BR` localization (thanks to [@inkhorn-ptbr](https://github.com/inkhorn-ptbr))
- "Save changes" button on the options page
- Possibility to use the remote User-Agents list [#190], [#175]

### Changed

- Custom user-agent list on the settings page now limited (maximal `4096` symbols are allowed, [the reason is QUOTA_BYTES_PER_ITEM](https://developer.chrome.com/docs/extensions/reference/storage/#property-sync))
- New options page [#189]

### Fixed

- `extraHeaders` options bug for `onHeadersReceived` hook in FireFox
- Colors in the popup window when chrome uses the "Force Dark" feature [#184]

[#175]:https://github.com/tarampampam/random-user-agent/issues/175
[#190]:https://github.com/tarampampam/random-user-agent/pull/190
[#189]:https://github.com/tarampampam/random-user-agent/pull/189
[#184]:https://github.com/tarampampam/random-user-agent/issues/184

## v3.2.0

### Added

- Watching for the dynamically created iframes and pathing them

### Fixed

- Aggressive User-Agent detection (now even the inline scripts cannot detect the real User-Agent; thanks to [@neroux](https://github.com/neroux) for the idea) [#26], [#36]
- Navigator `platform` and `vendor` leaking [#7], [#144]

[#144]:https://github.com/tarampampam/random-user-agent/issues/144
[#7]:https://github.com/tarampampam/random-user-agent/issues/7
[#26]:https://github.com/tarampampam/random-user-agent/issues/26
[#36]:https://github.com/tarampampam/random-user-agent/issues/36

## v3.1.1

### Fixed

- User agent detection inside iframes [#142], [#36]

[#142]:https://github.com/tarampampam/random-user-agent/issues/142
[#36]:https://github.com/tarampampam/random-user-agent/issues/36

## v3.1.0

### Added

- Vietnamese (`vi`) localization, translated by the robots
- Dark theme for the popup window (Firefox only)

### Changed

- `i18n` function calls in Vue files now with fallbacks

## v3.0.0

### Changed

- **The extension has been completely rewritten on TypeScript**
- The new settings format is not compatible with the previous version (you should migrate them manually - use the settings page to watch previous settings)
- Improved User-Agent's generator

### Removed

- Locales `uk` and `zh_CH` :(

## v2.2.13

### Changed

- Update of user agent versions
- Console message with faked user-agent is disabled

## v2.2.12

### Changed

- Update of user agent versions

## v2.2.11

### Changed

- Update of user agent versions
- Update of underlying regular expression library

## v2.2.10

### Removed (Firefox-only)

- Removed on Firefox the JavaScript preference as well as the script overriding the user agent ([f04e149](https://github.com/tarampampam/random-user-agent/commit/f04e149fed0adc9caa7cf70f4cbf22254fcf2cdb) and [2569b90](https://github.com/tarampampam/random-user-agent/commit/2569b90e2ff63d9d6ec26bf9e9465f777997b7a3)).
  This addresses #60 and fixes #59 and #98

## v2.2.9

### Changed

- Fix for an incomplete Chrome user agent - [0265aa3](https://github.com/tarampampam/random-user-agent/commit/0265aa3058a97953e38f253e22e262cb8285e87e)

## v2.2.8

### Changed

- Update of user agent versions

## v2.2.7

### Changed

- Update of user agent versions
- Legacy code removed

## v2.2.6

### Changed

- Updated browser versions

## v2.2.5

### Changed

- Updated Chrome, Firefox, and Edge versions

### Added

- Support for Firefox on Android

## v2.2.4

### Fixed

- Fixes for [#12] and [#56]

## v2.2.3

### Changed

- [cf1446f](https://github.com/tarampampam/random-user-agent/commit/cf1446f6bfdcba7b7f505a9fe653bf98a8a1bea2) and [a865956](https://github.com/tarampampam/random-user-agent/commit/a86595668389b764ac5402a602826ed7c1546832)

## v2.2.2

### Changed

- Major user agent update

## v2.2.1

### Fixed

- Fixed options windows height in Chrome 65

## v2.2.0

### Changed

- [Added support for more than one custom user agent (chosen at random as well)](https://github.com/tarampampam/random-user-agent/commit/4aed6f999a378f0e676349ada2e57e13a0a0ece9) and [Edge 52 support](https://github.com/tarampampam/random-user-agent/commit/cd260fdd3781df169f5b83439e1c24e11ff45f9c)

## v2.1.11

### Changed

- Issue fixed where non-keyboard input of option values was ignored [#40]
- [Update of Chrome versions](https://github.com/tarampampam/random-user-agent/commit/a6dd025cc60755f54e760317fd1014eb2699d25a)

## v2.1.10

### Changed

- Added `zh_CN` localization (thx to [@yfdyh000](https://github.com/yfdyh000))

## v2.1.9

### Changed

- Safari version update, preparations for Firefox version
- Regex fixes and JavaScript support enabled by default (88be3bd, 64f9eba, e2812b9, e34ba2d, ea9b9ba, 5f53fe3)

## v2.1.8

### Fixes

- Fixes by [@neroux](https://github.com/neroux)

## v2.1.7

### Changed

- Small UA generator fixes

## v2.1.6

### Changed

- Small UA generator fixes

## v2.1.5

### Fixed

- Issue fix [#15]

## v2.1.4

### Changed

- Text adjustments

## v2.1.3

### Changed

- Up generated browsers versions

## v2.1.2

### Added

- Gulp & bower supports
- Donation link

### Changed

- Refactoring

## v2.1.1

### Changed

- Up generated browsers versions

### Fixed

- JS-protection method [#10]

## v2.1.0.1

### Fixed

- Fix translation error

## v2.1.0

### Changed

- All tests passed, stable release

## v2.0.5

### Added

- Added Ukrainian localization

### Removed

- Font 'Roboto', font 'Material Icons' replaced with 'Flaticon' costom icons set

## v2.0.4

### Fixed

- Fixed manifest file error

## v2.0.3.1

### Fixed

- Small fixes

## v2.0.3

### Changed

- Fixed synchronization event

## v2.0.2

### Added

- JS-protection

### Changed

- Icons

### Added

- Russian localization

### Fixed

- Small fixes

## v2.0.1

### Changed

- Extension totally re-writed, repository re-created

## v1.5.5

### Changed

- Updated User-Agent strings (updated the extension to use more "current" browsers)

## v1.5.4

### Fixed

- Fixed issue where auto-refresh interval wouldn't change

## v1.5.3

### Changed

- Minor syntax amendments related to `'use strict'`

## v1.5.2

### Fixed

- A bug with loading settings (caused by the previous version update =) )

## v1.5.1

### Fixed

- A bug with loading settings (default only after restarting the browser)

## v1.5

### Added

- Added exclusion (exception) list

### Changed

- Default settings
- Excluded files "content.js"

### Fixed

- Minor bug fixes

## v1.4.1

### Changed

- Updated language packs, minor improvements

## v1.4

### Changed

- Redesigned User-agent's algorithm change - no longer selects from one preset option, it now generates fully - have `randexp.js` to thank for it

### Removed

- Field "Description" as it was not correct

### Fixed

- A large number of small improvements

## v1.3

### Added

- Added German (de) localization, fixed bugs in the absence of initialization

## v1.2

### Changed

- First release on Github

[keepachangelog]:https://keepachangelog.com/en/1.0.0/
[semver]:https://semver.org/spec/v2.0.0.html
