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
import {Services} from "@/services/services";

describe('RPC router can', (): void => {
  const proxyHandler: Services.RPC.MethodHandler = (params?: RpcParams): Defined => {
    // proxy request into response
    return params === undefined
      ? null
      : params;
  };

  it('allows to check - method is registered or not?', (): void => {
    expect.assertions(2);

    const router = new RpcRouter;

    expect(router.hasMethod('foo')).toBeFalsy();

    router.on('foo', proxyHandler);

    expect(router.hasMethod('foo')).toBeTruthy();
  });

  it('register and handleRequest request', (): Promise<void> => {
    expect.assertions(2);

    const router = new RpcRouter;
    router.on('foo', proxyHandler);

    return router.handleRequest(new RequestObject(66, 'foo', {bar: 'baz'}))
      .then((response) => {
        const r = response as SuccessObject;

        expect(r.id).toEqual(66);
        expect(r.result).toEqual({bar: 'baz'});
      });
  });

  it('resolve promise without response on notifications', (): Promise<void> => {
    expect.assertions(1);

    const router = new RpcRouter;
    router.on('bar', proxyHandler);

    return router.handleRequest(new NotificationObject('bar', {bar: 'baz'}))
      .then((response) => {
        expect(response).toBeUndefined();
      });
  });

  it('resolve promise on handler error', (): Promise<void> => {
    expect.assertions(1);

    const router = new RpcRouter();

    router.on('bar', (params?: RpcParams): Defined => {
      throw new Error('test error');
    });

    return router.handleRequest(new RequestObject(66, 'bar', {bar: 'baz'}))
      .then((response) => {
        expect((response as ErrorObject).error.message).toEqual('test error');
      });
  });

  it('resolve promise when unknown method requested', (): Promise<void> => {
    expect.assertions(2);

    const router = new RpcRouter();

    return router.handleRequest(new RequestObject(66, 'bar', {bar: 'baz'}))
      .then((response) => {
        const r = response as ErrorObject;

        expect(r.error.message).toEqual('Method not found');
        expect(r.error.code).toEqual(-32601);
      });
  });

  it('resolve promise when unknown method requested (notification sent)', (): Promise<void> => {
    expect.assertions(1);

    const router = new RpcRouter();

    return router.handleRequest(new NotificationObject('bar', {bar: 'baz'}))
      .then((response) => {
        expect(response).toBeUndefined();
      });
  });

  it('handle single raw request', (): Promise<void> => {
    expect.assertions(2);

    const router = new RpcRouter;
    router.on('foo', proxyHandler);

    return router.handleRawRequest({jsonrpc: '2.0', method: 'foo', params: {bar: 'baz'}, id: 66})
      .then((response) => {
        const r = response as SuccessObject;

        expect(r.id).toEqual(66);
        expect(r.result).toEqual({bar: 'baz'});
      });
  });

  it('handle batch raw request', (): Promise<void> => {
    expect.assertions(3);

    const router = new RpcRouter;
    router.on('foo', proxyHandler);

    return router.handleRawRequest([
      {jsonrpc: '2.0', method: 'foo', params: {bar: 'baz'}, id: 66},
      {jsonrpc: '2.0', method: 'foo', params: {baz: 'blah'}, id: 77}
    ])
      .then((responses) => {
        const r = responses as SuccessObject[];

        expect(r).toHaveLength(2);

        const first = r.filter((answer) => answer.id === 66)[0];
        const second = r.filter((answer) => answer.id === 77)[0];

        expect(first.result).toEqual({bar: 'baz'});
        expect(second.result).toEqual({baz: 'blah'});
      });
  });

  it('handle request with named parameters', (): Promise<void> => {
    /**
     * --> {"jsonrpc": "2.0", "method": "subtract", "params": {"subtrahend": 23, "minuend": 42}, "id": 3}
     * <-- {"jsonrpc": "2.0", "result": 19, "id": 3}
     */
    expect.assertions(2);

    const router = new RpcRouter;

    router.on('subtract', (params?: RpcParams): Defined => {
      const p = params as { [key: string]: number };

      return p.minuend - p.subtrahend;
    });

    return router.handleRawRequest(request(3, 'subtract', {"subtrahend": 23, "minuend": 42}))
      .then((response) => {
        const r = response as SuccessObject;

        expect(r.id).toEqual(3);
        expect(r.result).toEqual(19);
      });
  });

  it('handle request typeof Notification', (): Promise<void> => {
    /**
     * --> {"jsonrpc": "2.0", "method": "update", "params": [1,2,3,4,5]}
     */
    expect.assertions(1);

    const router = new RpcRouter;

    router.on('update', (params?: RpcParams): Defined => {
      return 1;
    });

    return router.handleRawRequest(notification('update', [1, 2, 3, 4, 5]))
      .then((response) => {
        expect(response).toBeUndefined();
      });
  });

  it('handle non-existent method', (): Promise<void> => {
    /**
     * --> {"jsonrpc": "2.0", "method": "foobar", "id": "1"}
     * <-- {"jsonrpc": "2.0", "error": {"code": -32601, "message": "Method not found"}, "id": "1"}
     */
    expect.assertions(3);

    const router = new RpcRouter;

    return router.handleRawRequest(request("1", 'foobar'))
      .then((response) => {
        const r = response as ErrorObject;

        expect(r.id).toEqual("1");
        expect(r.error.code).toEqual(-32601);
        expect(r.error.message).toEqual('Method not found');
      });
  });

  it('handle invalid Request object', (): Promise<void> => {
    /**
     * --> {"jsonrpc": "2.0", "method": 1, "params": "bar"}
     * <-- {"jsonrpc": "2.0", "error": {"code": -32600, "message": "Invalid Request"}, "id": null}
     */
    expect.assertions(2);

    const router = new RpcRouter;

    return router.handleRawRequest({jsonrpc: '2.0', method: 1, params: "bar"})
      .then((response) => {
        const r = response as ErrorObject;

        //expect(r.id).toEqual(null); // Issue created: <https://github.com/teambition/jsonrpc-lite/issues/19>
        expect(r.error.code).toEqual(-32600);
        expect(r.error.message).toEqual('Invalid request');
      });
  });

  it('handle empty array', (): Promise<void> => {
    /**
     * --> []
     * <-- {"jsonrpc": "2.0", "error": {"code": -32600, "message": "Invalid Request"}, "id": null}
     */
    expect.assertions(2);

    const router = new RpcRouter;

    return router.handleRawRequest([])
      .then((response) => {
        const r = response as ErrorObject;

        //expect(error.id).toEqual(null); // Issue created: <https://github.com/teambition/jsonrpc-lite/issues/19>
        expect(r.error.code).toEqual(-32600);
        expect(r.error.message).toEqual('Invalid request');
      });
  });

  it('handle invalid Batch (but not empty)', (): Promise<void> => {
    /**
     * --> [1]
     * <-- [
     *   {"jsonrpc": "2.0", "error": {"code": -32600, "message": "Invalid Request"}, "id": null}
     * ]
     */
    expect.assertions(4);

    const router = new RpcRouter;

    return router.handleRawRequest([1])
      .then((response) => {
        const e = response as ErrorObject[];

        expect(e).toHaveLength(1);
        expect(Array.isArray(e)).toEqual(true);

        //expect(error[0].id).toEqual(null); // Issue created: <https://github.com/teambition/jsonrpc-lite/issues/19>
        expect(e[0].error.code).toEqual(-32600);
        expect(e[0].error.message).toEqual('Invalid request');
      });
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

    const router = new RpcRouter;

    return router.handleRawRequest([1, 2, 3])
      .then((response) => {
        const e = response as ErrorObject[];

        expect(e).toHaveLength(3);
        expect(Array.isArray(e)).toEqual(true);

        e.forEach((err) => { // 3 times
          //expect(err.id).toEqual(null); // Issue created: <https://github.com/teambition/jsonrpc-lite/issues/19>
          expect(err.error.code).toEqual(-32600);
          expect(err.error.message).toEqual('Invalid request');
        });
      });
  });

  it('handle with Batch (all notifications)', (): Promise<void> => {
    /**
     * --> [
     *   {"jsonrpc": "2.0", "method": "notify_sum", "params": [1,2,4]},
     *   {"jsonrpc": "2.0", "method": "notify_hello", "params": [7]}
     * ]
     * <-- //Nothing is returned for all notification batches
     */
    expect.assertions(1);

    const router = new RpcRouter;

    router.on('notify_sum', (params?: RpcParams): Defined => {
      return 1;
    });

    router.on('notify_hello', (params?: RpcParams): Defined => {
      return 2;
    });

    return router.handleRawRequest([
      {'jsonrpc': '2.0', 'method': 'notify_sum', 'params': [1, 2, 4]},
      {'jsonrpc': '2.0', 'method': 'notify_hello', 'params': [7]}
    ])
      .then((response) => {
        expect(response).toBeUndefined();
      });
  });

  it('handle with Batch (all notifications)', (): Promise<void> => {
    /**
     * --> [
     *   {"jsonrpc": "2.0", "method": "gen_error", "id": "1"},
     *   {"jsonrpc": "2.0", "method": "gen_error"}
     * ]
     * <-- [
     *   {"jsonrpc": "2.0", "error": {"code": 123, "message": "Some error message"}, "id": "1"},
     * ]
     */
    expect.assertions(3);

    const router = new RpcRouter;

    router.on('gen_error', (params?: RpcParams): Defined => {
      throw new Error('Some error message');
    });

    return router.handleRawRequest([
      {'jsonrpc': '2.0', 'method': 'gen_error', 'id': '1'},
      {'jsonrpc': '2.0', 'method': 'gen_error'}
    ])
      .then((response) => {
        const r = response as Array<ErrorObject>;

        expect(Array.isArray(r)).toEqual(true);
        expect(r).toHaveLength(1);

        expect((r.filter((el) => el.id === '1')[0]).error.message).toEqual('Some error message');
      });
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
    expect.assertions(7);

    const router = new RpcRouter;

    router.on('sum', (params?: RpcParams): Defined => {
      return (params as number[]).reduce((a, b) => a + b);
    });

    router.on('notify_hello', (params?: RpcParams): Defined => {
      return 'hello';
    });

    router.on('subtract', (params?: RpcParams): Defined => {
      const p = params as number[];

      return p[0] - p[1];
    });

    router.on('get_data', (params?: RpcParams): Defined => {
      return ['hello', 5];
    });

    return router.handleRawRequest([
      request('1', 'sum', [1, 2, 4]),
      notification('notify_hello', [7]),
      request('2', 'subtract', [42, 23]),
      {foo: 'boo'},
      request('5', 'foo.get', {'name': 'myself'}),
      request('9', 'get_data'),
    ])
      .then((response) => {
        const r = response as Array<SuccessObject | ErrorObject>;

        expect(r).toHaveLength(5);
        expect(Array.isArray(r)).toEqual(true);

        expect((r.filter((el) => el.id === '1')[0] as SuccessObject).result).toEqual(7);
        expect((r.filter((el) => el.id === '2')[0] as SuccessObject).result).toEqual(19);
        expect((r.filter((el) => el.id === '5')[0] as ErrorObject).error.code).toEqual(-32601);

        // expect((r.filter((el) => el.id === null)[0] as ErrorObject).error.code).toEqual(-32600); // Issue created: <https://github.com/teambition/jsonrpc-lite/issues/19>
        expect((r.filter((el) => el.id === Number.MIN_SAFE_INTEGER)[0] as ErrorObject).error.code).toEqual(-32600);

        expect((r.filter((el) => el.id === '9')[0] as SuccessObject).result).toEqual(["hello", 5]);
      });
  });
});
