import {Handler, HandlerRequest, HandlerResponse} from './handlers'
import FilterService from '../../services/filter-service'

const name: string = 'applicable-to-uri'

export interface ApplicableToURIRequest extends HandlerRequest {
  readonly payload: {
    uri: string
  }
}

export interface ApplicableToURIResponse extends HandlerResponse {
  payload: {
    applicable: boolean
  }
}

export function applicableToURI(uri: string): ApplicableToURIRequest {
  return {
    method: name,
    payload: {
      uri: uri,
    },
  }
}

export default class ApplicableToURI implements Handler {
  private readonly filterService: FilterService

  constructor(filterService: FilterService) {
    this.filterService = filterService
  }

  name(): string {
    return name
  }

  handle(request: ApplicableToURIRequest): ApplicableToURIResponse {
    return {
      payload: {
        applicable: this.filterService.applicableToURI(request.payload.uri),
      },
    }
  }
}
