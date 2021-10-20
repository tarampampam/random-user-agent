import {Receiver, Sender} from './transport'
import {HandlerRequest, HandlerResponse, Router} from '../handlers/handlers'
import {v4 as uuid} from 'uuid'

const signature: string = 'rua-proto-v1' // some unique string

interface Envelope {
  readonly sign: string
  readonly data: { [key: string]: HandlerRequest | HandlerResponse } // key is request/response ID
}

function validateEnvelope(envelope: any): Error | undefined {
  if (typeof envelope !== 'object') {
    return new Error(`Wrong envelope type (expected: object, actual: ${typeof envelope})`)
  }

  envelope = envelope as Object

  if (!envelope.hasOwnProperty('sign') || envelope.sign !== signature) {
    return new Error(`Wrong or missing envelope signature`)
  }

  if (!envelope.hasOwnProperty('data') || typeof envelope.data !== 'object') {
    return new Error(`Wrong or missing envelope "data" property type (expected: object, actual: ${typeof envelope.data})`)
  }

  return
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
        const id = uuid().toString()

        message.data[id] = request
        order.push(id)
      })

      chrome.runtime.sendMessage(message, (response: any) => {
        const lastError = chrome.runtime.lastError, validationError = validateEnvelope(response)

        if (lastError) {
          return reject(new Error(lastError.message))
        } else if (validationError !== undefined) {
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
    })
  }
}

type ErrorsHandler = (err: Error) => void

export class RuntimeReceiver implements Receiver {
  private readonly errorsHandler: ErrorsHandler
  private readonly router: Router

  constructor(errorsHandler: ErrorsHandler, router: Router) {
    this.errorsHandler = errorsHandler
    this.router = router
  }

  listen(): void {
    chrome.runtime.onMessage.addListener((message: any, _, reply: (response: Envelope) => void) => {
      const lastError = chrome.runtime.lastError, validationError = validateEnvelope(message)

      if (lastError) {
        return this.errorsHandler(new Error(lastError.message))
      } else if (validationError !== undefined) {
        return this.errorsHandler(validationError)
      }

      const response: Envelope = {
        sign: signature,
        data: {},
      }

      for (const [id, req] of Object.entries((message as Envelope).data)) {
        response.data[id] = this.router.handle(req as HandlerRequest)
      }

      reply(response)
    })
  }
}
