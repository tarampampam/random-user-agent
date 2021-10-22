import {Handler, HandlerRequest, HandlerResponse} from './handlers'
import Settings, {BlacklistMode} from '../../settings/settings'
import FilterService from '../../services/filter-service'

const name: string = 'change-for-domain'

export interface ChangeForDomainRequest extends HandlerRequest {
  readonly payload: {
    domain: string
    enable: boolean
  }
}

export interface ChangeForDomainResponse extends HandlerResponse {
  readonly payload: {
    // nothing
  }
}

export function changeForDomain(domain: string, enable: boolean): ChangeForDomainRequest {
  return {
    method: name,
    payload: {
      domain: domain,
      enable: enable,
    },
  }
}

export default class ChangeForDomain implements Handler {
  private readonly filterService: FilterService

  constructor(filterService: FilterService) {
    this.filterService = filterService
  }

  name(): string {
    return name
  }

  handle(request: ChangeForDomainRequest): ChangeForDomainResponse {
    this.filterService.changeForDomain(request.payload.domain, request.payload.enable)

    return {
      payload: {},
    }
  }
}
