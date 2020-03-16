import RpcHandlers from "@/services/rpc/handlers";
import RpcRouter from "@/services/rpc/router";
import {RequestObject} from "jsonrpc-lite";
import Settings from "@/services/settings/settings";
import {Services} from "@/services/services";
import {GET_ACTIVE_USERAGENT} from "@/services/rpc/constants";

describe('it can', (): void => {
  const defaultStorageMock = new class implements Services.Storage {
    clear(): Promise<void> {
      return new Promise((resolve: Function, reject: Function): void => {
        // do nothing
      });
    }

    get(key: string): Promise<{ [key: string]: any }> {
      return new Promise((resolve: Function, reject: Function): void => {
        // do nothing
      });
    }

    set(key: string, value: { [key: string]: any }): Promise<void> {
      return new Promise((resolve: Function, reject: Function): void => {
        // do nothing
      });
    }
  };

  const settings = new Settings();

  it('nothing', (): Promise<void> => {
    const router = new RpcRouter;
    const handlers = new RpcHandlers(settings);

    handlers.registerFor(router);

    /** @see RpcHandlers.getActiveUserAgent */
    return router.handleRequest(new RequestObject(1, GET_ACTIVE_USERAGENT, [1, 2]))
      .then((res) => {
        //console.log(res);
      });
  });
});
