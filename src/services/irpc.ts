import {Defined, NotificationObject, RequestObject, RpcParams, SuccessObject} from "jsonrpc-lite";

// Handler MUST throw an error if something goes wrong or required parameter was not passed
export type RouteHandler = (params?: RpcParams) => Defined;

/**
 * RPC router can register handlers for processing RPC requests and handleRequest them.
 *
 * It uses JsonRPC requests/responses format.
 */
export interface IRpcRouter {
  /**
   * Register handler for RPC method.
   */
  on(method: string, call: RouteHandler): void;

  /**
   * Handle RPC request using registered handler.
   *
   * Response will be received only if `RequestObject` is sent (`ErrorObject` will be rejected also only if
   * `RequestObject` is sent, if handler throws an error).
   */
  handleRequest(request: RequestObject | NotificationObject): Promise<SuccessObject>
}
