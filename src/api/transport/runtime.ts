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
    chrome.runtime.onMessage.addListener((message: any, _, reply: (response: Envelope) => void): boolean => {
      const lastError = chrome.runtime.lastError, validationError = validateEnvelope(message)

      if (lastError) {
        this.errorsHandler(new Error(lastError.message))

        return false
      } else if (validationError !== undefined) {
        this.errorsHandler(validationError)

        return false
      }

      const response: Envelope = {
        sign: signature,
        data: {},
      }

      const promises: Promise<HandlerResponse>[] = []

      for (const [id, req] of Object.entries((message as Envelope).data)) {
        promises.push(new Promise<HandlerResponse>((resolve, reject) => {
          this.router.handle(req as HandlerRequest)
            .then((handlerResponse): void => {
              response.data[id] = handlerResponse

              resolve(handlerResponse)
            })
            .catch(reject)
        }))
      }

      Promise.all(promises)
        .then((): void => reply(response))
        .catch(this.errorsHandler)

      // return true from the event listener to indicate you wish to send a response asynchronously
      // (this will keep the message channel open to the other end until sendResponse is called)
      return true
    })
  }
}
