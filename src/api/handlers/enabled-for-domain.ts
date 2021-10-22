import {Handler, HandlerRequest, HandlerResponse} from './handlers'
import Settings, {BlacklistMode} from '../../settings/settings'

const name: string = 'enabled-for-domain'

export interface EnabledForDomainRequest extends HandlerRequest {
  readonly payload: {
    domain: string
  }
}

export interface EnabledForDomainResponse extends HandlerResponse {
  readonly payload: {
    enabled: boolean
  }
}

export function enabledForDomain(domain: string): EnabledForDomainRequest {
  return {
    method: name,
    payload: {
      domain: domain,
    },
  }
}

export default class EnabledForDomain implements Handler {
  private readonly settings: Settings

  constructor(settings: Settings) {
    this.settings = settings
  }

  name(): string {
    return name
  }

  async handle(request: EnabledForDomainRequest): Promise<EnabledForDomainResponse> {
    const current = this.settings.getBlacklistDomains(), domain = request.payload.domain

    let enabled: boolean = false

    switch (this.settings.getBlacklistMode()) {
      case BlacklistMode.BlackList: // enabled by default, but disabled ONLY if the domain in the domains list
        enabled = !current.includes(domain)
        break

      case BlacklistMode.WhiteList: // disabled by default, but enabled ONLY if the domain in the domains list
        enabled = current.includes(domain)
        break
    }

    return {
      payload: {
        enabled: enabled,
      },
    }
  }
}
