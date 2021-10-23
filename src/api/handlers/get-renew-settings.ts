import {Handler, HandlerRequest, HandlerResponse} from './handlers'
import Settings from '../../settings/settings'

const name: string = 'get-renew-settings'

export interface GetRenewSettingsResponse extends HandlerResponse {
  payload: {
    // Auto renewal is enabled?
    enabled: boolean
    // Auto renewal interval (in milliseconds)
    intervalMillis: number
    // Renewal on startup is enabled?
    onStartup: boolean
  }
}

export function getRenewSettings(): HandlerRequest {
  return {
    method: name,
    payload: {},
  }
}

export default class GetRenewSettings implements Handler {
  private readonly settings: Settings

  constructor(settings: Settings) {
    this.settings = settings
  }

  name(): string {
    return name
  }

  handle(request: HandlerRequest): GetRenewSettingsResponse {
    return {
      payload: {
        enabled: this.settings.isRenewalEnabled(),
        intervalMillis: this.settings.getRenewalIntervalMillis(),
        onStartup: this.settings.isRenewalOnStartupEnabled(),
      },
    }
  }
}
