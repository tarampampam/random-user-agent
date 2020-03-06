import {Defined, NotificationObject, RequestObject, RpcParams, SuccessObject} from "jsonrpc-lite";
import {JsonRpc} from "jsonrpc-lite/jsonrpc";

declare namespace Services {
  export interface Storage {
    /**
     * Removes all items from storage.
     */
    clear(): Promise<void>;

    /**
     * Save object in storage.
     */
    set(key: string, value: { [key: string]: any }): Promise<void>;

    /**
     * Get object from storage.
     */
    get(key: string): Promise<{ [key: string]: any }>;
  }
}

declare namespace Services.RPC {
  // Handler MUST throw an error if something goes wrong or required parameter was not passed
  export type RouteHandler = (params?: RpcParams) => Defined;

  /**
   * RPC router can register handlers for processing RPC requests and handleRequest them.
   *
   * It uses JsonRPC requests/responses format.
   */
  export interface Router {
    /**
     * Register handler for RPC method.
     */
    on(method: string, call: RouteHandler): void;

    /**
     * Handle RPC request using registered handler.
     *
     * `NotificationObject` wil be handled **without** response resolving. Errors will be returned as rejection.
     */
    handleRequest(request: RequestObject | NotificationObject): Promise<SuccessObject>

    /**
     * Handle raw rpc requests (single or batch).
     *
     * Rejection will be handled only on internal errors (`SuccessObject` and `ErrorObject` will be resolved).
     */
    handleRawRequest(object: object | object[]): Promise<JsonRpc | JsonRpc[]>;
  }
}
