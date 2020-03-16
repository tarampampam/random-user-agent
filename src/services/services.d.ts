import {Defined, ErrorObject, NotificationObject, RequestObject, RpcParams, SuccessObject} from "jsonrpc-lite";
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

  export interface Version {
    [key: string]: number | string;

    // Major version value
    major: number,

    // Minor version value
    minor: number,

    // Patch version value
    patch: number,

    // Build version value
    build: string,
  }
}

declare namespace Services.RPC {
  // Method name type
  export type MethodName = string;

  // Handler MUST throw an error if something goes wrong or required parameter was not passed
  export type MethodHandler = (params?: RpcParams) => Defined;

  /**
   * RPC router can register handlers for processing RPC requests and handle them.
   *
   * It uses `JsonRPC 2.0` requests/responses format.
   */
  export interface Router {
    /**
     * Register handler for RPC method.
     */
    on(method: Services.RPC.MethodName, call: MethodHandler): void;

    /**
     * Handle RPC request using registered handler.
     *
     * `NotificationObject` wil be handled **without** response resolving. Errors will be returned as regular resolve.
     */
    handleRequest(request: RequestObject | NotificationObject): Promise<SuccessObject | ErrorObject | undefined>

    /**
     * Handle raw rpc requests (single or batch).
     *
     * Rejection will be handled only on internal errors (`SuccessObject` and `ErrorObject` will be resolved).
     */
    handleRawRequest(object: object | object[]): Promise<JsonRpc | JsonRpc[] | undefined>;
  }
}
