<p align="center">
  <img alt="logo" src="https://hsto.org/webt/ll/p7/zn/llp7zncabngc8lnfynz9-wm0zni.png" height="80" />
</p>

# Random User-Agent

[![Release version][badge_release_version]][link_changelog]
[![Chrome WebStore version][badge_websore_version]][link_google_store]
[![License][badge_license]][link_license]

Automatically replaces the User-Agent after a specified time interval

![Screenshot](https://hsto.org/webt/cl/cz/iv/clczivrmvn47ryadjvtyb13qqom.jpeg)

User-Agent - a string that is sent along to any website you visit. This is a sort of "fingerprint" your browser leaves behind which contains:

- The name and version of your browser;
- The name of the operating system (Mac, Windows, Linux, etc.) and its version;
- Information about some plugins installed on the browser;
- Other information that identifies and exposes you.

This extension has been created to stop data leakage. It automatically replaces User-Agent strings after a specified period of time with a randomly selected one. User-Agent strings can also be set manually. The extension is incredibly lightweight, using very few resources. User-Agent randomization can be customized by the user (what browsers and OS are spoofed, etc.). Exceptions list available with option of wildcards. Protects against Javascript exploits to hide your identity and protect your anonymity.

> **Warning**
>
> Depending on your threat model, faking your user agent might make you _more_ fingerprintable, not less. There are ways other than `User-Agent` sniffing to determine what browser you're using, so malicious sites could learn what browser you're _really_ using through other means and then combine that with your randomly changing `User-Agent` to pretty effectively track you. For background, see [this GitHub issue](https://github.com/tarampampam/random-user-agent/issues/47). You've been warned.

## How to translate (localize) this extension?

The translation process described [here](./public/_locales).

## Where can I check the functionality?

- <https://tarampampam.github.io/random-user-agent/>
- <https://webbrowsertools.com/useragent/>

## Known issues

User-agent can't be replaced (for now) in Google Chrome for pages with aggressive (inline JavaScript) detection. For example:

```html
<!doctype html>
<html>
<head>
  <script>
    console.log(navigator.userAgent) // Real user-agent will be detected
  </script>
</head>
</html>
```

This method is quite rare (usually JavaScript code is wrapped in `Promises`, `setTimeout` or event listeners), but so far no way around this kind of checking has been invented.

### Useful links for developers

- [Manifest file format (v3)](https://developer.chrome.com/docs/extensions/mv3/manifest/)
- [Chrome Extension TypeScript Starter](https://github.com/chibat/chrome-extension-typescript-starter)

## TODO

- [ ] Translation platform integration
- [ ] Provide donation link
- [ ] Dark theme `@media (prefers-color-scheme: dark) {`
- [ ] Sentry or something similar
- [ ] Use the <https://github.com/mozilla/webextension-polyfill>

[badge_release_version]:https://img.shields.io/github/release/tarampampam/random-user-agent.svg?style=for-the-badge&maxAge=120&logo=github&logoColor=white
[badge_websore_version]:https://img.shields.io/chrome-web-store/v/einpaelgookohagofgnnkcfjbkkgepnp.svg?style=for-the-badge&maxAge=120&logo=google-chrome&logoColor=white
[badge_license]:https://img.shields.io/github/license/tarampampam/random-user-agent.svg?style=for-the-badge&maxAge=120

[link_changelog]:./CHANGELOG.md
[link_license]:./LICENSE
[link_google_store]:https://chrome.google.com/webstore/detail/random-hide-user-agent/einpaelgookohagofgnnkcfjbkkgepnp


