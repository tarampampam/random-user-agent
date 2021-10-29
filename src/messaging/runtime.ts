import {HandlerRequest, HandlerResponse, Router} from './handlers'
import browser from 'webextension-polyfill'

const signature: string = 'rua-proto-v1' // some unique string

export interface Sender {
  send(...requests: HandlerRequest[]): Promise<HandlerResponse[]>
}

export interface Receiver {
  listen(): void
}

interface Envelope {
  readonly sign: string
  readonly data: { [key: string]: HandlerRequest | HandlerResponse } // key is a request/response ID
}

function generateRandomKey(): string {
  return Math.random().toString(36).substring(3)
}

function validateEnvelope(envelope: any): Error | undefined {
  if (typeof envelope !== 'object') {
    return new TypeError(`Wrong envelope type (expected: object, actual: ${typeof envelope})`)
  }

  envelope = envelope as Object

  if (!envelope.hasOwnProperty('sign') || envelope.sign !== signature) {
    return new Error(`Wrong or missing envelope signature`)
  }

  if (!envelope.hasOwnProperty('data') || typeof envelope.data !== 'object') {
    return new SyntaxError(`Wrong or missing envelope "data" property type (expected: object, actual: ${typeof envelope.data})`)
  }

  return undefined
}

export class RuntimeSender implements Sender {
  send(...requests: HandlerRequest[]): Promise<HandlerResponse[]> {
    return new Promise<HandlerResponse[]>((resolve, reject) => {
      const message: Envelope = {
        sign: signature,
        data: {},
      }

      const order: String[] = [] // for the faster responses ordering

      requests.forEach(request => {
        const id = generateRandomKey().toString()

        message.data[id] = request
        order.push(id)
      })

      browser.runtime.sendMessage(message)
        .then((response): void => {
          const validationError = validateEnvelope(response)
          if (validationError !== undefined) {
            return reject(validationError)
          }

          let responses: HandlerResponse[] = Array(requests.length)

          for (const [id, resp] of Object.entries((response as Envelope).data)) {
            if (!order.includes(id)) {
              return reject(new Error(`Unexpected response ID ${id} in the responses stack`))
            }

            responses[order.indexOf(id)] = resp // replace the request ID with the response with the corresponding ID
          }

          responses = responses.filter((response): boolean => {
            return typeof response === 'object'
          })

          if (responses.length !== requests.length) {
            return reject(new Error(`Unexpected responses count (expected: ${requests.length}, actual: ${responses.length})`))
          }

          resolve(responses)
        })
        .catch(reject)
    })
  }
}

type ErrorsHandler = (err: Error) => void

export class RuntimeReceiver implements Receiver {
  private readonly router: Router
  private readonly errorsHandler: ErrorsHandler

  constructor(router: Router, errorsHandler: ErrorsHandler) {
    this.errorsHandler = errorsHandler
    this.router = router
  }

  listen(): void {
    browser.runtime.onMessage.addListener(async (message, sender) => {
      const validationError = validateEnvelope(message)
      if (validationError !== undefined) {
        return this.errorsHandler(validationError)
      }

      const response: Envelope = {
        sign: signature,
        data: {},
      }

      for (const [id, req] of Object.entries((message as Envelope).data)) {
        response.data[id] = this.router.handle(req as HandlerRequest)
      }

      return response
    })
  }
}
