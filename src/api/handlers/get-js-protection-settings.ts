import {Handler, HandlerRequest, HandlerResponse} from './handlers'
import Settings from '../../settings/settings'

const name: string = 'get-js-protection-settings'

export interface GetJSProtectionEnabledResponse extends HandlerResponse {
  payload: {
    enabled: boolean
  }
}

export function getJsProtectionSettings(): HandlerRequest {
  return {
    method: name,
    payload: {},
  }
}

export default class GetJSProtectionSettings implements Handler {
  private readonly settings: Settings

  constructor(settings: Settings) {
    this.settings = settings
  }

  name(): string {
    return name
  }

  handle(request: HandlerRequest): GetJSProtectionEnabledResponse {
    return {
      payload: {
        enabled: this.settings.isJavascriptProtectionEnabled(),
      },
    }
  }
}
