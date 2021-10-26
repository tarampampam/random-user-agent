# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][keepachangelog] and this project adheres to [Semantic Versioning][semver].

## v3.0.0

### Changed

- **The extension has been completely rewritten on TypeScript**
- The new settings format is not compatible with the previous version (you should migrate them manually - use the settings page to watch previous settings)
- Improved User-Agent's generator

### Removed

- Locales `uk` and `zh_CH` :(

## v2.2.11

### Changed

- Update of user agent versions
- Update of underlying regular expression library

## v2.2.10

### Removed

- (Firefox-only) Removed on Firefox the JavaScript preference as well as the script overriding the user agent ([f04e149] and [2569b90]; this addresses [#60] and fixes [#59] and [#98])

[f04e149]:https://github.com/tarampampam/random-user-agent/commit/f04e149fed0adc9caa7cf70f4cbf22254fcf2cdb
[2569b90]:https://github.com/tarampampam/random-user-agent/commit/2569b90e2ff63d9d6ec26bf9e9465f777997b7a3
[#60]:https://github.com/tarampampam/random-user-agent/issues/60
[#59]:https://github.com/tarampampam/random-user-agent/issues/59
[#98]:https://github.com/tarampampam/random-user-agent/issues/98

## v2.2.9

### Changed

- Fix for an incomplete Chrome user agent [0265aa3]

[0265aa3]:https://github.com/tarampampam/random-user-agent/commit/0265aa3058a97953e38f253e22e262cb8285e87e

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

[#12]:https://github.com/tarampampam/random-user-agent/issues/12
[#56]:https://github.com/tarampampam/random-user-agent/issues/56

## v2.2.3

### Changed

- [cf1446f] and [a865956]

[cf1446f]:https://github.com/tarampampam/random-user-agent/commit/cf1446f6bfdcba7b7f505a9fe653bf98a8a1bea2
[a865956]:https://github.com/tarampampam/random-user-agent/commit/a86595668389b764ac5402a602826ed7c1546832

## v2.2.2

### Changed

- Major user agent update

## v2.2.1

### Fixed

- Fixed options windows height in Chrome 65

## v2.2.0

### Changed

- [Added support for more than one custom user agent (chosen at random as well)][4aed6f9]
- [Edge 52 support][cd260fd]

[4aed6f9]:https://github.com/tarampampam/random-user-agent/commit/4aed6f999a378f0e676349ada2e57e13a0a0ece9
[cd260fd]:https://github.com/tarampampam/random-user-agent/commit/cd260fdd3781df169f5b83439e1c24e11ff45f9c

## v2.1.11

### Changed

- Issue fixed where non-keyboard input of option values was ignored [#40]
- [Update of Chrome versions][a6dd025]

[#40]:https://github.com/tarampampam/random-user-agent/issues/40
[a6dd025]:https://github.com/tarampampam/random-user-agent/commit/a6dd025cc60755f54e760317fd1014eb2699d25a

## v2.1.10

### Changed

- Added `zh_CN` localization (thx to [@yfdyh000](https://github.com/yfdyh000))

## v2.1.9

### Changed

- Safari version update, preparations for Firefox version
- Regex fixes and JavaScript support enabled by default (88be3bd, 64f9eba, e2812b9, e34ba2d, ea9b9ba, 5f53fe3)

## v2.1.8

### Fixed

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

[#15]:https://github.com/tarampampam/random-user-agent/issues/15

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

- Translation error
- JS-protection method [#10]

[#10]:https://github.com/tarampampam/random-user-agent/issues/10

## v2.1.0

### Changed

- All tests passed, stable release

## v2.0.5

### Added

- Added Ukrainian localization

### Removed

- Font `Roboto`, font `Material Icons` replaced with `Flaticon` custom icons set

## v2.0.4

### Fixed

- Fixed manifest file error

## v2.0.3-1

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
- Russian localization

### Fixed

- Small fixes

## v2.0.1

### Changed

- Extension totally rewrote, repository re-created

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

## v1.5.0

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

## v1.4.0

### Changed

- Redesigned User-agent's algorithm change - no longer selects from one preset option, it now generates fully - have `randexp.js` to thank for it

### Removed

- Field "Description" as it was not correct

### Fixed

- A large number of small improvements

## v1.3.0

### Added

- Added German (de) localization, fixed bugs in the absence of initialization

## v1.2.0

### Changed

- First release on Github

[keepachangelog]:https://keepachangelog.com/en/1.0.0/
[semver]:https://semver.org/spec/v2.0.0.html
