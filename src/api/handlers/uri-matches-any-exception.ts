import {Handler, HandlerRequest, HandlerResponse} from './handlers'
import Settings from '../../settings/settings'
import {matchesWildcard} from '../../utils/exceptions'

const name: string = 'uri-matches-any-exception'

export interface UriMatchesAnyExceptionRequest extends HandlerRequest {
  readonly payload: {
    uri: string
  }
}

export interface UriMatchesAnyExceptionResponse extends HandlerResponse {
  payload: {
    matched: boolean
  }
}

export function uriMatchesAnyException(uri: string): UriMatchesAnyExceptionRequest {
  return {
    method: name,
    payload: {
      uri: uri,
    },
  }
}

export default class UriMatchesAnyException implements Handler {
  private readonly settings: Settings

  constructor(settings: Settings) {
    this.settings = settings
  }

  name(): string {
    return name
  }

  async handle(request: UriMatchesAnyExceptionRequest): Promise<UriMatchesAnyExceptionResponse> {
    const exceptionsList = this.settings.getExceptionsList()

    if (exceptionsList.length > 0) {
      for (let i = 0; i < exceptionsList.length; i++) {
        if (matchesWildcard(request.payload.uri, exceptionsList[i])) {
          return {
            payload: {
              matched: true
            }
          }
        }
      }
    }

    return {
      payload: {
        matched: false
      }
    }
  }
}
