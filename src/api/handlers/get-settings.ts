import {Handler, HandlerRequest, HandlerResponse} from './handlers'
import Settings, {SettingsState} from '../../settings/settings'

const name: string = 'get-settings'

export interface GetSettingsResponse extends HandlerResponse {
  payload: SettingsState
}

export function getSettings(): HandlerRequest {
  return {
    method: name,
    payload: {},
  }
}

export default class GetSettings implements Handler {
  private readonly settings: Settings

  constructor(settings: Settings) {
    this.settings = settings
  }

  name(): string {
    return name
  }

  handle(request: HandlerRequest): GetSettingsResponse {
    return {
      payload: this.settings.get(),
    }
  }
}
