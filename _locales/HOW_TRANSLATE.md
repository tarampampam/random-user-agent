### How to make a translations

**Step one**. Make a fork of this repository.

**Step two**. Make a copy of `en` directory, and rename it to your [locale name](https://developer.chrome.com/webstore/i18n?csw=1#localeTable). For example, if you want to make a `German` translation, files tree must be looks like this:
```
random-user-agent
  └── _locales
      └── de
          └── messages.json
```

**Step three**. Open `%your_locale%\messages.json` file. Translate all lines in `description` field, and write translated value to `message` field. `description` field after that you can remove.

**Step four**. Make shure what your file encoding is UTF-8 and have valid format ([you can check it here](http://jsonlint.com/)).

**Step five**. Make a [pull-request](https://github.com/tarampampam/random-user-agent/compare).