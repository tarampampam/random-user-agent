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
  handle(request: HandlerRequest): Promise<HandlerResponse>
}

export interface Router {
  handle(request: HandlerRequest): Promise<HandlerResponse>
}

export class HandlersRouter implements Router {
  private readonly handlers: { [key: string]: Handler } = {} // key is a handler name

  constructor(...handlers: Handler[]) {
    handlers.forEach(handler => {
      Object.defineProperty(this.handlers, handler.name(), {value: handler, writable: false})
    })
  }

  async handle(request: HandlerRequest): Promise<HandlerResponse> {
    return new Promise<HandlerResponse>((resolve, reject) => {
      if (!this.handlers.hasOwnProperty(request.method)) {
        return reject(new Error(`Unregistered method requested: ${request.method}`))
      }

      this.handlers[request.method]
        .handle(request)
        .then(resolve)
    })
  }
}
