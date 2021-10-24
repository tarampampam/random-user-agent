import {Handler, HandlerRequest, HandlerResponse} from './handlers'
import Settings, {SettingsState} from '../../settings/settings'
import {DeepPartial} from '../../utils/types'

const name: string = 'update-settings'

export interface UpdateSettingsRequest extends HandlerRequest {
  payload: DeepPartial<SettingsState>
}

export interface UpdateSettingsResponse extends HandlerResponse {
  payload: SettingsState
}

export function updateSettings(state: DeepPartial<SettingsState>): UpdateSettingsRequest {
  return {
    method: name,
    payload: state,
  }
}

export default class UpdateSettings implements Handler {
  private readonly settings: Settings

  constructor(settings: Settings) {
    this.settings = settings
  }

  name(): string {
    return name
  }

  handle(request: UpdateSettingsRequest): UpdateSettingsResponse {
    this.settings.update(request.payload)

    return {
      payload: this.settings.get(),
    }
  }
}
