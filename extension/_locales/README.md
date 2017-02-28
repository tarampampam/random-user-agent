### How to make a translations

**Step one**. Make a fork of this repository.

**Step two**. Make a copy of `en` directory, and rename it to your [locale name](https://developer.chrome.com/webstore/i18n?csw=1#localeTable). For example, if you want to make a `German` translation, setup your file tree to look like the following:
```
random-user-agent
  └── _locales
      └── de
          └── full_description.txt
          └── messages.json
```

**Step three**. Open `%your_locale%\messages.json` file. Translate all lines in `message` fields. For example, original:
```
{
  "active_useragent_loading": {
    "message": "Loading..."
  }
}
```
And translated:
```
{
  "active_useragent_loading": {
    "message": "Laden..."
  }
}
```
After that - translate `%your_locale%\full_description.txt` file content.

**Step four**. Make sure your file encoding is UTF-8 and has valid format ([you can check it here](http://jsonlint.com/)).

**Step five**. Make a [pull-request](https://github.com/tarampampam/random-user-agent/compare).
