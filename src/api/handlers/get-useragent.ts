import {Handler, HandlerRequest, HandlerResponse} from './handlers'
import Settings from '../../settings/settings'

const name: string = 'get-useragent'

export interface GetUseragentResponse extends HandlerResponse {
  payload: {
    useragent: string | undefined
  }
}

export function getUseragent(): HandlerRequest {
  return {
    method: name,
    payload: {},
  }
}

export default class GetUseragent implements Handler {
  private readonly settings: Settings

  constructor(settings: Settings) {
    this.settings = settings
  }

  name(): string {
    return name
  }

  async handle(request: HandlerRequest): Promise<GetUseragentResponse> {
    return {
      payload: {
        useragent: this.settings.getUserAgent(),
      },
    }
  }
}
