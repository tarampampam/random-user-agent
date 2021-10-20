import {mobileVendor, randomChromeVersion} from './versions'

test('randomChromeVersion', async () => {
  for (let i = 0; i < 30; i++) {
    expect(randomChromeVersion.version()).toMatch(/\d{2,3}\.0\.\d{4}\.\d{2,3}/)
  }
})

test('mobileVendor', async () => {
  for (let i = 0; i < 30; i++) {
    expect(mobileVendor.version().length).toBeGreaterThanOrEqual(2)
  }
})
