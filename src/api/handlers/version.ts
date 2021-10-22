import {Handler, HandlerRequest, HandlerResponse} from './handlers'

const name: string = 'version'

export interface VersionResponse extends HandlerResponse {
  payload: {
    version: string
  }
}

export function version(): HandlerRequest {
  return {
    method: name,
    payload: {},
  }
}

export default class Version implements Handler {
  name(): string {
    return name
  }

  handle(request: HandlerRequest): VersionResponse {
    return {
      payload: {
        version: chrome.runtime.getManifest().version,
      },
    }
  }
}
