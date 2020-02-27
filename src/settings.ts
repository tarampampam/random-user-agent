import ChromeStorage from "@/services/storages/chrome-storage";

interface ISettingsStructure {
  // Extension is enabled?
  enabled: boolean;

  // Active User-Agent
  useragent: string | null;

  // Auto renewal is enabled?
  renew_enabled: boolean;

  // Auto renewal interval (in milliseconds)
  renew_interval: number;

  // Renewal on startup is enabled?
  renew_onstartup: boolean;

  // Store settings in localstorage or in the cloud?
  sync: boolean;

  // Custom User-Agent is enabled?
  custom_useragent_enabled: boolean;

  // Custom User-Agent value
  custom_useragent_value: string | null;

  // Custom User-Agents list
  custom_useragent_list: string[];

  // Replace User-Agent using javascript?
  javascript_protection_enabled: boolean;

  // Generator types
  generator_types: ('chrome_win' | 'chrome_mac' | 'chrome_linux' | 'firefox_win' | 'firefox_mac' | 'firefox_linux')[];

  // Exceptions list
  exceptions_list: string[];

  // Bug report link URI
  links_bugreport: string;

  // Donation link URI
  links_donate: string;
}

export default class Settings {
  // Unique key for storing in storage
  private readonly STORAGE_KEY = 'extension_settings_v2';

  // Settings storage
  private readonly storage: Services.Storage;

  // Settings state with defaults
  private settings: ISettingsStructure = {
    enabled: true,
    useragent: null,
    renew_enabled: true,
    renew_interval: 10 * 60 * 1000,
    renew_onstartup: true,
    sync: true,
    custom_useragent_enabled: false,
    custom_useragent_value: null,
    custom_useragent_list: [],
    javascript_protection_enabled: true,
    generator_types: ['chrome_win', 'chrome_mac', 'chrome_linux', 'firefox_win', 'firefox_mac', 'firefox_linux'],
    exceptions_list: ['chrome://*'],
    links_bugreport: 'https://github.com/tarampampam/random-user-agent/issues/new?template=bug_report.md',
    links_donate: 'http://yasobe.ru/na/paramtamtam', // @todo: change this
  };

  // This flag indicates that settings already loaded from storage or not
  private loaded: boolean = false;

  constructor(storage?: Services.Storage) {
    this.storage = storage ?? new ChromeStorage(this.settings.sync);
  }

  /**
   * Settings is loaded from storage?
   */
  public isLoaded(): boolean {
    return this.loaded;
  }

  /**
   * Load settings from storage and initialize self settings state using them.
   */
  public load(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.storage
        .get(this.STORAGE_KEY)
        .then((data) => {
          this.settings = {...this.settings, ...data};
          this.loaded = true;

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public save(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.storage
        .set(this.STORAGE_KEY, this.settings)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public clear(): Promise<void> {
    return this.storage.clear();
  }

  /**
   * Get storage key.
   */
  public getStorageKey(): string {
    return this.STORAGE_KEY;
  }
}
