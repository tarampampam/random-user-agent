import RpcHandlers from "@/services/rpc/handlers";
import RpcRouter from "@/services/rpc/router";
import {RequestObject, SuccessObject} from "jsonrpc-lite";
import Settings from "@/services/settings/settings";
import {Services} from "@/services/services";
import {GET_ACTIVE_USERAGENT} from "@/services/rpc/constants";

describe('handlers', (): void => {
  const defaultStorageMock = new class implements Services.Storage {
    clear(): Promise<void> {
      return new Promise((resolve: Function, reject: Function): void => {
        // do nothing
      });
    }

    get(key: string): Promise<{ [key: string]: any }> {
      return new Promise((resolve: Function, reject: Function): void => {
        resolve({
          enabled: true,
          useragent: 'Foo UA/Mozilla 666.6.1',
          renew_enabled: true,
          renew_interval: 10 * 60 * 1000,
          renew_onstartup: true,
          sync: true,
          custom_useragent_enabled: false,
          custom_useragent_value: null,
          custom_useragent_list: [],
          javascript_protection_enabled: true,
          generator_types: ['chrome_win', 'chrome_mac', 'chrome_linux', 'firefox_win', 'firefox_mac', 'firefox_linux'],
          exceptions_list: ['chrome://*'],
        });
      });
    }

    set(key: string, value: { [key: string]: any }): Promise<void> {
      return new Promise((resolve: Function, reject: Function): void => {
        // do nothing
      });
    }
  };

  const settings = new Settings(defaultStorageMock);
  settings.load();

  it('must contain methods', (): void => {
    const router = new RpcRouter;
    const handlers = new RpcHandlers(settings);

    const expectedMethods = [
      GET_ACTIVE_USERAGENT,
    ];

    expectedMethods.forEach((method) => expect(router.hasMethod(method)).toBeFalsy());

    handlers.registerFor(router);

    expectedMethods.forEach((method) => expect(router.hasMethod(method)).toBeTruthy());
  });

  it(`method ${GET_ACTIVE_USERAGENT} works correctly`, (): Promise<void> => {
    const router = new RpcRouter;
    const handlers = new RpcHandlers(settings);

    handlers.registerFor(router);

    /** @see RpcHandlers.getActiveUserAgent */
    return router.handleRequest(new RequestObject(1, GET_ACTIVE_USERAGENT, [1, 2]))
      .then((res) => {
        expect((res as SuccessObject).result).toBe('Foo UA/Mozilla 666.6.1');
      });
  });
});
