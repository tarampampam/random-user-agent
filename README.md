<p align="center">
  <img width="84" alt="logo" src="https://bit.ly/3wxyYtf">
</p>
<p align="center">
  Automatically <strong>replaces the User-Agent</strong> with a <strong>randomized one</strong>
</p>
<p align="center">
  <a href="https://bit.ly/4dCzvut"><img alt="chrome" src="https://bit.ly/44FfWhb" /></a> &nbsp;
  <a href="https://mzl.la/4dHvNzH"><img alt="firefox" src="https://bit.ly/3QLahQJ" /></a> &nbsp;
  <a href="https://bit.ly/3V0biH7"><img alt="edge" src="https://bit.ly/3R9fkuP" /></a> &nbsp;
  <a href="https://bit.ly/3Vb8PtT"><img alt="opera" src="https://bit.ly/3yhs3VE" /></a>
</p>
<p align="center">
  Random User-Agent is an <strong>open-source</strong> MIT-licensed <strong>browser extension</strong> that is
  designed to replace the original browser User-Agent identifier (is a sort of "fingerprint") with a randomized
  (based on your preferences).
</p>
<p align="center">
  <a href="https://bit.ly/3Vb8PtT"><img alt="opera" src="https://bit.ly/44KOhLB" /></a>
</p>

## 🔥 Features list

- Incredibly lightweight (`~150KiB` archived)
- Available in the official stores ([Chrome][link-chrome-store], [Firefox][link-ff-store], [Edge][link-edge-store], [Opera][link-opera-store])
- Can automatically change the User-Agent after a specified period of time
- Change User-Agent on browser startup
- Replaces the `User-Agent` HTTP header
- Protection against detection by JavaScript
- User-Agent randomization can be customized by the user (specifying spoofed browsers and OS, etc.)
- Exceptions list (blacklist/whitelist) available
- Allows the use of a remote User-Agents list
- No initial setup needed - just install and forget about the real user-agent leaking

[link-chrome-store]:https://bit.ly/4dCzvut
[link-ff-store]:https://mzl.la/4dHvNzH
[link-edge-store]:https://bit.ly/3V0biH7
[link-opera-store]:https://bit.ly/3Vb8PtT

## 🧩 Installation

Follow up by one of the links at the top 👆 of this page, or download `CRX` ([link][latest-crx]) / `XPI`
([link][latest-xpi]) file directly from the latest release from the [releases page][releases].

[releases]:https://github.com/tarampampam/random-user-agent/releases
[latest-crx]:https://github.com/tarampampam/random-user-agent/releases/latest/download/random-user-agent.crx
[latest-xpi]:https://github.com/tarampampam/random-user-agent/releases/latest/download/random-user-agent.xpi

## 🛠 Where do I can test the functionality?

Open one of the links below both with and without the extension enabled:

| Resource                                            |          Test           |
|-----------------------------------------------------|:-----------------------:|
| [What is my User Agent][test-webbrowsertools]       | ✅ 5 Passed / ❌ 1 Failed |
| [whoer][test-whoer]                                 |        ✅ Passed         |
| [Browser Leaks][test-browserleaks]                  |        ✅ Passed         |
| [Device Info][test-deviceinfo]                      |        ✅ Passed         |
| [CreepJS][test-creepjs]                             |        ✅ Passed         |

[test-webbrowsertools]:https://webbrowsertools.com/useragent/
[test-whoer]:https://whoer.net/
[test-browserleaks]:https://browserleaks.com/javascript
[test-deviceinfo]:https://www.deviceinfo.me/
[test-creepjs]:https://abrahamjuliot.github.io/creepjs/

## 📡 Remote User-Agent List

Due to size limitations in the extension settings storage, you are unable to keep a large custom User-Agent list
directly within the extension. Instead, you can host your list elsewhere and provide a link to it in the extension
settings.

For example, you can create your own public repository/account on [GitHub Gist](https://gist.github.com/),
[GitLab](https://gitlab.com/), or similar platforms, and host your list there.

The extension will send a `GET` request to the provided URL location. The supported list format is as follows:

```text
// Comments like this will be ignored
 # Comments prefixed with '#' will also be ignored

Mozilla/5.0 (Macintosh; Intel Mac OS X 11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4619.141 Safari/537.36
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4593.122 Safari/537.36

// Additional user-agents can be listed here
```

> [!NOTE]
> #### 📜 How to translate (localize) this extension?
>
> ...or fix translation mistakes. The translation process described [here](src/i18n)

## 👀 FAQ

Most questions can be answered by reading the [issues][issues]. If the issues don't answer your question, open up a
new [discussion][discussions]. If you find a bug or have a feature request, please file a [new issue][new-issue].

<details markdown=1>
  <summary markdown="span">
    <strong>Could this extension actually be making users more uniquely fingerprintable, not less?</strong>
  </summary>

  Faking your user agent might make you _more_ fingerprintable, not less. There are ways other than `User-Agent`
  sniffing to determine what browser you're using, so malicious sites could learn what browser you're _really_ using
  through other means and then combine that with your randomly changing `User-Agent` to pretty effectively track you.
  For background, see [this GitHub issue](https://github.com/tarampampam/random-user-agent/issues/47).
</details>

<details markdown=1>
  <summary markdown="span"><strong>Why do hotkeys on some sites no longer work?</strong></summary>

  This may occur because your User-Agent simulates MacOS - in this case, some websites attempt to handle `⌘ cmd`
  key instead of `ctrl`. To fix this issue, simply disable the MacOS User-Agent in the extension generator settings.
</details>

<details markdown=1>
  <summary markdown="span"><strong>Are keyboard shortcuts supported?</strong></summary>

  Yes, keyboard shortcuts are supported. The default shortcut for user-agent renewal is `Ctrl+Shift+U`. You can
  change it in your browser settings: [chrome://extensions/shortcuts](chrome://extensions/shortcuts) (in Google Chrome).
</details>

[issues]:https://github.com/tarampampam/random-user-agent/issues
[new-issue]:https://github.com/tarampampam/random-user-agent/issues/new/choose
[discussions]:https://github.com/tarampampam/random-user-agent/discussions

## 🦾 Contributors

I want to express my heartfelt gratitude to everyone who has contributed to this project:

[![contributors](https://contrib.rocks/image?repo=tarampampam/random-user-agent)][contributors]

[contributors]: https://github.com/tarampampam/random-user-agent/graphs/contributors

## 🛡 Privacy Policy

> [!IMPORTANT]
> TL;DR: Random User-Agent has never collected and will never collect any personal data or browsing history.

You can find the full privacy policy text [here](PRIVACY_POLICY.md).

<details markdown=1><summary markdown="span"><strong>🚀 How to publish a release</strong></summary>

> [!NOTE]
> This note is for me, so I don't forget anything...

1. Make the required changes in this repository and test them locally
2. Publish a new release using the [releases page][releases]
3. Once the CI process is complete, download the `random-user-agent-chrome.zip` and `random-user-agent-firefox.zip`
files to my computer
4. Open the "[Chrome Web Store Developer Dashboard][chrome-upload-new]" and click the "Upload new package" button.
Proceed through the steps to publish the new package
5. Download the `main.crx` file from the dashboard, rename it to `random-user-agent.crx`, and upload it to the
[release on GitHub][releases]
6. Open the "[Mozilla add-on developer hub][ff-upload-new]", select the file, and proceed through the steps to
upload and publish the extension
7. Download the `random_user_agent_X.X.X-blabla.xpi` file from the dashboard (after receiving `Approved` status
for the version), rename it to `random-user-agent.xpi`, and upload it to the [release on GitHub][releases]
8. Don't forget to update the [Edge][edge-upload-new] and [Opera][opera-upload-new] stores
9. Open a bottle of beer; you've earned it!
</details>

[chrome-upload-new]:https://chrome.google.com/webstore/devconsole/ea9e18ff-c849-424a-acba-9b43eaad29c8/einpaelgookohagofgnnkcfjbkkgepnp/edit/package
[ff-upload-new]:https://addons.mozilla.org/en-US/developers/addon/random_user_agent/versions/submit/
[edge-upload-new]:https://partner.microsoft.com/en-us/dashboard/microsoftedge/6e5e9cbf-8846-4830-9fa5-9f77d03aa39f/packages
[opera-upload-new]:https://addons.opera.com/developer/package/266286/?tab=versions
[releases]:https://github.com/tarampampam/random-user-agent/releases
