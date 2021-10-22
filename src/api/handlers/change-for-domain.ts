import {Handler, HandlerRequest, HandlerResponse} from './handlers'
import Settings, {BlacklistMode} from '../../settings/settings'

const name: string = 'change-for-domain'

export interface ChangeForDomainRequest extends HandlerRequest {
  readonly payload: {
    domain: string
    enable: boolean
  }
}

export interface ChangeForDomainResponse extends HandlerResponse {
  readonly payload: {
    // nothing
  }
}

export function changeForDomain(domain: string, enable: boolean): ChangeForDomainRequest {
  return {
    method: name,
    payload: {
      domain: domain,
      enable: enable,
    },
  }
}

export default class ChangeForDomain implements Handler {
  private readonly settings: Settings

  constructor(settings: Settings) {
    this.settings = settings
  }

  name(): string {
    return name
  }

  async handle(request: ChangeForDomainRequest): Promise<ChangeForDomainResponse> {
    if (request.payload.enable) { // enable switcher for the domain
      switch (this.settings.getBlacklistMode()) {
        case BlacklistMode.BlackList: // remove from the domains list
          this.removeFromDomainsList(request.payload.domain)
          break

        case BlacklistMode.WhiteList: // append into the domains list
          this.appendIntoDomainsList(request.payload.domain)
          break
      }
    } else { // disable switcher for the domain
      switch (this.settings.getBlacklistMode()) {
        case BlacklistMode.BlackList: // append into the domains list
          this.appendIntoDomainsList(request.payload.domain)
          break

        case BlacklistMode.WhiteList: // remove from the domains list
          this.removeFromDomainsList(request.payload.domain)
          break
      }
    }

    return {
      payload: {},
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
}
