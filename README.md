<p align="center"><img width="84" alt="logo" src="https://hsto.org/webt/zh/yz/3t/zhyz3t3knfyukt8pfnshd_xehrm.png"></p>
<p align="center">Automatically <strong>replaces the User-Agent</strong> with a <strong>randomized one</strong>.</p>
<br/>
<p align="center">
  <a href="https://chrome.google.com/webstore/detail/random-hide-user-agent/einpaelgookohagofgnnkcfjbkkgepnp/"><img alt="Chrome Web Store" src="https://img.shields.io/chrome-web-store/v/einpaelgookohagofgnnkcfjbkkgepnp.svg?style=for-the-badge&cacheSeconds=120&logo=google-chrome&label=google%20chrome&logoColor=white"></a> &nbsp; <a href="https://addons.mozilla.org/firefox/addon/random_user_agent/"><img alt="Firefox Add-ons" src="https://img.shields.io/amo/v/random_user_agent.svg?style=for-the-badge&cacheSeconds=120&logo=firefox-browser&label=firefox&logoColor=white"></a> &nbsp; <a href="https://microsoftedge.microsoft.com/addons/detail/random-useragent/addfjgllfhpnacoahmmcafmaacjloded"><img alt="Edge Addons" src="https://img.shields.io/badge/Edge-555555.svg?&style=for-the-badge&logo=microsoft-edge&logoColor=white"></a> &nbsp; <a href="https://addons.opera.com/en/extensions/details/random-user-agent/"><img alt="Opera Addons" src="https://img.shields.io/badge/Opera-555555.svg?&style=for-the-badge&logo=opera&logoColor=white"></a>
</p>
<p align="center">Random User-Agent is an <strong>open-source</strong> MIT-licensed <strong>browser extension</strong> that is designed to replace the original browser User-Agent identifier (is a sort of "fingerprint") with a randomized (based on your preferences). The extension is incredibly lightweight, using very few resources.</p>
<br/>

![promo-tile](https://user-images.githubusercontent.com/7326800/197565861-a0c25dac-b495-4005-893f-43852e6ac121.png)

## 🔥 Features list

- Incredibly lightweight (`~100KiB` archived)
- Available in the official stores ([chrome][link-chrome-store], [firefox][link-ff-store], [edge][link-edge-store], [opera][link-opera-store])
- Can automatically change the User-Agent after a specified period of time
- Change User-Agent on browser startup
- Replaces `User-Agent` HTTP header
- Protect against detection by JavaScript
- User-Agent randomization can be customized by the user (what browsers and OS are spoofed, etc.)
- Exceptions list (blacklist/whitelist) available with option of wildcards
- Allows using the remote User-Agents list
- Doesn't need initial setup - just install and forget about the real user-agent leaking

## 📷 Screenshots

|         Popup          |     General settings     |     Generator settings     |     Blacklist settings     |
|:----------------------:|:------------------------:|:--------------------------:|:--------------------------:|
| [![popup][scr1]][scr1] | [![general][scr2]][scr2] | [![generator][scr3]][scr3] | [![blacklist][scr4]][scr4] |

[scr1]:https://user-images.githubusercontent.com/7326800/196230135-470112aa-2c54-46bf-97cd-ca884acc8810.png
[scr2]:https://user-images.githubusercontent.com/7326800/197563815-a0ef73b9-592c-43f4-bf7e-74cf7bb083bb.png
[scr3]:https://user-images.githubusercontent.com/7326800/197563826-130bfab9-47bc-4025-a8da-3244d6dd2688.png
[scr4]:https://user-images.githubusercontent.com/7326800/197563829-18edc1f8-5125-47c3-b54a-3b8fdfb503b7.png

## 🧩 Installation

Follow up by one of the links at the top 👆 of this page, or download `CRX` ([link][latest-crx]) / `XPI` ([link][latest-xpi]) file directly from the latest release from the [releases page][releases].

[latest-crx]:https://github.com/tarampampam/random-user-agent/releases/latest/download/random-user-agent.crx
[latest-xpi]:https://github.com/tarampampam/random-user-agent/releases/latest/download/random-user-agent.xpi

## 🛠 Where do I can test the functionality?

Open one of the links below with and without the extension enabled:

| Resource                                            |          Test           |
|-----------------------------------------------------|:-----------------------:|
| [What is my User Agent][test-webbrowsertools]       | ✅ 3 Passed / ❌ 3 Failed |
| [Browser Information (BrowserSPY)][test-browserspy] |        ✅ Passed         |
| [whoer][test-whoer]                                 |        ✅ Passed         |
| [Browser Leaks][test-browserleaks]                  |        ✅ Passed         |
| [Device Info][test-deviceinfo]                      |        ✅ Passed         |
| [CreepJS][test-creepjs]                             |        ❌ Failed         |

[test-webbrowsertools]:https://webbrowsertools.com/useragent/
[test-browserspy]:http://browserspy.dk/browser.php
[test-whoer]:https://whoer.net/
[test-browserleaks]:https://browserleaks.com/javascript
[test-deviceinfo]:https://www.deviceinfo.me/
[test-creepjs]:https://abrahamjuliot.github.io/creepjs/

## 📡 Remote User-Agents list

Because the extension settings storage has size limitations - you don't have the option of keeping a large custom
User-Agents list. Instead, you can place your list somewhere and link to it in the extension settings.

For example, you can create your own public repository/account on [GitHub](https://github.com/) /
[GitLab](https://gitlab.com/) / [PasteBin](https://pastebin.com/) / etc. and host your list on it.

The extension will send a `GET` request to the provided location URL. Supported list format is:

```text
// will be ignored
 # will be ignored too

Mozilla/5.0 (Macintosh; Intel Mac OS X 11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4619.141 Safari/537.36
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4593.122 Safari/537.36

// ...
```

## 📜 How to translate (localize) this extension?

...or fix translation mistakes. The translation process described [here](https://github.com/tarampampam/random-user-agent/tree/master/public/_locales) ([related issue](https://github.com/tarampampam/random-user-agent/issues/353)).

## 👀 Questions

Most questions can be answered by reading the [issues][issues]. If the issues doesn't answer your question, open up a
new [discussion][discussions]. If you find a bug or have a feature request, please file a [new issue][new-issue].

<details markdown=1><summary markdown="span"><strong>This extension may actually be making users more uniquely fingerprintable, not less?</strong></summary>

Faking your user agent might make you _more_ fingerprintable, not less. There are ways other than `User-Agent` sniffing
to determine what browser you're using, so malicious sites could learn what browser you're _really_ using through other
means and then combine that with your randomly changing `User-Agent` to pretty effectively track you. For background,
see [this GitHub issue](https://github.com/tarampampam/random-user-agent/issues/47).
</details>

<details markdown=1><summary markdown="span"><strong>Hotkeys on some sites no longer work, why?</strong></summary>

This may occur because your User-Agent simulates MacOS - in this case, some websites make an attempt to handle `⌘ cmd`
key instead of the `ctrl`. For fixing this issue just disable MacOS User-Agent in the extension generator settings.
</details>

<details markdown=1><summary markdown="span"><strong>Are keyboard shortcuts supported?</strong></summary>

Sure - user-agent renewal (`Ctrl+Shift+U` by default). You can
change it in your browser settings: [chrome://extensions/shortcuts](chrome://extensions/shortcuts) (in Google Chrome).
</details>

<details markdown=1><summary markdown="span"><strong>How to install it on Firefox Mobile?</strong></summary>

Following [this guide](https://blog.mozilla.org/addons/2020/09/29/expanded-extension-support-in-firefox-for-android-nightly/)
you need to specify a collection ID to install the addon:

![image](https://user-images.githubusercontent.com/7326800/205586504-46fa353c-919c-4322-8e5e-d5e6047089a6.png) ![image](https://user-images.githubusercontent.com/7326800/205586527-3183f72e-a3da-49f1-915d-438bb04541e2.png)

Enter `14112060` / `rua`. After you tap "OK", the application will close and restart.
</details>

## 🖥️ Run Locally

After cloning the project, open the terminal and navigate to the project root directory (since I am a Linux adept, for
the following commands installed `docker` and `make` are required):

```bash
$ make install # install all node dependencies

$ make watch # watch for source changes

$ make shell # start shell into a container with node

$ make build # build the extension
```

After `make watch` command you can:

1. Open chrome and navigate to extensions page using this URL: `chrome://extensions`
2. Make sure "**Developer mode**" is enabled
3. Click "**Load unpacked extension**" button, browse the `./dist` directory and select it
4. Write something awesome (don't forget to make a PR after that)

## 🦾 Contributors

I want to say a big thank you to everyone who contributed to this project:

[![contributors](https://contrib.rocks/image?repo=tarampampam/random-user-agent)][contributors]

> And a special thanks to [@neroux](https://github.com/neroux) - dude, you're awesome

## 🛡 Privacy Policy

> Random User-Agent had never collected and will never collect any personal data, browsing history etc.

Full privacy policy text can be found [here](PRIVACY_POLICY.md).

<details markdown=1><summary markdown="span"><strong>🚀 How to publish a release</strong></summary>

> This note is for me, so as not to forget anything...

1. Make required changes in this repository, test it locally
2. Update [changelog file](CHANGELOG.md) and "publish" new release using repo [releases page][releases]
3. When the CI process is done - download the file `random-user-agent.zip` to my computer
4. Open "[Chrome Web Store Developer Dashboard][chrome-upload-new]" and click the "Upload new package" button, next,
   next... Publish
5. Download the `main.crx` file from the dashboard, rename it to the `random-user-agent.crx` and upload to
   the [release on GitHub][releases]
6. Open "[Mozilla add-on developer hub][ff-upload-new]", "Select a file...", next, next, download the extension sources
   archive, upload it to hub, next, Publish
7. Download the `random_user_agent_X.X.X-blabla.xpi` file from the dashboard (**after** getting `Approved` status for
   the version), rename it to the `random-user-agent.xpi` and upload to the [release on GitHub][releases]
8. Don't forget to update fkn [edge][edge-upload-new] and [opera][opera-upload-new] stores
9. Open a bottle of beer, I've earned
</details>

[chrome-upload-new]:https://chrome.google.com/webstore/devconsole/ea9e18ff-c849-424a-acba-9b43eaad29c8/einpaelgookohagofgnnkcfjbkkgepnp/edit/package
[ff-upload-new]:https://addons.mozilla.org/en-US/developers/addon/random_user_agent/versions/submit/
[edge-upload-new]:https://partner.microsoft.com/en-us/dashboard/microsoftedge/6e5e9cbf-8846-4830-9fa5-9f77d03aa39f/packages
[opera-upload-new]:https://addons.opera.com/developer/package/266286/?tab=versions
[issues]:https://github.com/tarampampam/random-user-agent/issues
[new-issue]:https://github.com/tarampampam/random-user-agent/issues/new/choose
[discussions]:https://github.com/tarampampam/random-user-agent/discussions
[releases]:https://github.com/tarampampam/random-user-agent/releases
[contributors]:https://github.com/tarampampam/random-user-agent/graphs/contributors
[link-chrome-store]:https://chrome.google.com/webstore/detail/random-hide-user-agent/einpaelgookohagofgnnkcfjbkkgepnp
[link-ff-store]:https://addons.mozilla.org/firefox/addon/random_user_agent/
[link-edge-store]:https://microsoftedge.microsoft.com/addons/detail/random-useragent/addfjgllfhpnacoahmmcafmaacjloded
[link-opera-store]:https://addons.opera.com/en/extensions/details/random-user-agent/
