type Payload = { [key: string]: any }

export interface HandlerRequest {
  readonly method: string
  readonly payload: Payload
}

export interface HandlerResponse {
  readonly payload: Payload
}

export interface Handler {
  name(): string
  handle(request: HandlerRequest): HandlerResponse
}

export interface Router {
  /**
   * @throws Error When unregistered method requested
   */
  handle(request: HandlerRequest): HandlerResponse
}

export class HandlersRouter implements Router {
  private readonly handlers: { [key: string]: Handler } = {} // key is a handler name

  constructor(...handlers: Handler[]) {
    handlers.forEach(handler => {
      Object.defineProperty(this.handlers, handler.name(), {value: handler, writable: false})
    })
  }

  handle(request: HandlerRequest): HandlerResponse {
    if (!this.handlers.hasOwnProperty(request.method)) {
      throw new Error(`Unregistered method requested: ${request.method}`)
    }

    return this.handlers[request.method].handle(request)
  }
}
