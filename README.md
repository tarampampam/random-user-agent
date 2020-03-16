<p align="center">
  <img alt="logo" src="https://cdn.rawgit.com/tarampampam/random-user-agent/544a27ed/extension/img/128x128.png" width="80" height="80" />
</p>

# Random User-Agent

[![Release version][badge_release_version]][link_changelog]
[![Mozilla WebStore version][badge_mozilla_version]][link_firefox_store]
[![Chrome WebStore version][badge_websore_version]][link_google_store]
[![License][badge_license]][link_license]

Automatically replaces the User-Agent after a specified time interval

![Screenshot](https://hsto.org/webt/cl/cz/iv/clczivrmvn47ryadjvtyb13qqom.jpeg)

> **Warning**
>
> Depending on your threat model, faking your user agent might make you _more_ fingerprintable, not less. There are ways other than `User-Agent` sniffing to determine what browser you're using, so malicious sites could learn what browser you're _really_ using through other means and then combine that with your randomly changing `User-Agent` to pretty effectively track you. For background, see [this GitHub issue](https://github.com/tarampampam/random-user-agent/issues/47). You've been warned.

## Get the Plugin! [Google WebStore][link_google_store] & [Firefox Add-ons][link_firefox_store]

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

## Changes log

[![Released][badge_release_date]][link_changelog]
[![Commits since latest release][badge_commits_since_release]][link_commits]

Changes log can be [found here][link_changelog].

## Development

[![Issues][badge_issues]][link_issues]
[![Pull requests][badge_prs]][link_prs]

For local extension development you should:

- Clone this repository on your device
- Install all dependencies using `make install` command _(or `make shell` and then `yarn install`)_
- Build extension with "changes watching" - `make watch`
- Open in your Google Chrome [extensions page](chrome://extensions/), switch "Developer mode" **on**, press "Load unpacked extension" and specify path to the directory `./dist` in cloned in first step directory

> For direct extension pages opening you can use links in following format _(`some-unique-extension-id` can be found on [extensions page](chrome://extensions/))_:
> - `chrome-extension://some-unique-extension-id/popup/popup.html`
> - `chrome-extension://some-unique-extension-id/options/options.html`

Localization guide [located here](./src/_locales/readme.md).

## Testing

[![Build Status][badge_build]][link_build]
[![Coverage][badge_coverage]][link_coverage]

For package testing we use `jest` and `docker-ce` as develop environment. So, just write into your terminal after repository cloning:

```shell script
$ make install
$ make lint
$ make test
```

## Building from sources

For local extension building you must clone this repository and execute `make build` inside _(installed `docker-ce` is required)_. Directory `./dist-zip` will contains archive with extension.

[badge_release_version]:https://img.shields.io/github/release/tarampampam/random-user-agent.svg?style=for-the-badge&maxAge=120&logo=github&logoColor=white
[badge_websore_version]:https://img.shields.io/chrome-web-store/v/einpaelgookohagofgnnkcfjbkkgepnp.svg?style=for-the-badge&maxAge=120&logo=google-chrome&logoColor=white
[badge_mozilla_version]:https://img.shields.io/amo/v/random_user_agent.svg?style=for-the-badge&maxAge=120&logo=mozilla&logoColor=white
[badge_websore_users]:https://img.shields.io/chrome-web-store/users/nimelepbpejjlbmoobocpfnjhihnpked.svg?style=flat-square&maxAge=120
[badge_websore_rating]:https://img.shields.io/chrome-web-store/rating/nimelepbpejjlbmoobocpfnjhihnpked.svg?style=flat-square&maxAge=120
[badge_browsers_arrows]:https://img.shields.io/badge/%E2%86%90%20chrome-firefox%20%E2%86%92-yellowgreen.svg?style=flat-square&maxAge=120
[badge_mozilla_users]:https://img.shields.io/amo/users/random_user_agent.svg?style=flat-square&maxAge=120
[badge_mozilla_rating]:https://img.shields.io/amo/rating/random_user_agent.svg?style=flat-square&maxAge=120
[badge_commits_since_release]:https://img.shields.io/github/commits-since/tarampampam/random-user-agent/latest.svg?maxAge=120
[badge_release_date]:https://img.shields.io/github/release-date/tarampampam/random-user-agent.svg?maxAge=120
[badge_issues]:https://img.shields.io/github/issues/tarampampam/random-user-agent.svg?maxAge=120
[badge_prs]:https://img.shields.io/github/issues-pr/tarampampam/random-user-agent.svg?maxAge=120
[badge_license]:https://img.shields.io/github/license/tarampampam/random-user-agent.svg?style=for-the-badge&maxAge=120
[badge_build]:https://img.shields.io/github/workflow/status/tarampampam/random-user-agent/build/master?maxAge=30&logo=github
[badge_coverage]:https://img.shields.io/codecov/c/github/tarampampam/random-user-agent/master.svg?maxAge=60

[link_issues]:https://github.com/tarampampam/random-user-agent/issues
[link_prs]:https://github.com/tarampampam/random-user-agent/pulls
[link_commits]:https://github.com/tarampampam/random-user-agent/commits
[link_license]:./LICENSE
[link_changelog]:./CHANGELOG.md
[link_google_store]:https://chrome.google.com/webstore/detail/random-hide-user-agent/einpaelgookohagofgnnkcfjbkkgepnp
[link_firefox_store]:https://addons.mozilla.org/firefox/addon/random_user_agent/
[link_build]:https://github.com/tarampampam/random-user-agent/actions
[link_coverage]:https://codecov.io/gh/avto-dev/identity-laravel/
