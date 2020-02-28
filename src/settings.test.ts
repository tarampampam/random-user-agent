import Settings, {GeneratorType} from "@/settings";

/**
 * Generates random string.
 */
const generateRandomString = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

describe('settings', () => {
  const storageMock = new class implements Services.Storage {
    clear(): Promise<void> {
      return new Promise((): void => {});
    }

    get(key: string): Promise<{ [p: string]: any }> {
      return new Promise((): void => {});
    }

    set(key: string, value: { [p: string]: any }): Promise<void> {
      return new Promise((): void => {});
    }
  };

  let settings = new Settings(storageMock);

  it('has correct storage key', (): void => {
    expect(settings.getStorageKey()).toEqual('extension_settings_v2');
  });

  it('has getters and setters', (): void => {
    [true, false].forEach((value: boolean) => {
      settings.setEnabled(value);
      expect(settings.isEnabled()).toEqual(value);

      settings.setRenewalEnabled(value);
      expect(settings.isRenewalEnabled()).toEqual(value);

      settings.setRenewalOnStartupEnabled(value);
      expect(settings.isRenewalOnStartupEnabled()).toEqual(value);

      settings.setSynchronizationEnabled(value);
      expect(settings.isSynchronizationEnabled()).toEqual(value);

      settings.setCustomUserAgentEnabled(value);
      expect(settings.isCustomUserAgentEnabled()).toEqual(value);

      settings.setJavascriptProtectionEnabled(value);
      expect(settings.isJavascriptProtectionEnabled()).toEqual(value);
    });

    [generateRandomString(), null].forEach((value: string | null) => {
      settings.setUserAgent(value);
      expect(settings.getUserAgent()).toEqual(value);

      settings.setCustomUserAgent(value);
      expect(settings.getCustomUserAgent()).toEqual(value);
    });

    [Math.random()].forEach((value: number) => {
      settings.setRenewalIntervalMs(value);
      expect(settings.getRenewalIntervalMs()).toEqual(value);
    });

    [[generateRandomString()], [generateRandomString(), generateRandomString()], []].forEach((value: string[]) => {
      settings.setCustomUserAgentsList(value);
      expect(settings.getCustomUserAgentsList()).toEqual(value);

      settings.setExceptionsList(value);
      expect(settings.getExceptionsList()).toEqual(value);
    });

    [['chrome_win'], ['chrome_mac', 'chrome_linux'], ['firefox_win', 'firefox_mac', 'firefox_linux']].forEach((value: string[]) => {
      settings.setGeneratorTypes(value as GeneratorType[]);
      expect(settings.getGeneratorTypes()).toEqual(value);
    });

    expect(settings.getBugReportLink()).toMatch(/https?:\/\//);
    expect(settings.getDonationLink()).toMatch(/https?:\/\//);
  })
});
