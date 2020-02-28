import ChromeStorage from "./chrome-storage";

describe('chrome storage (using chrome.storage.local)', () => {
  let chromeStorage = new ChromeStorage(false);

  it('can set without runtime error', () => {
    expect.assertions(1);

    const set = jest.fn().mockImplementation((_, callback: Function) => {
      callback();
    });

    (global as any).chrome = {
      storage: {local: {set}},
      runtime: {lastError: undefined},
    };

    return chromeStorage.set('foo', {bar: 'baz'})
      .then(() => {
        expect(set).toHaveBeenCalledWith({foo: {bar: 'baz'}}, expect.any(Function));
      })
  });

  it('set with runtime error rejects promise', () => {
    expect.assertions(1);

    const set = jest.fn().mockImplementation((_, callback: Function) => {
      callback();
    });

    (global as any).chrome = {
      storage: {local: {set}},
      runtime: {lastError: chrome.runtime.lastError = {message: 'test runtime error'}},
    };

    return chromeStorage.set('foo', {bar: 'baz'})
      .then(() => {
        throw new Error('.then must not be called');
      })
      .catch((error: Error) => {
        expect(error.message).toEqual('test runtime error');
      })
  });

  it('can get without runtime error', () => {
    expect.assertions(1);

    const get = jest.fn().mockImplementation((_, callback: Function) => {
      callback({foo: {bar: 'baz'}});
    });

    (global as any).chrome = {
      storage: {local: {get}},
      runtime: {lastError: undefined},
    };

    return chromeStorage.get('foo')
      .then((value) => {
        expect(value).toEqual({bar: 'baz'});
      })
  });

  it('get with runtime error rejects promise', () => {
    expect.assertions(1);

    const get = jest.fn().mockImplementation((_, callback: Function) => {
      callback();
    });

    (global as any).chrome = {
      storage: {local: {get}},
      runtime: {lastError: chrome.runtime.lastError = {message: 'test runtime error'}},
    };

    return chromeStorage.get('foo')
      .then(() => {
        throw new Error('.then must not be called');
      })
      .catch((error: Error) => {
        expect(error.message).toEqual('test runtime error');
      })
  });

  it('get without runtime error but without required key rejects promise', () => {
    expect.assertions(1);

    const get = jest.fn().mockImplementation((_, callback: Function) => {
      callback({blah: {bar: 'baz'}});
    });

    (global as any).chrome = {
      storage: {local: {get}},
      runtime: {lastError: undefined},
    };

    return chromeStorage.get('foo')
      .then(() => {
        throw new Error('.then must not be called');
      })
      .catch((error: Error) => {
        expect(error.message).toEqual('Storage does not contains expected data');
      })
  });

  it('can clear without runtime error', () => {
    expect.assertions(1);

    const clear = jest.fn().mockImplementation((callback: Function) => {
      callback();
    });

    (global as any).chrome = {
      storage: {local: {clear}},
      runtime: {lastError: undefined},
    };

    return chromeStorage.clear()
      .then(() => {
        expect(clear).toHaveBeenCalledWith(expect.any(Function));
      })
  });

  it('clear with runtime error rejects promise', () => {
    expect.assertions(1);

    const clear = jest.fn().mockImplementation((callback: Function) => {
      callback();
    });

    (global as any).chrome = {
      storage: {local: {clear}},
      runtime: {lastError: chrome.runtime.lastError = {message: 'test runtime error'}},
    };

    return chromeStorage.clear()
      .then(() => {
        throw new Error('.then must not be called');
      })
      .catch((error: Error) => {
        expect(error.message).toEqual('test runtime error');
      })
  });
});
