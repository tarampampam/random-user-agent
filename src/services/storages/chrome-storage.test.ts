import ChromeStorage from "./chrome-storage";

/**
 * Set `chrome.runtime.lastError` (just for a tests).
 *
 * @param {string | undefined} errorMessage
 */
const setLastRuntimeError = (errorMessage: string | undefined): void => {
  let error = undefined;

  if (typeof errorMessage === 'string') {
    error = <chrome.runtime.LastError>{message: errorMessage};
  }

  (global as any).chrome = {...(global as any).chrome, ...{runtime: {lastError: error}}};
};

describe('chrome storage (using chrome.storage.LOCAL)', (): void => {
  const chromeStorage = new ChromeStorage(false); // <-- `false` is important!

  it('can set (without runtime error)', (): Promise<void> => {
    expect.assertions(1);

    const set = jest.fn().mockImplementation((_: any, callback: Function) => {
      callback();
    });

    (global as any).chrome = {storage: {local: {set}}};
    setLastRuntimeError(undefined);

    return chromeStorage.set('foo', {bar: 'baz'})
      .then(() => {
        expect(set).toHaveBeenCalledWith({foo: {bar: 'baz'}}, expect.any(Function));
      })
  });

  it('cannot set (with runtime error) - it rejects promise', (): Promise<void> => {
    expect.assertions(1);

    (global as any).chrome = {
      storage: {
        local: {
          set: jest.fn().mockImplementation((_: any, callback: Function) => {
            callback();
          })
        }
      },
    };
    setLastRuntimeError('test runtime error');

    return chromeStorage.set('foo', {bar: 'baz'})
      .then(() => {
        fail(new Error('.then must not be called'));
      })
      .catch((error: Error) => {
        expect(error.message).toEqual('test runtime error');
      })
  });

  it('can get (without runtime error)', (): Promise<void> => {
    expect.assertions(1);

    (global as any).chrome = {
      storage: {
        local: {
          get: jest.fn().mockImplementation((_: any, callback: Function) => {
            callback({foo: {bar: 'baz'}});
          })
        }
      }
    };
    setLastRuntimeError(undefined);

    return chromeStorage.get('foo')
      .then((value) => {
        expect(value).toEqual({bar: 'baz'});
      })
  });

  it('cannot get with (with runtime error) - it rejects promise', (): Promise<void> => {
    expect.assertions(1);

    (global as any).chrome = {
      storage: {
        local: {
          get: jest.fn().mockImplementation((_: any, callback: Function) => callback())
        }
      }
    };
    setLastRuntimeError('test runtime error');

    return chromeStorage.get('foo')
      .then(() => {
        fail(new Error('.then must not be called'));
      })
      .catch((error: Error) => {
        expect(error.message).toEqual('test runtime error');
      })
  });

  it('cannot get (without runtime error, but without required key) - it rejects promise', (): Promise<void> => {
    expect.assertions(1);

    (global as any).chrome = {
      storage: {
        local: {
          get: jest.fn().mockImplementation((_: any, callback: Function) => {
            callback({blah: {bar: 'baz'}});
          })
        }
      }
    };
    setLastRuntimeError(undefined);

    return chromeStorage.get('foo')
      .then(() => {
        fail(new Error('.then must not be called'));
      })
      .catch((error: Error) => {
        expect(error.message).toEqual('Storage does not contains expected data');
      })
  });

  it('can clear (without runtime error)', (): Promise<void> => {
    expect.assertions(1);

    const clear = jest.fn().mockImplementation((callback: Function) => {
      callback();
    });

    (global as any).chrome = {storage: {local: {clear}}};
    setLastRuntimeError(undefined);

    return chromeStorage.clear()
      .then(() => {
        expect(clear).toHaveBeenCalledWith(expect.any(Function));
      })
  });

  it('cannot clear (with runtime error) - it rejects promise', (): Promise<void> => {
    expect.assertions(1);

    (global as any).chrome = {
      storage: {
        local: {
          clear: jest.fn().mockImplementation((callback: Function) => {
            callback();
          })
        }
      },
    };
    setLastRuntimeError('test runtime error');

    return chromeStorage.clear()
      .then(() => {
        fail(new Error('.then must not be called'));
      })
      .catch((error: Error) => {
        expect(error.message).toEqual('test runtime error');
      })
  });
});

describe('chrome storage (using chrome.storage.SYNC)', (): void => {
  const chromeStorage = new ChromeStorage(true); // <-- `true` is important!

  it('can set (without runtime error)', (): Promise<void> => {
    expect.assertions(1);

    const set = jest.fn().mockImplementation((_: any, callback: Function) => {
      callback();
    });

    (global as any).chrome = {storage: {sync: {set}}};
    setLastRuntimeError(undefined);

    return chromeStorage.set('foo', {bar: 'baz'})
      .then(() => {
        expect(set).toHaveBeenCalledWith({foo: {bar: 'baz'}}, expect.any(Function));
      })
  });

  it('can set (with runtime error) - it uses local storage as fallback', (): Promise<void> => {
    expect.assertions(2);

    const syncSet = jest.fn().mockImplementation((_: any, callback: Function) => {
      callback({bar: 'baz'});
    });

    const localSet = jest.fn().mockImplementation((_: any, callback: Function) => {
      setLastRuntimeError(undefined);

      callback({bar: 'baz'});
    });

    (global as any).chrome = {
      storage: {
        sync: {
          set: syncSet
        },
        local: {
          set: localSet
        }
      },
    };
    setLastRuntimeError('test runtime error');

    return chromeStorage.set('foo', {bar: 'baz'})
      .then(() => {
        expect(syncSet).toHaveBeenCalledWith({foo: {bar: 'baz'}}, expect.any(Function));
        expect(localSet).toHaveBeenCalledWith({foo: {bar: 'baz'}}, expect.any(Function));
      })
      .catch((error: Error) => {
        fail(new Error('.catch must not be called: ' + error.message));
      })
  });

  it('cannot can set (with runtime error on local and sync storage) - it rejects promise', (): Promise<void> => {
    expect.assertions(1);

    (global as any).chrome = {
      storage: {
        sync: {
          set: jest.fn().mockImplementation((_: any, callback: Function) => {
            callback();
          })
        },
        local: {
          set: jest.fn().mockImplementation((_: any, callback: Function) => {
            setLastRuntimeError('another runtime error');
            callback();
          })
        }
      },
    };
    setLastRuntimeError('test runtime error');

    return chromeStorage.set('foo', {bar: 'baz'})
      .then(() => {
        fail(new Error('.then must not be called'));
      })
      .catch((error: Error) => {
        expect(error.message).toEqual('another runtime error');
      })
  });

  it('can get (without runtime error)', (): Promise<void> => {
    expect.assertions(1);

    (global as any).chrome = {
      storage: {
        sync: {
          get: jest.fn().mockImplementation((_: any, callback: Function) => {
            callback({foo: {bar: 'baz'}});
          })
        }
      },
    };
    setLastRuntimeError(undefined);

    return chromeStorage.get('foo')
      .then((value) => {
        expect(value).toEqual({bar: 'baz'});
      })
  });

  it('can get (with runtime error) - it uses local storage as fallback', (): Promise<void> => {
    expect.assertions(1);

    (global as any).chrome = {
      storage: {
        sync: {
          get: jest.fn().mockImplementation((_: any, callback: Function) => {
            callback();
          })
        }, local: {
          get: jest.fn().mockImplementation((_: any, callback: Function) => {
            setLastRuntimeError(undefined);

            callback({foo: {bar: 'baz'}});
          })
        }
      },
    };
    setLastRuntimeError('test runtime error');

    return chromeStorage.get('foo')
      .then((value) => {
        expect(value).toEqual({bar: 'baz'});
      })
      .catch((error: Error) => {
        fail(new Error('.catch must not be called: ' + error.message));
      })
  });

  it('cannot get (with runtime error on local and sync storage) - it rejects promise', (): Promise<void> => {
    expect.assertions(1);

    (global as any).chrome = {
      storage: {
        sync: {
          get: jest.fn().mockImplementation((_: any, callback: Function) => {
            callback();
          })
        },
        local: {
          get: jest.fn().mockImplementation((_: any, callback: Function) => {
            callback({foo: {bar: 'baz'}});
          })
        }
      },
    };
    setLastRuntimeError('test runtime error');

    return chromeStorage.get('foo')
      .then(() => {
        fail(new Error('.then must not be called'));
      })
      .catch((error: Error) => {
        expect(error.message).toEqual('test runtime error');
      })
  });

  it('cannot get (without runtime error, but without required key) - it rejects promise', (): Promise<void> => {
    expect.assertions(1);

    (global as any).chrome = {
      storage: {
        sync: {
          get: jest.fn().mockImplementation((_: any, callback: Function) => {
            callback();
          })
        },
        local: {
          get: jest.fn().mockImplementation((_: any, callback: Function) => {
            setLastRuntimeError(undefined);

            callback({blah: {bar: 'baz'}});
          })
        }
      }
    };
    setLastRuntimeError('test runtime error');

    return chromeStorage.get('foo')
      .then(() => {
        fail(new Error('.then must not be called'));
      })
      .catch((error: Error) => {
        expect(error.message).toEqual('Local storage does not contains expected data');
      })
  });

  it('can clear (without runtime error)', (): Promise<void> => {
    expect.assertions(1);

    const clear = jest.fn().mockImplementation((callback: Function) => {
      callback();
    });

    (global as any).chrome = {storage: {sync: {clear}}};
    setLastRuntimeError(undefined);

    return chromeStorage.clear()
      .then(() => {
        expect(clear).toHaveBeenCalledWith(expect.any(Function));
      })
  });

  it('cannot clear (with runtime error) - it rejects promise', (): Promise<void> => {
    expect.assertions(1);

    (global as any).chrome = {
      storage: {
        sync: {
          clear: jest.fn().mockImplementation((callback: Function) => callback())
        }, local: {
          clear: jest.fn().mockImplementation((callback: Function) => callback())
        }
      }
    };
    setLastRuntimeError('test runtime error');

    return chromeStorage.clear()
      .then(() => {
        fail(new Error('.then must not be called'));
      })
      .catch((error: Error) => {
        expect(error.message).toEqual('test runtime error');
      })
  });

  it('can clear (with runtime error) - it uses local storage as fallback', (): Promise<void> => {
    expect.assertions(2);

    const localClear = jest.fn().mockImplementation((callback: Function) => {
      setLastRuntimeError(undefined);

      callback();
    });

    const syncClear = jest.fn().mockImplementation((callback: Function) => {
      callback();
    });

    (global as any).chrome = {storage: {sync: {clear: syncClear}, local: {clear: localClear}}};
    setLastRuntimeError('test runtime error');

    return chromeStorage.clear()
      .then(() => {
        expect(localClear).toHaveBeenCalledWith(expect.any(Function));
        expect(syncClear).toHaveBeenCalledWith(expect.any(Function));
      })
      .catch((error: Error) => {
        fail(new Error('.catch must not be called: ' + error.message));
      })
  });
});

describe('chrome storage changes preferred storage', (): void => {
  it('local changes to sync', (): Promise<void> => {
    expect.assertions(2);

    const chromeStorage = new ChromeStorage(false);

    const syncClear = jest.fn().mockImplementation((callback: Function) => callback());
    const localClear = jest.fn().mockImplementation((callback: Function) => callback());

    (global as any).chrome = {storage: {sync: {clear: syncClear}, local: {clear: localClear}}};
    setLastRuntimeError(undefined);

    return chromeStorage.clear()
      .then(() => {
        expect(localClear).toHaveBeenCalledWith(expect.any(Function));

        chromeStorage.setPreferSyncStorage(true);

        chromeStorage.clear()
          .then(() => {
            expect(syncClear).toHaveBeenCalledWith(expect.any(Function));
          })
          .catch((error: Error) => {
            fail(new Error('.catch after changing preferred storage must not be called: ' + error.message));
          })
      })
      .catch((error: Error) => {
        fail(new Error('.catch must not be called: ' + error.message));
      })
  });

  it('local sync to local', (): Promise<void> => {
    expect.assertions(2);

    const chromeStorage = new ChromeStorage(true);

    const syncClear = jest.fn().mockImplementation((callback: Function) => callback());
    const localClear = jest.fn().mockImplementation((callback: Function) => callback());

    (global as any).chrome = {storage: {sync: {clear: syncClear}, local: {clear: localClear}}};
    setLastRuntimeError(undefined);

    return chromeStorage.clear()
      .then(() => {
        expect(syncClear).toHaveBeenCalledWith(expect.any(Function));

        chromeStorage.setPreferSyncStorage(false);

        chromeStorage.clear()
          .then(() => {
            expect(localClear).toHaveBeenCalledWith(expect.any(Function));
          })
          .catch((error: Error) => {
            fail(new Error('.catch after changing preferred storage must not be called: ' + error.message));
          })
      })
      .catch((error: Error) => {
        fail(new Error('.catch must not be called: ' + error.message));
      })
  })
});
