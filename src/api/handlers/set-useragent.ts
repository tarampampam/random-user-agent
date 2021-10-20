import {Handler, HandlerRequest, HandlerResponse} from './handlers'
import Settings from '../../settings/settings'

const name: string = 'set-useragent'

export interface SetUseragentRequest extends HandlerRequest {
  readonly payload: {
    useragent: string | undefined
  }
}

export interface SetUseragentResponse extends HandlerResponse {
  readonly payload: {}
}

export function setUseragent(useragent: string | undefined): SetUseragentRequest {
  return {
    method: name,
    payload: {
      useragent: useragent,
    },
  }
}

export default class SetUseragent implements Handler {
  private readonly settings: Settings

  constructor(settings: Settings) {
    this.settings = settings
  }

  name(): string {
    return name
  }

  async handle(request: SetUseragentRequest): Promise<SetUseragentResponse> {
    this.settings.setUserAgent(request.payload.useragent)

    return {
      payload: {},
    }
  }
}
