/**
 * Extension settings structure class with default values.
 */
class SettingsStructure {
    /**
     * Unique key for storing in storage.
     *
     * @type {string}
     */
    static storage_key = 'extension_settings_v2';

    /**
     * Extension is enabled?
     *
     * @type {boolean}
     */
    static enabled = true;

    /**
     * Active User-Agent.
     *
     * @type {string|null}
     */
    static useragent = null;

    /**
     * Auto renewal is enabled?
     *
     * @type {boolean}
     */
    static renew_enabled = true;

    /**
     * Auto renewal interval (in milliseconds).
     *
     * @type {number}
     */
    static renew_interval = 10 * 60 * 1000;

    /**
     * Renewal on startup is enabled?
     *
     * @type {boolean}
     */
    static renew_onstartup = true;

    /**
     * Store settings in localstorage or in the cloud?
     *
     * @type {boolean}
     */
    static sync = true;

    /**
     * Custom User-Agent is enabled.
     *
     * @type {boolean}
     */
    static custom_useragent_enabled = false;

    /**
     * Custom User-Agent value.
     *
     * @type {string|null}
     */
    static custom_useragent_value = null;

    /**
     * Custom User-Agents list.
     *
     * @type {string[]}
     */
    static custom_useragent_list = [];

    /**
     * Replace User-Agent using javascript.
     *
     * @type {boolean}
     */
    static javascript_protection_enabled = true;

    /**
     * Generator settings.
     *
     * @type {string[]}
     */
    static generator_types = ['chrome_win', 'chrome_mac', 'chrome_linux', 'firefox_win', 'firefox_mac', 'firefox_linux'];

    /**
     * Exceptions list.
     *
     * @type {string[]}
     */
    static exceptions_list = ['chrome://*'];

    /**
     * Bug report link URI.
     *
     * @type {string}
     */
    static links_bugreport = 'https://github.com/tarampampam/random-user-agent/issues/new?template=bug_report.md';

    /**
     * Donation link URI.
     *
     * @type {string}
     */
    static links_donate = 'http://yasobe.ru/na/paramtamtam';
}

/**
 * Settings storage implementation.
 */
export default class SettingsStorage {
    //
}
