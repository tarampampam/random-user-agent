import {Handler, HandlerRequest, HandlerResponse} from './handlers'
import Settings from '../../settings/settings'

const name: string = 'set-enabled'

export interface SetEnabledRequest extends HandlerRequest {
  readonly payload: {
    enabled: boolean
  }
}

export interface SetEnabledResponse extends HandlerResponse {
  readonly payload: {}
}

export function setEnabled(enabled: boolean): SetEnabledRequest {
  return {
    method: name,
    payload: {
      enabled: enabled
    },
  }
}

export default class SetEnabled implements Handler {
  private readonly settings: Settings

  constructor(settings: Settings) {
    this.settings = settings
  }

  name(): string {
    return name
  }

  async handle(request: SetEnabledRequest): Promise<SetEnabledResponse> {
    this.settings.setEnabled(request.payload.enabled)

    return {
      payload: {},
    }
  }
}
