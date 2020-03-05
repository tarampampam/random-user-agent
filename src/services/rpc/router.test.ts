import RpcRouter from "@/services/rpc/router";
import {Defined, ErrorObject, NotificationObject, RequestObject, RpcParams, SuccessObject} from "jsonrpc-lite";

describe('RPC router can', (): void => {
  const proxyHandler = (params?: RpcParams): Defined => {
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

  it('handle raw single request', (): Promise<void> => {
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

  it('handle raw batch request', (): Promise<void> => {
    expect.assertions(3);

    const router = new RpcRouter();

    router.on('foo', proxyHandler);

    return router.handleRawRequest([
      {jsonrpc: '2.0', method: 'foo', params: {bar: 'baz'}, id: 66},
      {jsonrpc: '2.0', method: 'foo', params: {baz: 'blah'}, id: 77}
    ])
      .then((response) => {
        const r = response as SuccessObject[];

        expect(r).toHaveLength(2);

        const first = r.filter((answer) => {return answer.id === 66})[0];
        const second = r.filter((answer) => {return answer.id === 77})[0];

        expect(first.result).toEqual({bar: 'baz'});
        expect(second.result).toEqual({baz: 'blah'});
      })
      .catch((error) => {
        fail(new Error('.catch must not be called: ' + error));
      })
  });
});
