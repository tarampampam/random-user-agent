import {randomChromeVersion, randomEdgeVersion, randomOperaVersion, randomSafariVersion} from './versions'

test('randomChromeVersion', async () => {
  for (let i = 0; i < 30; i++) {
    expect(randomChromeVersion.version()).toMatch(/\d{2,3}\.0\.\d{4}\.\d{2,3}/)
  }
})

test('randomOperaVersion', async () => {
  for (let i = 0; i < 30; i++) {
    expect(randomOperaVersion.version()).toMatch(/\d{2,3}\.0\.\d{4}\.\d{2,3}/)
  }
})

test('randomSafariVersion', async () => {
  for (let i = 0; i < 30; i++) {
    expect(randomSafariVersion.version()).toMatch(/\d{3}\.\d{1,2}(\.\d{1,2}|)/)
  }
})

test('randomEdgeVersion', async () => {
  for (let i = 0; i < 30; i++) {
    expect(randomEdgeVersion.version()).toMatch(/\d{2}\.0\.\d{3,4}\.\d{1,3}/)
  }
})
