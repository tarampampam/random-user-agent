import Settings, {BlacklistMode} from '../settings/settings'
import {matchesWildcard} from '../utils/patterns'

export default class FilterService {
  private readonly settings: Settings

  constructor(settings: Settings) {
    this.settings = settings
  }

  enabledForDomain(domain: string): boolean {
    const current = this.settings.get().blacklist.domains

    switch (this.settings.get().blacklist.mode) {
      case BlacklistMode.BlackList: // enabled by default, but disabled ONLY if the domain in the domains list
        return !current.includes(domain)

      case BlacklistMode.WhiteList: // disabled by default, but enabled ONLY if the domain in the domains list
        return current.includes(domain)
    }

    return false
  }

  changeForDomain(domain: string, enable: boolean): void {
    if (domain.trim().length === 0) {
      return
    }

    if (enable) { // enable switcher for the domain
      switch (this.settings.get().blacklist.mode) {
        case BlacklistMode.BlackList: // remove from the domains list
          this.removeFromDomainsList(domain)
          break

        case BlacklistMode.WhiteList: // append into the domains list
          this.appendIntoDomainsList(domain)
          break
      }
    } else { // disable switcher for the domain
      switch (this.settings.get().blacklist.mode) {
        case BlacklistMode.BlackList: // append into the domains list
          this.appendIntoDomainsList(domain)
          break

        case BlacklistMode.WhiteList: // remove from the domains list
          this.removeFromDomainsList(domain)
          break
      }
    }
  }

  private removeFromDomainsList(domain: string): void {
    const current = this.settings.get().blacklist.domains.slice(0)

    if (current.includes(domain)) {
      this.settings.update({
        blacklist: {
          domains: current.filter((iteratedDomain): boolean => iteratedDomain !== domain),
        },
      })
    }
  }

  private appendIntoDomainsList(domain: string): void {
    const current = this.settings.get().blacklist.domains.slice(0)

    if (!current.includes(domain)) {
      current.push(domain)

      this.settings.update({
        blacklist: {
          domains: current,
        },
      })
    }
  }

  applicableToURI(uri: string): boolean {
    if (this.settings.get().enabled) {
      const domain = FilterService.extractDomainFromUri(uri),
        domains = this.settings.get().blacklist.domains,
        rules = this.settings.get().blacklist.custom.rules

      switch (this.settings.get().blacklist.mode) {
        case BlacklistMode.BlackList:
          if (domain.length > 0 && domains.includes(domain)) {
            return false
          }

          for (let i = 0; i < rules.length; i++) {
            if (matchesWildcard(uri, rules[i])) {
              return false
            }
          }
          return true

        case BlacklistMode.WhiteList:
          if (domain.length > 0 && domains.includes(domain)) {
            return true
          }

          for (let i = 0; i < rules.length; i++) {
            if (matchesWildcard(uri, rules[i])) {
              return true
            }
          }
          return false
      }
    }

    return false
  }

  private static extractDomainFromUri(uri: string): string {
    try {
      return new URL(uri).hostname
    } catch (_) {
      // do nothing
    }

    return ''
  }
}
