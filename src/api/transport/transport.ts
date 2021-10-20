import {HandlerRequest, HandlerResponse} from '../handlers/handlers'

export interface Sender {
  send(...requests: HandlerRequest[]): Promise<HandlerResponse[]>
}

export interface Receiver {
  listen(): void
}
