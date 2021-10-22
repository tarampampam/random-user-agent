import {Handler, HandlerRequest, HandlerResponse} from './handlers'
import UseragentService from '../../services/useragent-service'

const name: string = 'refresh-useragent'

export interface RenewUseragentRequest extends HandlerRequest {
  readonly payload: {
    // nothing
  }
}

export interface RenewUseragentResponse extends HandlerResponse {
  payload: {
    previous: string | undefined
    new: string
  }
}

export function renewUseragent(): RenewUseragentRequest {
  return {
    method: name,
    payload: {},
  }
}

export default class RenewUseragent implements Handler {
  private readonly useragentService: UseragentService

  constructor(useragentService: UseragentService) {
    this.useragentService = useragentService
  }

  name(): string {
    return name
  }

  handle(request: RenewUseragentRequest): RenewUseragentResponse {
    const renew = this.useragentService.renew()

    return {
      payload: {
        previous: renew.previous,
        new: renew.new,
      },
    }
  }
}
