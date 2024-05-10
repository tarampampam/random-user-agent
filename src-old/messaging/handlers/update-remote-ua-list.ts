import {Handler, HandlerRequest, HandlerResponse} from '../handlers'
import UseragentService from '../../services/useragent-service'
import UseragentInfo from '../../useragent/useragent-info'
import RemoteListService from '../../services/remotelist-service'

const name: string = 'update-remote-ua-list'

export interface UpdateRemoteUAListRequest extends HandlerRequest {
  readonly payload: {
    // nothing
  }
}

export interface UpdateRemoteUAListResponse extends HandlerResponse {
  payload: {
    // nothing
  }
}

export function updateRemoteUAList(): UpdateRemoteUAListRequest {
  return {
    method: name,
    payload: {},
  }
}

export default class UpdateRemoteUAList implements Handler {
  private readonly remoteListService: RemoteListService
  private readonly errorsHandler: (err: Error) => void

  constructor(remoteListService: RemoteListService, errorsHandler: (err: Error) => void) {
    this.remoteListService = remoteListService
    this.errorsHandler = errorsHandler
  }

  name(): string {
    return name
  }

  handle(request: UpdateRemoteUAListRequest): UpdateRemoteUAListResponse {
    this.remoteListService.update().catch(this.errorsHandler)

    return {
      payload: {
        // nothing
      },
    }
  }
}
