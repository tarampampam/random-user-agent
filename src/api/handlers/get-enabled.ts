import {Handler, HandlerRequest, HandlerResponse} from './handlers'
import Settings from '../../settings/settings'

const name: string = 'get-enabled'

export interface GetEnabledResponse extends HandlerResponse {
  payload: {
    enabled: boolean
  }
}

export function getEnabled(): HandlerRequest {
  return {
    method: name,
    payload: {},
  }
}

export default class GetEnabled implements Handler {
  private readonly settings: Settings

  constructor(settings: Settings) {
    this.settings = settings
  }

  name(): string {
    return name
  }

  handle(request: HandlerRequest): GetEnabledResponse {
    return {
      payload: {
        enabled: this.settings.isEnabled(),
      },
    }
  }
}
