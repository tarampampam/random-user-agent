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
   * Random User-Agent (Switcher)
   */
  manifest_name: T
  /**
   * No HTML or other formatting; no more than 132 characters.
   *
   * Automatically change the user agent ...
   */
  manifest_description: T
  /**
   * The tooltip, or title, appears when the user hovers the mouse on the extension's icon in the toolbar.
   *
   * Randomize your User-Agent
   */
  manifest_action_default_title: T
  /** Get new agent */
  manifest_command_renew_useragent: T
  /** Active User-Agent */
  active_user_agent: T
  /** Pause Switcher */
  pause_switcher: T
  /** Resume Switcher */
  unpause_switcher: T
  /** Enable Switcher */
  enable_switcher: T
  /** Enabled on this domain */
  enabled_on_this_domain: T
  /** Sync the current OS with the generated user agent */
  sync_useragent_with_host_os: T
  /** Get new agent */
  get_new_agent: T
  /** Open settings */
  open_settings: T
  /** Donate */
  make_donation: T
  /** Bug report */
  bug_report: T
  /** General settings */
  general_settings: T
  /** Change the behavior of the switcher to best fit your needs */
  general_settings_hint: T
  /** Automatically change the User-Agent after specified period of time */
  auto_renew: T
  /** Time (in seconds) to automatically update the User-Agent */
  auto_renew_interval: T
  /** Change User-Agent on browser startup */
  auto_renew_on_startup: T
  /** Protect against detection by JavaScript */
  js_protection: T
  /** Use one of (in the randomized order) custom User-Agent instead generated */
  custom_useragent: T
  /** Custom User-Agents */
  custom_useragent_list: T
  /** Generator settings */
  generator_settings: T
  /** Here you can change the agent switching behavior */
  generator_settings_hint: T
  /** Blacklist settings */
  blacklist_settings: T
  /** Blacklist mode - ... */
  blacklist_settings_hint: T
  /** Blacklist mode */
  blacklist_mode: T
  /** Whitelist mode */
  whitelist_mode: T
  /** Domain names list */
  blacklist_domains: T
  /** Remove */
  remove: T
  /** Save changes */
  save_changes: T
  /** Error occurred */
  error_occurred: T
  /** Do you like this extension? */
  like_this_extension: T
  /** Give us a star on GitHub! */
  give_a_star_on_github: T
  /** Use one of (in the randomized order) the User-Agents from the list by the following URL */
  remote_useragent_list: T
  /**  The extension will periodically download it to keep it up to date*/
  remote_useragent_list_hint: T
  /** Updating interval ... */
  remote_useragent_updating_interval: T
  /** Update now */
  update_now: T
  /** Please, rate this addon! */
  please_rate_extension: T
  /** Edge on Windows */
  edge_win: T
  /** Edge on Mac */
  edge_mac: T
  /** Chrome on Windows */
  chrome_win: T
  /** Chrome on Mac */
  chrome_mac: T
  /** Chrome on Linux */
  chrome_linux: T
  /** Chrome on Android */
  chrome_android: T
  /** FireFox on Windows */
  firefox_win: T
  /** FireFox on Mac */
  firefox_mac: T
  /** FireFox on Linux */
  firefox_linux: T
  /** Firefox on Android */
  firefox_android: T
  /** Opera on Windows */
  opera_win: T
  /** Opera on Mac */
  opera_mac: T
  /** Safari on iPhone */
  safari_iphone: T
  /** Safari on Mac */
  safari_mac: T
  /** To function properly, the extension requires ... */
  why_we_need_permissions: T
  /** Read and modify all your data ... */
  read_and_modify_data: T
  /** to inject the necessary scripts into the pages (note: in lower case) */
  read_and_modify_data_reason: T
  /** Grant permissions */
  grant_permission_button: T
  /** Enable the collection of extension usage statistics */
  stats_enabled: T
  /** This will help us improve the extension. For example, when an error occurs ... */
  stats_enabled_hint: T
}
