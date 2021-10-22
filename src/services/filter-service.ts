import Settings, {BlacklistMode} from '../settings/settings'
import {matchesWildcard} from '../utils/patterns'

export default class FilterService {
  private readonly settings: Settings

  constructor(settings: Settings) {
    this.settings = settings
  }

  enabledForDomain(domain: string): boolean {
    const current = this.settings.getBlacklistDomains()

    switch (this.settings.getBlacklistMode()) {
      case BlacklistMode.BlackList: // enabled by default, but disabled ONLY if the domain in the domains list
        return !current.includes(domain)

      case BlacklistMode.WhiteList: // disabled by default, but enabled ONLY if the domain in the domains list
        return current.includes(domain)
    }

    return false
  }

  changeForDomain(domain: string, enable: boolean): void {
    if (enable) { // enable switcher for the domain
      switch (this.settings.getBlacklistMode()) {
        case BlacklistMode.BlackList: // remove from the domains list
          this.removeFromDomainsList(domain)
          break

        case BlacklistMode.WhiteList: // append into the domains list
          this.appendIntoDomainsList(domain)
          break
      }
    } else { // disable switcher for the domain
      switch (this.settings.getBlacklistMode()) {
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
    const current = this.settings.getBlacklistDomains()

    if (current.includes(domain)) {
      this.settings.setBlacklistDomains(current.filter((iteratedDomain): boolean => iteratedDomain !== domain))
    }
  }

  private appendIntoDomainsList(domain: string): void {
    const current = this.settings.getBlacklistDomains()

    if (!current.includes(domain)) {
      current.push(domain)

      this.settings.setBlacklistDomains(current)
    }
  }

  applicableToURI(uri: string): boolean {
    if (this.settings.isEnabled()) {
      const domain = FilterService.extractDomainFromUri(uri),
        domains = this.settings.getBlacklistDomains(),
        rules = this.settings.getBlacklistCustomRules()

      switch (this.settings.getBlacklistMode()) {
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
