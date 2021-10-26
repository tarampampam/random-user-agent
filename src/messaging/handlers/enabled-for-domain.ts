import {Handler, HandlerRequest, HandlerResponse} from '../handlers'
import Settings, {BlacklistMode} from '../../settings/settings'
import FilterService from '../../services/filter-service'

const name: string = 'enabled-for-domain'

export interface EnabledForDomainRequest extends HandlerRequest {
  readonly payload: {
    domain: string
  }
}

export interface EnabledForDomainResponse extends HandlerResponse {
  readonly payload: {
    enabled: boolean
  }
}

export function enabledForDomain(domain: string): EnabledForDomainRequest {
  return {
    method: name,
    payload: {
      domain: domain,
    },
  }
}

export default class EnabledForDomain implements Handler {
  private readonly filterService: FilterService

  constructor(filterService: FilterService) {
    this.filterService = filterService
  }

  name(): string {
    return name
  }

  handle(request: EnabledForDomainRequest): EnabledForDomainResponse {
    return {
      payload: {
        enabled: this.filterService.enabledForDomain(request.payload.domain),
      },
    }
  }
}
