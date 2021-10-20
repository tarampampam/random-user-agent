<p align="center">
  <img alt="logo" src="https://cdn.rawgit.com/tarampampam/random-user-agent/544a27ed/extension/img/128x128.png" width="80" height="80" />
</p>

# Random User-Agent

## :fire: A new major version will be available soon

[![Mozilla WebStore version][badge_mozilla_version]][link_firefox_store]
[![Chrome WebStore version][badge_websore_version]][link_google_store]
[![Issues][badge_issues]][link_issues]
[![Chat with team][badge_chat]][link_chat]
[![License][badge_license]][link_license]

Automatically replaces the User-Agent after a specified time interval

![Screenshot][link_screenshot]

> ### Warning
>
> Depending on your threat model, faking your user agent might make you _more_ fingerprintable, not less. There are ways other than `User-Agent` sniffing to determine what browser you're using, so malicious sites could learn what browser you're _really_ using through other means and then combine that with your randomly changing `User-Agent` to pretty effectively track you. For background, see [this GitHub issue](https://github.com/tarampampam/random-user-agent/issues/47). You've been warned.

## Get the Plugin! [Google Webstore][link_google_store] & [Firefox Add-ons][link_firefox_store]

[![Chrome WebStore users][badge_websore_users]][link_google_store]
[![Chrome WebStore rating][badge_websore_rating]][link_google_store]
![arrows][badge_browsers_arrows]
[![Mozilla WebStore rating][badge_mozilla_users]][link_firefox_store]
[![Mozilla WebStore rating][badge_mozilla_rating]][link_firefox_store]

User-Agent - a string that is sent along to any website you visit. This is a sort of "fingerprint" your browser leaves behind which contains:
- The name and version of your browser;
- The name of the operating system (Mac, Windows, Linux, etc.) and its version;
- Information about some of the plugins installed on the browser;
- Other information that identifies and exposes you.

This extension has been created to stop data leakage. It automatically replaces User-Agent strings after a specified period of time with a randomly selected one. User-Agent strings can also be set manually. The extension is incredibly lightweight, using very few resources. User-Agent randomization can be customized by the user (what browsers and OS are spoofed, etc.). Exceptions list available with option of wildcards. Protects against Javascript exploits to hide your identity and protect your anonymity.

> Thanks to SmudgedMuffin for English localization, and [@nazarpc](https://github.com/nazar-pc) for Ukrainian localization

## Changes log

[![Release version][badge_release_version]][link_changeslog]
[![Released][badge_release_date]][link_changeslog]
[![Commits since latest release][badge_commits_since_release]][link_commits]

Take a look [here][link_changeslog].

## Building from sources

For a building extension from sources _(and pack as a `zip` file)_ use next commands:

> Installed `docker-ce` is required

```bash
$ cd /path/to/the/sources
$ make build
```

[badge_release_version]:https://img.shields.io/github/release/tarampampam/random-user-agent.svg?style=flat-square&maxAge=120
[badge_websore_version]:https://img.shields.io/chrome-web-store/v/einpaelgookohagofgnnkcfjbkkgepnp.svg?style=for-the-badge&maxAge=120
[badge_mozilla_version]:https://img.shields.io/amo/v/random_user_agent.svg?style=for-the-badge&maxAge=120
[badge_websore_users]:https://img.shields.io/chrome-web-store/users/nimelepbpejjlbmoobocpfnjhihnpked.svg?style=flat-square&maxAge=120
[badge_websore_rating]:https://img.shields.io/chrome-web-store/rating/nimelepbpejjlbmoobocpfnjhihnpked.svg?style=flat-square&maxAge=120
[badge_browsers_arrows]:https://img.shields.io/badge/%E2%86%90%20chrome-firefox%20%E2%86%92-yellowgreen.svg?style=flat-square&maxAge=120
[badge_mozilla_users]:https://img.shields.io/amo/users/random_user_agent.svg?style=flat-square&maxAge=120
[badge_mozilla_rating]:https://img.shields.io/amo/rating/random_user_agent.svg?style=flat-square&maxAge=120
[badge_commits_since_release]:https://img.shields.io/github/commits-since/tarampampam/random-user-agent/latest.svg?style=flat-square&maxAge=120
[badge_release_date]:https://img.shields.io/github/release-date/tarampampam/random-user-agent.svg?style=flat-square&maxAge=120
[badge_issues]:https://img.shields.io/github/issues/tarampampam/random-user-agent.svg?style=for-the-badge&maxAge=120
[badge_license]:https://img.shields.io/github/license/tarampampam/random-user-agent.svg?style=for-the-badge&maxAge=120
[badge_chat]:https://img.shields.io/badge/chat-on-brightgreen.svg?style=for-the-badge&maxAge=120
[link_issues]:https://github.com/tarampampam/random-user-agent/issues
[link_commits]:https://github.com/tarampampam/random-user-agent/commits
[link_license]:./LICENSE
[link_changeslog]:./CHANGELOG.md
[link_screenshot]:https://raw.githubusercontent.com/tarampampam/random-user-agent/master/webstore_content/slides/slide-1.jpg
[link_chat]:https://app.stride.com/25f75df0-13c7-4e1a-8f3c-f01e9d85cb5b/chat/e5af00b7-e5a9-4e0f-a95d-e0c592bd4379
[link_google_store]:https://chrome.google.com/webstore/detail/random-hide-user-agent/einpaelgookohagofgnnkcfjbkkgepnp
[link_firefox_store]:https://addons.mozilla.org/firefox/addon/random_user_agent/
[randexp.js]:http://github.com/fent/randexp.js
