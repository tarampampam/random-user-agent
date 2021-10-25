import {Handler, HandlerRequest, HandlerResponse} from '../handlers'
import Useragent, {UseragentState} from '../../useragent/useragent'

const name: string = 'update-useragent'

export interface UpdateUseragentRequest extends HandlerRequest {
  payload: UseragentState
}

export interface UpdateUseragentResponse extends HandlerResponse {
  payload: Readonly<UseragentState>
}

export function updateUseragent(state: UseragentState): UpdateUseragentRequest {
  return {
    method: name,
    payload: state,
  }
}

export default class UpdateUseragent implements Handler {
  private readonly useragent: Useragent

  constructor(useragent: Useragent) {
    this.useragent = useragent
  }

  name(): string {
    return name
  }

  handle(request: UpdateUseragentRequest): UpdateUseragentResponse {
    this.useragent.update(request.payload)

    return {
      payload: this.useragent.get(),
    }
  }
}
