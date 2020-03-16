/**
 * @jest-environment node
 */

import Chrome from "@/services/version/chrome";

describe('it can', (): void => {
  it('resolve latest version', (): Promise<void> => {
    return Chrome.latest()
      .then((version) => {
        expect(version.major).toBeGreaterThanOrEqual(80);
        expect(version.minor).toBeGreaterThanOrEqual(0);
        expect(version.patch).toBeGreaterThan(1);
        expect(version.build).toMatch(/\d+/);
      })
  });
});
