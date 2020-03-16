import {
  ErrorObject,
  JsonRpcError,
  JsonRpc,
  NotificationObject,
  parseJsonRpcObject,
  RequestObject,
  SuccessObject
} from "jsonrpc-lite/jsonrpc";
import {Services} from "@/services/services";

export default class RpcRouter implements Services.RPC.Router {
  // Registered routes map
  private routes: { [method: string]: Services.RPC.MethodHandler } = {};

  /**
   * @inheritDoc
   */
  public on(method: Services.RPC.MethodName, call: Services.RPC.MethodHandler): void {
    this.routes[method] = call;
  }

  /**
   * @inheritDoc
   */
  public handleRequest(request: RequestObject | NotificationObject): Promise<SuccessObject | ErrorObject | undefined> {
    return new Promise((resolve: (response?: SuccessObject | ErrorObject) => void): void => {
      const method: Services.RPC.MethodName = request.method;
      let response: ErrorObject | SuccessObject | undefined = undefined;

      if (!this.routes[method]) {
        // skip rejecting for notifications
        if (request instanceof RequestObject) {
          response = new ErrorObject(request.id, JsonRpcError.methodNotFound(method));
        }

        return resolve(response);
      }

      try {
        // skip resolving for notifications
        if (request instanceof RequestObject) {
          response = new SuccessObject(request.id, this.routes[method](request.params));
        }

        return resolve(response);
      } catch (e) {
        // skip rejecting for notifications
        if (request instanceof RequestObject) {
          response = new ErrorObject(request.id, new JsonRpcError(e.message, 10));
        }

        return resolve(response);
      }
    });
  }

  /**
   * @inheritDoc
   */
  public handleRawRequest(object: object | object[]): Promise<JsonRpc | JsonRpc[] | undefined> {
    // parse passed object or array of objects
    const parsed = parseJsonRpcObject(object as JsonRpc);

    // wrap requests using array
    const requestsArray = Array.isArray(parsed)
      ? parsed
      : [parsed];

    const requestsQueue: Promise<JsonRpc | undefined>[] = [];

    return new Promise<JsonRpc | JsonRpc[] | undefined>((resolve: (response?: JsonRpc | JsonRpc[]) => void, reject): void => {
      // iterate over all parsed requests
      requestsArray.forEach((rpcRequest) => {
        // and push new promise into requests queue as promise
        requestsQueue.push(new Promise((queuedResolve: (response?: SuccessObject | ErrorObject) => void, queuedReject): void => {
          const payload = rpcRequest.payload;

          if (payload instanceof RequestObject || payload instanceof NotificationObject) {
            this.handleRequest(payload)
              .then((response) => queuedResolve(response))
              .catch((error) => queuedReject(error));
          } else {
            // ID must be `null`. Issue: <https://github.com/teambition/jsonrpc-lite/issues/19>
            queuedResolve(new ErrorObject(Number.MIN_SAFE_INTEGER, payload as JsonRpcError));
          }
        }))
      });

      Promise.all(requestsQueue)
        .then((results) => {
          // remove `undefined` results
          results = results.filter((response) => response !== undefined);

          if (!Array.isArray(parsed)) {
            resolve(results[0]);
          } else if (results.length > 0) {
            resolve(results as JsonRpc[]);
          } else {
            resolve();
          }
        })
        .catch((error) => reject(error))
    });
  }
}
