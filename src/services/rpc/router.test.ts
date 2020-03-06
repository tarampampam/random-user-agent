import RpcRouter from "@/services/rpc/router";
import {
  Defined,
  ErrorObject,
  notification,
  NotificationObject,
  request,
  RequestObject,
  RpcParams,
  SuccessObject
} from "jsonrpc-lite";
import {RouteHandler} from "@/services/irpc";

describe('RPC router can', (): void => {
  const proxyHandler: RouteHandler = (params?: RpcParams): Defined => {
    // proxy request into response
    return params === undefined
      ? null
      : params;
  };

  it('register and handleRequest request', (): Promise<void> => {
    expect.assertions(2);

    const router = new RpcRouter();

    router.on('foo', proxyHandler);

    return router.handleRequest(new RequestObject(66, 'foo', {bar: 'baz'}))
      .then((response) => {
        expect(response.id).toEqual(66);
        expect(response.result).toEqual({bar: 'baz'});
      })
      .catch((error: ErrorObject) => {
        fail(new Error('.catch must not be called: ' + error.error.message));
      })
  });

  it('resolve promise without response on notifications', (): Promise<void> => {
    expect.assertions(1);

    const router = new RpcRouter();

    router.on('bar', proxyHandler);

    return router.handleRequest(new NotificationObject('bar', {bar: 'baz'}))
      .then((response) => {
        expect(response).toBeUndefined();
      })
      .catch((error: ErrorObject) => {
        fail(new Error('.catch must not be called: ' + error.error.message));
      })
  });

  it('reject promise on handler error', (): Promise<void> => {
    expect.assertions(1);

    const router = new RpcRouter();

    router.on('bar', (params?: RpcParams): Defined => {
      throw new Error('test error');
    });

    return router.handleRequest(new RequestObject(66, 'bar', {bar: 'baz'}))
      .then((response) => {
        fail(new Error('.then must not be called'));
      })
      .catch((error: ErrorObject) => {
        expect(error.error.message).toEqual('test error');
      })
  });

  it('reject promise when unknown method requested', (): Promise<void> => {
    expect.assertions(2);

    const router = new RpcRouter();

    return router.handleRequest(new RequestObject(66, 'bar', {bar: 'baz'}))
      .then((response) => {
        fail(new Error('.then must not be called'));
      })
      .catch((error: ErrorObject) => {
        expect(error.error.message).toEqual('Method not found');
        expect(error.error.code).toEqual(-32601);
      })
  });

  it('reject promise when unknown method requested (notification sent)', (): Promise<void> => {
    expect.assertions(1);

    const router = new RpcRouter();

    return router.handleRequest(new NotificationObject('bar', {bar: 'baz'}))
      .then((response) => {
        fail(new Error('.then must not be called'));
      })
      .catch((error: ErrorObject) => {
        expect(error).toBeUndefined();
      })
  });

  it('handle single raw request', (): Promise<void> => {
    expect.assertions(2);

    const router = new RpcRouter();

    router.on('foo', proxyHandler);

    return router.handleRawRequest({jsonrpc: '2.0', method: 'foo', params: {bar: 'baz'}, id: 66})
      .then((response) => {
        const r = response as SuccessObject;

        expect(r.id).toEqual(66);
        expect(r.result).toEqual({bar: 'baz'});
      })
      .catch((error) => {
        fail(new Error('.catch must not be called: ' + error));
      })
  });

  it('handle batch raw request', (): Promise<void> => {
    expect.assertions(3);

    const router = new RpcRouter();

    router.on('foo', proxyHandler);

    return router.handleRawRequest([
      {jsonrpc: '2.0', method: 'foo', params: {bar: 'baz'}, id: 66},
      {jsonrpc: '2.0', method: 'foo', params: {baz: 'blah'}, id: 77}
    ])
      .then((responses) => {
        const r = responses as SuccessObject[];

        expect(r).toHaveLength(2);

        const first = r.filter((answer) => {
          return answer.id === 66
        })[0];
        const second = r.filter((answer) => {
          return answer.id === 77
        })[0];

        expect(first.result).toEqual({bar: 'baz'});
        expect(second.result).toEqual({baz: 'blah'});
      })
      .catch((error) => {
        fail(new Error('.catch must not be called: ' + error));
      })
  });

  it('handle request with named parameters', (): Promise<void> => {
    /**
     * --> {"jsonrpc": "2.0", "method": "subtract", "params": {"subtrahend": 23, "minuend": 42}, "id": 3}
     * <-- {"jsonrpc": "2.0", "result": 19, "id": 3}
     */
    expect.assertions(2);

    const router = new RpcRouter();

    router.on('subtract', (params?: RpcParams): Defined => {
      const p = params as { [key: string]: number };

      return p.minuend - p.subtrahend;
    });

    return router.handleRawRequest(request(3, 'subtract', {"subtrahend": 23, "minuend": 42}))
      .then((response) => {
        const r = response as SuccessObject;

        expect(r.id).toEqual(3);
        expect(r.result).toEqual(19);
      })
      .catch((error) => {
        fail(new Error('.catch must not be called: ' + error));
      })
  });

  it('handle request typeof Notification', (): Promise<void> => {
    /**
     * --> {"jsonrpc": "2.0", "method": "update", "params": [1,2,3,4,5]}
     */
    expect.assertions(1);

    const router = new RpcRouter();

    router.on('update', (params?: RpcParams): Defined => {
      return 1;
    });

    return router.handleRawRequest(notification('update', [1, 2, 3, 4, 5]))
      .then((response) => {
        expect(response).toBeUndefined();
      })
      .catch((error) => {
        fail(new Error('.catch must not be called: ' + error));
      })
  });

  it('handle non-existent method', (): Promise<void> => {
    /**
     * --> {"jsonrpc": "2.0", "method": "foobar", "id": "1"}
     * <-- {"jsonrpc": "2.0", "error": {"code": -32601, "message": "Method not found"}, "id": "1"}
     */
    expect.assertions(3);

    const router = new RpcRouter();

    return router.handleRawRequest(request("1", 'foobar'))
      .then((response) => {
        fail(new Error('.then must not be called'));
      })
      .catch((error: ErrorObject) => {
        expect(error.id).toEqual("1");
        expect(error.error.code).toEqual(-32601);
        expect(error.error.message).toEqual('Method not found');
      })
  });

  it('handle invalid Request object', (): Promise<void> => {
    /**
     * --> {"jsonrpc": "2.0", "method": 1, "params": "bar"}
     * <-- {"jsonrpc": "2.0", "error": {"code": -32600, "message": "Invalid Request"}, "id": null}
     */
    expect.assertions(2);

    const router = new RpcRouter();

    return router.handleRawRequest({jsonrpc: '2.0', method: 1, params: "bar"})
      .then((response) => {
        fail(new Error('.then must not be called'));
      })
      .catch((error: ErrorObject) => {
        //expect(error.id).toEqual(null); // Issue created: <https://github.com/teambition/jsonrpc-lite/issues/19>
        expect(error.error.code).toEqual(-32600);
        expect(error.error.message).toEqual('Invalid request');
      })
  });

  it('handle empty array', (): Promise<void> => {
    /**
     * --> []
     * <-- {"jsonrpc": "2.0", "error": {"code": -32600, "message": "Invalid Request"}, "id": null}
     */
    expect.assertions(2);

    const router = new RpcRouter();

    return router.handleRawRequest([])
      .then((response) => {
        fail(new Error('.then must not be called'));
      })
      .catch((error: ErrorObject) => {
        //expect(error.id).toEqual(null); // Issue created: <https://github.com/teambition/jsonrpc-lite/issues/19>
        expect(error.error.code).toEqual(-32600);
        expect(error.error.message).toEqual('Invalid request');
      })
  });

  it('handle invalid Batch (but not empty)', (): Promise<void> => {
    /**
     * --> [1]
     * <-- [
     *   {"jsonrpc": "2.0", "error": {"code": -32600, "message": "Invalid Request"}, "id": null}
     * ]
     */
    expect.assertions(4);

    const router = new RpcRouter();

    return router.handleRawRequest([1])
      .then((response) => {
        fail(new Error('.then must not be called'));
      })
      .catch((error) => {
        const e = error as ErrorObject[];

        expect(e).toHaveLength(1);
        expect(Array.isArray(e)).toEqual(true);

        //expect(error[0].id).toEqual(null); // Issue created: <https://github.com/teambition/jsonrpc-lite/issues/19>
        expect(e[0].error.code).toEqual(-32600);
        expect(e[0].error.message).toEqual('Invalid request');
      })
  });

  it('handle with invalid Batch', (): Promise<void> => {
    /**
     * --> [1,2,3]
     * <-- [
     *   {"jsonrpc": "2.0", "error": {"code": -32600, "message": "Invalid Request"}, "id": null},
     *   {"jsonrpc": "2.0", "error": {"code": -32600, "message": "Invalid Request"}, "id": null},
     *   {"jsonrpc": "2.0", "error": {"code": -32600, "message": "Invalid Request"}, "id": null}
     * ]
     */
    expect.assertions(8);

    const router = new RpcRouter();

    return router.handleRawRequest([1, 2, 3])
      .then((response) => {
        fail(new Error('.then must not be called'));
      })
      .catch((error) => {
        const e = error as ErrorObject[];

        expect(e).toHaveLength(3);
        expect(Array.isArray(e)).toEqual(true);

        e.forEach((err) => { // 3 times
          //expect(err.id).toEqual(null); // Issue created: <https://github.com/teambition/jsonrpc-lite/issues/19>
          expect(err.error.code).toEqual(-32600);
          expect(err.error.message).toEqual('Invalid request');
        });
      })
  });

  it('handle Batch', (): Promise<void> => {
    /**
     * --> [
     *   {"jsonrpc": "2.0", "method": "sum", "params": [1,2,4], "id": "1"},
     *   {"jsonrpc": "2.0", "method": "notify_hello", "params": [7]},
     *   {"jsonrpc": "2.0", "method": "subtract", "params": [42,23], "id": "2"},
     *   {"foo": "boo"},
     *   {"jsonrpc": "2.0", "method": "foo.get", "params": {"name": "myself"}, "id": "5"},
     *   {"jsonrpc": "2.0", "method": "get_data", "id": "9"}
     * ]
     * <-- [
     *   {"jsonrpc": "2.0", "result": 7, "id": "1"},
     *   {"jsonrpc": "2.0", "result": 19, "id": "2"},
     *   {"jsonrpc": "2.0", "error": {"code": -32600, "message": "Invalid Request"}, "id": null},
     *   {"jsonrpc": "2.0", "error": {"code": -32601, "message": "Method not found"}, "id": "5"},
     *   {"jsonrpc": "2.0", "result": ["hello", 5], "id": "9"}
     * ]
     */
    expect.assertions(4);

    const router = new RpcRouter();

    router.on('sum', (params?: RpcParams): Defined => {
      return (params as number[]).reduce((a, b) => a + b);
    });

    router.on('notify_hello', (params?: RpcParams): Defined => {
      return 'hello';
    });

    router.on('subtract', (params?: RpcParams): Defined => {
      const p = params as number[];

      return p[1] - p[0];
    });

    router.on('get_data', (params?: RpcParams): Defined => {
      return ['hello', 5];
    });

    return router.handleRawRequest([
      request("1", "sum", [1, 2, 4]),
      notification("notify_hello", [7]),
      request("2", "subtract", [42, 23]),
      {"foo": "boo"},
      request("5", "foo.get", {"name": "myself"}),
      request("9", "get_data"),

    ])
      .then((response) => {
        const r = response as SuccessObject[];

        expect(r).toHaveLength(3);
        expect(Array.isArray(r)).toEqual(true);

        console.log(r);
      }, )
      .catch((error) => {
        const e = error as ErrorObject[];

        expect(e).toHaveLength(2);
        expect(Array.isArray(e)).toEqual(true);
      })
  });
});
