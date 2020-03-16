import ChromeStorage from "@/services/storages/chrome-storage";
import {Services} from "@/services/services";

export type GeneratorType =
  'chrome_win'
  | 'chrome_mac'
  | 'chrome_linux'
  | 'firefox_win'
  | 'firefox_mac'
  | 'firefox_linux';

/**
 * Property names should not be changed in compatibility reasons with previous versions of the extension.
 */
interface IStorableSettingsStructure {
  [key: string]: any;

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

  // Store settings in local storage or in the cloud?
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
  generator_types: GeneratorType[];

  // Exceptions list
  exceptions_list: string[];
}

type changesHandler = (key: string) => void;

export default class Settings {
  // Unique key for storing in storage
  private readonly STORAGE_KEY = 'extension_settings_v2';

  // Settings storage
  private readonly storage: Services.Storage;

  // Settings state with defaults
  private settings: IStorableSettingsStructure = {
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
  };

  // This closure will be called on each settings changing
  private onSettingsChanged: changesHandler = () => void {};

  // This flag indicates that settings already loaded from storage or not
  private loaded: boolean = false;

  public constructor(storage?: Services.Storage) {
    this.storage = storage ?? new ChromeStorage(this.settings.sync);

    this.settings = new Proxy(this.settings, {
      set: (target: IStorableSettingsStructure, key: string, value: any): boolean => {
        target[key] = value;
        this.onSettingsChanged(key);

        return true;
      }
    });
  }

  // Set changes settings handler
  public setOnSettingsChanged(fn: changesHandler): void {
    this.onSettingsChanged = fn;
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
    return new Promise((resolve: () => void, reject: (_: Error) => void) => {
      this.storage
        .get(this.STORAGE_KEY)
        .then((data: { [key: string]: any }) => {
          for (let key in data) {
            this.settings[key] = data[key];
          }

          this.loaded = true;

          resolve();
        })
        .catch((error: Error) => reject(error));
    });
  }

  /**
   * Save settings in storage.
   */
  public save(): Promise<void> {
    return new Promise((resolve: () => void, reject: (_: Error) => void) => {
      this.storage
        .set(this.STORAGE_KEY, this.settings)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }

  /**
   * Clear settings storage.
   */
  public clear(): Promise<void> {
    return this.storage.clear();
  }

  /**
   * Get storage key.
   */
  public getStorageKey(): string {
    return this.STORAGE_KEY;
  }

  /**
   * Extension is enabled?
   */
  public isEnabled(): boolean {
    return this.settings.enabled;
  }

  /**
   * Enable/disable extension.
   */
  public setEnabled(state: boolean): void {
    this.settings.enabled = state;
  }

  /**
   * Get active User-Agent.
   */
  public getUserAgent(): string | null {
    return this.settings.useragent;
  }

  /**
   * Set active User-Agent.
   */
  public setUserAgent(useragent: string | null): void {
    this.settings.useragent = useragent;
  }

  /**
   * Auto renewal is enabled?
   */
  public isRenewalEnabled(): boolean {
    return this.settings.renew_enabled;
  }

  /**
   * Set auto renewal state.
   */
  public setRenewalEnabled(state: boolean): void {
    this.settings.renew_enabled = state;
  }

  /**
   * Get automatic interval (in milliseconds).
   */
  public getRenewalIntervalMs(): number {
    return this.settings.renew_interval;
  }

  /**
   * Set automatic interval (in milliseconds).
   */
  public setRenewalIntervalMs(interval: number): void {
    this.settings.renew_interval = interval;
  }

  /**
   * Renewal on startup is enabled?
   */
  public isRenewalOnStartupEnabled(): boolean {
    return this.settings.renew_onstartup;
  }

  /**
   * Set renewal on startup state.
   */
  public setRenewalOnStartupEnabled(state: boolean): void {
    this.settings.renew_onstartup = state;
  }

  /**
   * Store settings in local storage or in the cloud?
   */
  public isSynchronizationEnabled(): boolean {
    return this.settings.sync;
  }

  /**
   * Set synchronization state (store settings in local storage or in the cloud).
   */
  public setSynchronizationEnabled(state: boolean): void {
    if (this.storage instanceof ChromeStorage) {
      this.storage.setPreferSyncStorage(state);
    }

    this.settings.sync = state;
  }

  /**
   * Custom User-Agent is enabled?
   */
  public isCustomUserAgentEnabled(): boolean {
    return this.settings.custom_useragent_enabled;
  }

  /**
   * Set custom User-Agent enabled state.
   */
  public setCustomUserAgentEnabled(state: boolean): void {
    this.settings.custom_useragent_enabled = state;
  }

  /**
   * Get custom User-Agent value.
   */
  public getCustomUserAgent(): string | null {
    return this.settings.custom_useragent_value;
  }

  /**
   * Set custom User-Agent value.
   */
  public setCustomUserAgent(useragent: string | null): void {
    this.settings.custom_useragent_value = useragent;
  }

  /**
   * Get custom User-Agents list.
   */
  public getCustomUserAgentsList(): string[] {
    return this.settings.custom_useragent_list;
  }

  /**
   * Set custom User-Agents list.
   */
  public setCustomUserAgentsList(list: string[]): void {
    this.settings.custom_useragent_list = list;
  }

  /**
   * Replace User-Agent using javascript?
   */
  public isJavascriptProtectionEnabled(): boolean {
    return this.settings.javascript_protection_enabled;
  }

  /**
   * Enable/disable User-Agent replacing using javascript.
   */
  public setJavascriptProtectionEnabled(state: boolean): void {
    this.settings.javascript_protection_enabled = state;
  }

  /**
   * Get generator types.
   */
  public getGeneratorTypes(): GeneratorType[] {
    return this.settings.generator_types;
  }

  /**
   * Set generator types.
   */
  public setGeneratorTypes(types: GeneratorType[]): void {
    this.settings.generator_types = types;
  }

  /**
   * Get exceptions list.
   */
  public getExceptionsList(): string[] {
    return this.settings.exceptions_list;
  }

  /**
   * Set exceptions list.
   */
  public setExceptionsList(list: string[]): void {
    this.settings.exceptions_list = list;
  }

  /**
   * Get bug report link URI.
   */
  public getBugReportLink(): string {
    return 'https://github.com/tarampampam/random-user-agent/issues/new?template=bug_report.md';
  }

  /**
   * Get donation link URI.
   */
  public getDonationLink(): string {
    return 'http://yasobe.ru/na/paramtamtam'; // @todo: change this
  }
}
