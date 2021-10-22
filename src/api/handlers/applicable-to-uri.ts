import {Handler, HandlerRequest, HandlerResponse} from './handlers'
import Settings, {BlacklistMode} from '../../settings/settings'
import {matchesWildcard} from '../../utils/patterns'

const name: string = 'applicable-to-uri'

export interface ApplicableToURIRequest extends HandlerRequest {
  readonly payload: {
    uri: string
  }
}

export interface ApplicableToURIResponse extends HandlerResponse {
  payload: {
    applicable: boolean
  }
}

export function applicableToURI(uri: string): ApplicableToURIRequest {
  return {
    method: name,
    payload: {
      uri: uri,
    },
  }
}

export default class ApplicableToURI implements Handler {
  private readonly settings: Settings

  constructor(settings: Settings) {
    this.settings = settings
  }

  name(): string {
    return name
  }

  async handle(request: ApplicableToURIRequest): Promise<ApplicableToURIResponse> {
    let applicable: boolean = false

    if (this.settings.isEnabled()) {
      const domain = ApplicableToURI.extractDomainFromUri(request.payload.uri),
        domains = this.settings.getBlacklistDomains(),
        rules = this.settings.getBlacklistCustomRules()

      mode: switch (this.settings.getBlacklistMode()) {
        case BlacklistMode.BlackList:
          if (domain.length > 0 && domains.includes(domain)) {
            applicable = false

            break
          }

          for (let i = 0; i < rules.length; i++) {
            if (matchesWildcard(request.payload.uri, rules[i])) {
              applicable = false

              break mode
            }
          }

          applicable = true

          break

        case BlacklistMode.WhiteList:
          if (domain.length > 0 && domains.includes(domain)) {
            applicable = true

            break
          }

          for (let i = 0; i < rules.length; i++) {
            if (matchesWildcard(request.payload.uri, rules[i])) {
              applicable = true

              break mode
            }
          }

          applicable = false

          break
      }
    }

    return {
      payload: {
        applicable: applicable,
      },
    }
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
