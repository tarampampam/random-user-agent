interface ISettingsStructure {
    storage_key: string
    enabled: boolean
    useragent: string | null
    renew_enabled: boolean
    renew_interval: number
    renew_onstartup: boolean
    sync: boolean
    custom_useragent_enabled: boolean
    custom_useragent_value: string | null
    custom_useragent_list: string[]
    javascript_protection_enabled: boolean
    generator_types: string[]
    exceptions_list: string[]
    links_bugreport: string
    links_donate: string
}

const settingsStructure: ISettingsStructure = {
    /**
     * Unique key for storing in storage.
     */
    storage_key: 'extension_settings_v2',

    /**
     * Extension is enabled?
     */
    enabled: true,

    /**
     * Active User-Agent.
     */
    useragent: null,

    /**
     * Auto renewal is enabled?
     */
    renew_enabled: true,

    /**
     * Auto renewal interval (in milliseconds).
     */
    renew_interval: 10 * 60 * 1000,

    /**
     * Renewal on startup is enabled?
     */
    renew_onstartup: true,

    /**
     * Store settings in localstorage or in the cloud?
     */
    sync: true,

    /**
     * Custom User-Agent is enabled.
     */
    custom_useragent_enabled: false,

    /**
     * Custom User-Agent value.
     */
    custom_useragent_value: null,

    /**
     * Custom User-Agents list.
     */
    custom_useragent_list: [],

    /**
     * Replace User-Agent using javascript.
     */
    javascript_protection_enabled: true,

    /**
     * Generator settings.
     */
    generator_types: ['chrome_win', 'chrome_mac', 'chrome_linux', 'firefox_win', 'firefox_mac', 'firefox_linux'],

    /**
     * Exceptions list.
     */
    exceptions_list: ['chrome://*'],

    /**
     * Bug report link URI.
     */
    links_bugreport: 'https://github.com/tarampampam/random-user-agent/issues/new?template=bug_report.md',

    /**
     * Donation link URI.
     */
    links_donate: 'http://yasobe.ru/na/paramtamtam',
};

/**
 * Settings storage implementation.
 */
export default class SettingsStorage {
    //
}
