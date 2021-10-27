<p align="center"><img width="84" alt="logo" src="https://hsto.org/webt/zh/yz/3t/zhyz3t3knfyukt8pfnshd_xehrm.png"></p>
<p align="center">Automatically <strong>replaces the User-Agent</strong> with a <strong>randomized one</strong>.</p>
<br/>
<p align="center">
  <a href="https://chrome.google.com/webstore/detail/random-hide-user-agent/einpaelgookohagofgnnkcfjbkkgepnp/"><img alt="Chrome Web Store" src="https://img.shields.io/chrome-web-store/v/einpaelgookohagofgnnkcfjbkkgepnp.svg?style=for-the-badge&cacheSeconds=120&logo=google-chrome&label=google%20chrome&logoColor=white"></a> &nbsp; <a href="https://addons.mozilla.org/firefox/addon/random_user_agent/"><img alt="Firefox Add-ons" src="https://img.shields.io/amo/v/random_user_agent.svg?style=for-the-badge&cacheSeconds=120&logo=firefox-browser&label=firefox&logoColor=white"></a> &nbsp; <a href="https://microsoftedge.microsoft.com/addons/detail/random-useragent/addfjgllfhpnacoahmmcafmaacjloded"><img alt="Edge Addons" src="https://img.shields.io/badge/Edge-555555.svg?&style=for-the-badge&logo=microsoft-edge&logoColor=white"></a>
</p>
<h1 align="center">Random User-Agent</h1>
<br/>
<p align="center">Random User-Agent is an <strong>open-source</strong> MIT-licensed <strong>browser extension</strong> that is designed to replaces original browser User-Agent identifier (is a sort of "fingerprint") with a randomized. The extension is incredibly lightweight, using very few resources.</p>
<br/>
<br/>

![Screenshot](https://hsto.org/webt/cl/cz/iv/clczivrmvn47ryadjvtyb13qqom.jpeg)

## 🔥 Features list

- Incredibly lightweight (`~70KiB` archived)
- Available in the official stores ([chrome][link-chrome-store], [firefox][link-ff-store], [edge][link-edge-store])
- Can automatically change the User-Agent after a specified period of time
- Change User-Agent on browser startup
- Replaces `User-Agent` HTTP header
- Protect against detection by JavaScript
- User-Agent randomization can be customized by the user (what browsers and OS are spoofed, etc.)
- Exceptions list available with option of wildcards

## 👀 Questions

Most questions can be answered by reading the [issues][issues]. If the issues doesn't answer your question, open up a
new [discussion][discussions].

<details>
  <summary>This extension may actually be making users more uniquely fingerprintable, not less?</summary>

Faking your user agent might make you _more_ fingerprintable, not less. There are ways other than `User-Agent` sniffing
to determine what browser you're using, so malicious sites could learn what browser you're _really_ using through other
means and then combine that with your randomly changing `User-Agent` to pretty effectively track you. For background,
see [this GitHub issue](https://github.com/tarampampam/random-user-agent/issues/47).
</details>

## 🧩 Install

Follow up by one of the links at the top 👆 of this page, or download directly the latest release from the
[releases page][releases].

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

## 📜 How to translate (localize) this extension?

...or fix translation mistakes. The translation process described [here](./public/_locales).

## 🦾 Contributors

I want to say a big thank you to everyone who contributed to this project:

[![contributors](https://contrib.rocks/image?repo=tarampampam/random-user-agent)][contributors]

> And a special thanks to [@neroux](https://github.com/neroux) - dude, you're awesome

## 🚀 Release

> This note is for me, so as not to forget anything...

1. Make required changes in this repository, test it locally
2. Update [changelog file](CHANGELOG.md) and "publish" new release using repo [releases page][releases]
3. When the CI process is done - download the file `random-user-agent.zip` to my computer
4. Open "[Chrome Web Store Developer Dashboard][chrome-upload-new]" and click the "Upload new package" button, next, next... Publish
5. Download the `main.crx` file from the dashboard, rename it to the `random-user-agent.crx` and upload to the [release on GitHub][releases]
6. Open "[Mozilla add-on developer hub][ff-upload-new]", "Select a file...", next, next, download the extension sources archive, upload it to hub, next, Publish
7. Download the `random_user_agent_X.X.X-blabla.xpi` file from the dashboard, rename it to the `random-user-agent.xpi` and upload to the [release on GitHub][releases]
8. Don't forget to update the fkn [edge store][edge-upload-new]
9. Open a bottle of beer, I've earned

[chrome-upload-new]:https://chrome.google.com/webstore/devconsole/ea9e18ff-c849-424a-acba-9b43eaad29c8/einpaelgookohagofgnnkcfjbkkgepnp/edit/package
[ff-upload-new]:https://addons.mozilla.org/en-US/developers/addon/random_user_agent/versions/submit/
[edge-upload-new]:https://partner.microsoft.com/en-us/dashboard/microsoftedge/6e5e9cbf-8846-4830-9fa5-9f77d03aa39f/packages

[issues]:https://github.com/tarampampam/random-user-agent/issues
[discussions]:https://github.com/tarampampam/random-user-agent/discussions
[releases]:https://github.com/tarampampam/random-user-agent/releases
[contributors]:https://github.com/tarampampam/random-user-agent/graphs/contributors
[link-chrome-store]:https://chrome.google.com/webstore/detail/random-hide-user-agent/einpaelgookohagofgnnkcfjbkkgepnp
[link-ff-store]:https://addons.mozilla.org/firefox/addon/random_user_agent/
[link-edge-store]:https://microsoftedge.microsoft.com/addons/detail/random-useragent/addfjgllfhpnacoahmmcafmaacjloded
