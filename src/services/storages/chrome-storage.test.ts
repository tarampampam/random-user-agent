import ChromeStorage from "./chrome-storage";

describe('chrome storage (using chrome.storage.local)', () => {
  let chromeStorage = new ChromeStorage(false);

  it('can set without runtime error', () => {
    expect.assertions(1);

    const set = jest.fn().mockImplementation((_, callback: Function) => {
      callback();
    });

    (global as any).chrome = {
      storage: {
        local: {
          set
        }
      },
      runtime: {
        lastError: undefined,
      },
    };

    return chromeStorage.set('foo', {bar: 'baz'})
      .then(() => {
        expect(set).toHaveBeenCalledWith({foo: {bar: 'baz'}}, expect.any(Function));
      })
  });

  it('set with runtime rejects promise', () => {
    expect.assertions(1);

    const set = jest.fn().mockImplementation((_, callback: Function) => {
      callback();
    });

    (global as any).chrome = {
      storage: {
        local: {
          set
        }
      },
      runtime: {
        lastError: chrome.runtime.lastError = {
          message: 'test runtime error'
        },
      },
    };

    return chromeStorage.set('foo', {bar: 'baz'})
      .then(() => {
        throw new Error('.then must not be called');
      })
      .catch((error: Error) => {
        expect(error.message).toEqual('test runtime error');
      })
  });
});
