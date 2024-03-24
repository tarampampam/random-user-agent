/** @link https://developer.chrome.com/docs/extensions/reference/api/i18n#locales */
export type LocaleCode =
  | 'ar' // Arabic
  | 'am' //' // Amharic
  | 'bg' // Bulgarian
  | 'bn' // Bengali
  | 'ca' // Catalan
  | 'cs' // Czech
  | 'da' // Danish
  | 'de' // German
  | 'el' // Greek
  | 'en' // English
  | 'en_AU' // English (Australia)
  | 'en_GB' // English (Great Britain)
  | 'en_US' // English (USA)
  | 'es' // Spanish
  | 'es_419' // Spanish (Latin America and Caribbean)
  | 'et' // Estonian
  | 'fa' // Persian
  | 'fi' // Finnish
  | 'fil' // Filipino
  | 'fr' // French
  | 'gu' // Gujarati
  | 'he' // Hebrew
  | 'hi' // Hindi
  | 'hr' // Croatian
  | 'hu' // Hungarian
  | 'id' // Indonesian
  | 'it' // Italian
  | 'ja' // Japanese
  | 'kn' // Kannada
  | 'ko' // Korean
  | 'lt' // Lithuanian
  | 'lv' // Latvian
  | 'ml' // Malayalam
  | 'mr' // Marathi
  | 'ms' // Malay
  | 'nl' // Dutch
  | 'no' // Norwegian
  | 'pl' // Polish
  | 'pt_BR' // Portuguese (Brazil)
  | 'pt_PT' // Portuguese (Portugal)
  | 'ro' // Romanian
  | 'ru' // Russian
  | 'sk' // Slovak
  | 'sl' // Slovenian
  | 'sr' // Serbian
  | 'sv' // Swedish
  | 'sw' // Swahili
  | 'ta' // Tamil
  | 'te' // Telugu
  | 'th' // Thai
  | 'tr' // Turkish
  | 'uk' // Ukrainian
  | 'vi' // Vietnamese
  | 'zh_CN' // Chinese (China)
  | 'zh_TW' // Chinese (Taiwan)

export type Localization<T extends string = string> = {
  /** Maximum of 45 characters */
  manifest_name: T
  /** No HTML or other formatting; no more than 132 characters */
  manifest_description: T
  /** The tooltip, or title, appears when the user hovers the mouse on the extension's icon in the toolbar */
  manifest_action_default_title: T
  manifest_command_renew_useragent: T
  active_user_agent: T
  pause_switcher: T
  unpause_switcher: T
  enable_switcher: T
  enabled_on_this_domain: T
  get_new_agent: T
  open_settings: T
  make_donation: T
  bug_report: T
  general_settings: T
  general_settings_hint: T
  auto_renew: T
  auto_renew_interval: T
  auto_renew_on_startup: T
  js_protection: T
  custom_useragent: T
  custom_useragent_list: T
  generator_settings: T
  generator_settings_hint: T
  blacklist_settings: T
  blacklist_settings_hint: T
  blacklist_mode: T
  whitelist_mode: T
  blacklist_domains: T
  blacklist_custom_rules: T
  blacklist_custom_rules_hint: T
  remove: T
  save_changes: T
  error_occurred: T
  like_this_extension: T
  give_a_star_on_github: T
  remote_useragent_list: T
  remote_useragent_list_hint: T
  remote_useragent_updating_interval: T
  update_now: T
  please_rate_extension: T
  edge_win: T
  edge_mac: T
  chrome_win: T
  chrome_mac: T
  chrome_linux: T
  chrome_android: T
  firefox_win: T
  firefox_mac: T
  firefox_linux: T
  firefox_android: T
  opera_win: T
  opera_mac: T
  safari_iphone: T
  safari_mac: T
}
