/** @link https://developer.chrome.com/docs/extensions/reference/api/i18n#locales */
export type LocaleCode =
  | 'ar' // Arabic
  | 'am' // Amharic
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
  /**
   * Maximum of 45 characters.
   *
   * @example Random User-Agent (Switcher)
   */
  manifest_name: T
  /**
   * No HTML or other formatting; no more than 132 characters.
   *
   * @example Automatically change the user agent ...
   */
  manifest_description: T
  /**
   * The tooltip, or title, appears when the user hovers the mouse on the extension's icon in the toolbar.
   *
   * @example Randomize your User-Agent
   */
  manifest_action_default_title: T
  /** @example Get new agent */
  manifest_command_renew_useragent: T
  /** @example Active User-Agent */
  active_user_agent: T
  /** @example Pause Switcher */
  pause_switcher: T
  /** @example Resume Switcher */
  unpause_switcher: T
  /** @example Enable Switcher */
  enable_switcher: T
  /** @example Enabled on this domain */
  enabled_on_this_domain: T
  /** @example Get new agent */
  get_new_agent: T
  /** @example Open settings */
  open_settings: T
  /** @example Donate */
  make_donation: T
  /** @example Bug report */
  bug_report: T
  /** @example General settings */
  general_settings: T
  /** @example Change the behavior of the switcher to best fit your needs */
  general_settings_hint: T
  /** @example Automatically change the User-Agent after specified period of time */
  auto_renew: T
  /** @example Time (in seconds) to automatically update the User-Agent */
  auto_renew_interval: T
  /** @example Change User-Agent on browser startup */
  auto_renew_on_startup: T
  /** @example Protect against detection by JavaScript */
  js_protection: T
  /** @example Use one of (in the randomized order) custom User-Agent instead generated */
  custom_useragent: T
  /** @example Custom User-Agents */
  custom_useragent_list: T
  /** @example Generator settings */
  generator_settings: T
  /** @example Here you can change the agent switching behavior */
  generator_settings_hint: T
  /** @example Blacklist settings */
  blacklist_settings: T
  /** @example Blacklist mode - ... */
  blacklist_settings_hint: T
  /** @example Blacklist mode */
  blacklist_mode: T
  /** @example Whitelist mode */
  whitelist_mode: T
  /** @example Domain names list */
  blacklist_domains: T
  /** @example Custom rules */
  blacklist_custom_rules: T
  /** @example You can use wildcards such as ... */
  blacklist_custom_rules_hint: T
  /** @example Remove */
  remove: T
  /** @example Save changes */
  save_changes: T
  /** @example Error occurred */
  error_occurred: T
  /** @example Do you like this extension? */
  like_this_extension: T
  /** @example Give us a star on GitHub! */
  give_a_star_on_github: T
  /** @example Use one of (in the randomized order) the User-Agents from the list by the following URL */
  remote_useragent_list: T
  /** @example  The extension will periodically download it to keep it up to date*/
  remote_useragent_list_hint: T
  /** @example Updating interval ... */
  remote_useragent_updating_interval: T
  /** @example Update now */
  update_now: T
  /** @example Please, rate this addon! */
  please_rate_extension: T
  /** @example Edge on Windows */
  edge_win: T
  /** @example Edge on Mac */
  edge_mac: T
  /** @example Chrome on Windows */
  chrome_win: T
  /** @example Chrome on Mac */
  chrome_mac: T
  /** @example Chrome on Linux */
  chrome_linux: T
  /** @example Chrome on Android */
  chrome_android: T
  /** @example FireFox on Windows */
  firefox_win: T
  /** @example FireFox on Mac */
  firefox_mac: T
  /** @example FireFox on Linux */
  firefox_linux: T
  /** @example Firefox on Android */
  firefox_android: T
  /** @example Opera on Windows */
  opera_win: T
  /** @example Opera on Mac */
  opera_mac: T
  /** @example Safari on iPhone */
  safari_iphone: T
  /** @example Safari on Mac */
  safari_mac: T
}
