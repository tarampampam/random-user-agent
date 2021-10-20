import {Storage} from './storage'
import {GeneratorType} from '../generator/useragent'

interface Struct {
  [key: string]: any

  // Extension is enabled?
  enabled: boolean
  // Active (actual) User-Agent
  useragent: string | undefined
  // User-agent renewal options
  renew: {
    // Auto renewal is enabled?
    enabled: boolean
    // Auto renewal interval (in milliseconds)
    intervalMillis: number
    // Renewal on startup is enabled?
    onStartup: boolean
  }
  // Custom User-Agent options
  customUseragent: {
    // Custom User-Agent is enabled?
    enabled: boolean
    // Custom User-Agents list
    list: string[]
  }
  // Replace User-Agent using javascript?
  jsProtection: {
    // JS protection is enabled?
    enabled: boolean
  }
  // Generator settings
  generator: {
    // Generator types
    types: GeneratorType[]
  }
  // Exceptions
  exceptions: {
    // Exceptions list
    list: string[]
  }
}

export function mergeStates(current: { [key: string]: any }, updated: { [key: string]: any }): { [key: string]: any } {
  for (const [key, value] of Object.entries(updated)) {
    if (current[key] !== undefined) {
      if (typeof current[key] === 'object' && !Array.isArray(current[key])) {
        current[key] = mergeStates(current[key], value) // merge objects
      } else {
        current[key] = value // overwrite
      }
    } else {
      current[key] = value // append
    }
  }

  return current
}

export enum SettingEvent {
  onLoad = 'on:load',
  onSave = 'on:save',
  onChange = 'on:change',
}

export default class Settings {
  public readonly storageKey: string = 'settings-struct-v3'

  private readonly storage: Storage

  private state: Struct = { // initial (default) extension settings
    enabled: true,
    useragent: undefined,
    renew: {
      enabled: true,
      intervalMillis: 10 * 60 * 1000, // once in a 10 minutes
      onStartup: true,
    },
    customUseragent: {
      enabled: false,
      list: [],
    },
    jsProtection: {
      enabled: true,
    },
    generator: {
      types: [
        GeneratorType.chromeWin, GeneratorType.chromeLinux, GeneratorType.chromeMac,
        GeneratorType.firefoxWin, GeneratorType.firefoxLinux, GeneratorType.firefoxMac,
      ],
    },
    exceptions: {
      list: ['chrome://*'],
    },
  }

  private events: Record<string, ((...data: any[]) => void)[]> = {}

  constructor(storage: Storage) {
    this.storage = storage
  }

  // Attach callback for the events of the setting
  on(type: SettingEvent, callback: (...data: any[]) => void): void {
    if (this.events.hasOwnProperty(type)) {
      this.events[type].push(callback)
    } else {
      this.events[type] = [callback]
    }
  }

  private emit(type: SettingEvent, ...data: any[]): void {
    if (this.events.hasOwnProperty(type)) {
      for (const fn of this.events[type]) {
        fn(...data)
      }
    }
  }

  // Load all settings from the storage
  load(): Promise<void> {
    return new Promise((resolve: () => void, reject) => {
      this.storage.get(this.storageKey)
        .then((fromStorage) => {
          if (Object.keys(fromStorage).length !== 0) {
            this.state = mergeStates(this.state, fromStorage) as Struct
          }

          this.emit(SettingEvent.onLoad)

          resolve()
        })
        .catch(reject)
    })
  }

  // Save all settings into the storage
  save(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.storage.set(this.storageKey, this.state)
        .then(() => {
          this.emit(SettingEvent.onSave)

          resolve()
        })
        .catch(reject)
    })
  }

  // Extension is enabled?
  isEnabled(): boolean {
    return this.state.enabled
  }

  // Enable/disable extension
  setEnabled(enabled: boolean): void {
    this.state.enabled = enabled
    this.emit(SettingEvent.onChange)
  }

  // Get active User-Agent
  getUserAgent(): string | undefined {
    return this.state.useragent
  }

  // Set active User-Agent
  setUserAgent(agent: string | undefined): void {
    this.state.useragent = agent
    this.emit(SettingEvent.onChange)
  }

  // Auto renewal is enabled?
  public isRenewalEnabled(): boolean {
    return this.state.renew.enabled
  }

  // Set auto renewal state
  public setRenewalEnabled(state: boolean): void {
    this.state.renew.enabled = state
    this.emit(SettingEvent.onChange)
  }

  // Get automatic interval (in milliseconds)
  public getRenewalIntervalMillis(): number {
    return this.state.renew.intervalMillis
  }

  // Set automatic interval (in milliseconds)
  public setRenewalIntervalMs(interval: number): void {
    this.state.renew.intervalMillis = interval
    this.emit(SettingEvent.onChange)
  }

  // Renewal on startup is enabled?
  public isRenewalOnStartupEnabled(): boolean {
    return this.state.renew.onStartup
  }

  // Set renewal on startup state
  public setRenewalOnStartupEnabled(state: boolean): void {
    this.state.renew.onStartup = state
    this.emit(SettingEvent.onChange)
  }

  // Custom User-Agent is enabled?
  public isCustomUserAgentEnabled(): boolean {
    return this.state.customUseragent.enabled
  }

  // Set custom User-Agent enabled state
  public setCustomUserAgentEnabled(state: boolean): void {
    this.state.customUseragent.enabled = state
    this.emit(SettingEvent.onChange)
  }

  // Get custom User-Agents list
  public getCustomUserAgentsList(): string[] {
    return this.state.customUseragent.list
  }

  // Set custom User-Agents list
  public setCustomUserAgentsList(list: string[]): void {
    this.state.customUseragent.list = list
    this.emit(SettingEvent.onChange)
  }

  // Replace User-Agent using javascript?
  public isJavascriptProtectionEnabled(): boolean {
    return this.state.jsProtection.enabled
  }

  // Enable/disable User-Agent replacing using javascript
  public setJavascriptProtectionEnabled(state: boolean): void {
    this.state.jsProtection.enabled = state
    this.emit(SettingEvent.onChange)
  }

  // Get generator types
  public getGeneratorTypes(): GeneratorType[] {
    return this.state.generator.types
  }

  // Set generator types
  public setGeneratorTypes(types: GeneratorType[]): void {
    this.state.generator.types = types
    this.emit(SettingEvent.onChange)
  }

  // Get exceptions list
  public getExceptionsList(): string[] {
    return this.state.exceptions.list
  }

  // Set exceptions list
  public setExceptionsList(list: string[]): void {
    this.state.exceptions.list = list
    this.emit(SettingEvent.onChange)
  }
}
