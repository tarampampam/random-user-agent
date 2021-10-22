import {Handler, HandlerRequest, HandlerResponse} from './handlers'
import Settings from '../../settings/settings'

const name: string = 'manage-exception'

type ActionType = 'add' | 'remove'

export interface ManageExceptionRequest extends HandlerRequest {
  readonly payload: {
    action: ActionType
    pattern: string
  }
}

export interface ManageExceptionResponse extends HandlerResponse {
  payload: {
    success: boolean
  }
}

export function manageException(pattern: string, action: ActionType): ManageExceptionRequest {
  return {
    method: name,
    payload: {
      action: action,
      pattern: pattern,
    },
  }
}

export default class ManageException implements Handler {
  private readonly settings: Settings

  constructor(settings: Settings) {
    this.settings = settings
  }

  name(): string {
    return name
  }

  async handle(request: ManageExceptionRequest): Promise<ManageExceptionResponse> {
    const pattern = request.payload.pattern.trim(), current = this.settings.getExceptionsList()

    if (pattern.length > 0) {
      switch (request.payload.action) {
        case 'add':
          if (!current.includes(pattern)) {
            current.push(pattern)

            this.settings.setExceptionsList(current)

            return {
              payload: {
                success: true,
              },
            }
          }
          break

        case 'remove':
          if (current.includes(pattern)) {
            this.settings.setExceptionsList(current.filter((item): boolean => {
              return item !== pattern
            }))

            return {
              payload: {
                success: true,
              },
            }
          }
          console.log('NOT includes', current, pattern)
          break
      }
    }

    return {
      payload: {
        success: false,
      },
    }
  }
}
