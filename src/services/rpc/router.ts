import {
  ErrorObject,
  JsonRpcError,
  NotificationObject,
  parseJsonRpcObject,
  RequestObject,
  SuccessObject
} from "jsonrpc-lite";
import {JsonRpc} from "jsonrpc-lite/jsonrpc";
import * as allSettled from "promise.allsettled";
import {Services} from "@/services/services";

export default class RpcRouter implements Services.RPC.Router {
  // Registered routes map
  private routes: { [method: string]: Services.RPC.RouteHandler } = {};

  /**
   * @inheritDoc
   */
  public on(method: string, call: Services.RPC.RouteHandler): void {
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

  /**
   * @inheritDoc
   */
  public handleRawRequest(object: object | object[]): Promise<JsonRpc | JsonRpc[]> {
    // parse passed object or array of objects
    const parsed = parseJsonRpcObject(object as JsonRpc);

    // wrap requests using array
    const requestsArray = Array.isArray(parsed)
      ? parsed
      : [parsed];

    const requestsQueue: Promise<JsonRpc | void>[] = [];

    return new Promise<JsonRpc | JsonRpc[]>((resolve: (response?: JsonRpc | JsonRpc[]) => void): void => {
      // iterate over all parsed requests
      requestsArray.forEach((rpcRequest) => {
        // and push new promise into requests queue as promise
        requestsQueue.push(new Promise((queuedResolve: (response?: SuccessObject) => void, queuedReject: (error?: ErrorObject | JsonRpcError) => void): void => {
          const payload = rpcRequest.payload;

          if (payload instanceof RequestObject || payload instanceof NotificationObject) {
            this.handleRequest(payload)
              .then((response) => queuedResolve(response))
              .catch((error) => queuedReject(error));
          } else {
            queuedReject(new ErrorObject(Number.MIN_SAFE_INTEGER, payload as JsonRpcError)); // ID must be `null`. Issue: <https://github.com/teambition/jsonrpc-lite/issues/19>
          }
        }))
      });

      allSettled(requestsQueue)
        .then((results) => {
          const summary: JsonRpc[] = [];

          // push results into summary array
          results.forEach(result => {
            if (result.status === 'fulfilled' && result.value instanceof JsonRpc) {
              summary.push(result.value);
            } else if (result.status === 'rejected' && result.reason instanceof JsonRpc) {
              summary.push(result.reason);
            }
          });

          if (!Array.isArray(parsed)) {
            resolve(summary[0]);
          } else if (summary.length > 0) {
            resolve(summary);
          } else {
            resolve();
          }
        });
    });
  }
}
