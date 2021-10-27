# i18n

## How to make a translations

1. Make a fork of this repository
2. Make a copy of `en` directory, and rename it to your [locale name][locales-list]
3. Open `%your_locale%\messages.json` file. Translate all lines in `message` fields
4. Translate `%your_locale%\full_description.txt` file content
5. Make sure your file encoding is `UTF-8` and has valid format ([you can check it here](http://jsonlint.com/))
6. Make a [pull-request](https://github.com/tarampampam/random-user-agent/compare)

## How to fix the translation mistakes

1. Navigate your browser to the file with the required localization
2. Click on a pencil (edit file)
3. Make your changes
4. Make a [pull-request](https://github.com/tarampampam/random-user-agent/compare) with your changes

### Useful links

- [API Reference](https://developer.chrome.com/docs/extensions/reference/i18n/)
- [Locales list][locales-list]

[locales-list]:https://developer.chrome.com/webstore/i18n?csw=1#localeTable
