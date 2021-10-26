import {Handler, HandlerRequest, HandlerResponse} from '../handlers'
import Useragent, {UseragentState} from '../../useragent/useragent'

const name: string = 'get-useragent'

export interface GetUseragentResponse extends HandlerResponse {
  payload: Readonly<UseragentState>
}

export function getUseragent(): HandlerRequest {
  return {
    method: name,
    payload: {},
  }
}

export default class GetUseragent implements Handler {
  private readonly useragent: Useragent

  constructor(useragent: Useragent) {
    this.useragent = useragent
  }

  name(): string {
    return name
  }

  handle(request: HandlerRequest): GetUseragentResponse {
    return {
      payload: this.useragent.get(),
    }
  }
}
