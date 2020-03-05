import {
  ErrorObject,
  JsonRpcError,
  NotificationObject,
  parseJsonRpcObject,
  RequestObject,
  SuccessObject
} from "jsonrpc-lite";

import {IRpcRouter, RouteHandler} from "@/services/irpc";
import {JsonRpc} from "jsonrpc-lite/jsonrpc";

export default class RpcRouter implements IRpcRouter {
  // Registered routes map
  private routes: { [method: string]: RouteHandler } = {};

  /**
   * @inheritDoc
   */
  public on(method: string, call: RouteHandler): void {
    this.routes[method] = call;
  }

  /**
   * @inheritDoc
   */
  public handleRequest(request: RequestObject | NotificationObject): Promise<SuccessObject> {
    return new Promise((resolve: (response?: SuccessObject) => void, reject: (error?: ErrorObject) => void): void => {
      const method = request.method;

      if (!this.routes[method]) {
        let response = undefined;

        // skip rejecting for notifications
        if (request instanceof RequestObject) {
          response = new ErrorObject(request.id, JsonRpcError.methodNotFound(method));
        }

        reject(response);

        return;
      }

      try {
        let result = undefined;

        // skip resolving for notifications
        if (request instanceof RequestObject) {
          result = new SuccessObject(request.id, this.routes[method](request.params));
        }

        resolve(result);
      } catch (e) {
        let message = 'Error occurred';

        if (e instanceof Error) {
          message = e.message;
        }

        // skip rejecting for notifications
        if (request instanceof RequestObject) {
          reject(new ErrorObject(request.id, new JsonRpcError(message, 10)));
        }

        reject();
      }
    });
  }

  public handleRawRequest(object: object | object[]): Promise<JsonRpc | JsonRpc[]> {
    // parse passed object or array of objects
    const parsed = parseJsonRpcObject(object as JsonRpc);

    // wrap requests using array
    const requestsArray = Array.isArray(parsed)
      ? parsed
      : [parsed];

    let requestsQueue: Promise<JsonRpc>[] = [];

    // iterate over all parsed requests
    requestsArray.forEach((rpcRequest) => {
      // and push new promise into requests queue as promise
      requestsQueue.push(new Promise((resolve: (response?: SuccessObject) => void, reject: (error?: ErrorObject | JsonRpcError) => void): void => {
        const payload = rpcRequest.payload;

        if (payload instanceof RequestObject || payload instanceof NotificationObject) {
          this.handleRequest(payload)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        } else if (payload instanceof JsonRpcError) {
          reject(payload);
        } else {
          reject();
        }
      }))
    });

    return new Promise<JsonRpc | JsonRpc[]>((resolve, reject): void => {
      Promise
        .all(requestsQueue)
        .then((responses) => {
          if (!Array.isArray(parsed)) {
            resolve(responses[0]);
          } else {
            resolve(responses);
          }
        })
        .catch((error) => reject(error));
    });
  }
}
