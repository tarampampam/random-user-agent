import RemoteList from './remote-list'
import fetchMock from 'jest-fetch-mock'

beforeEach(() => {
  fetchMock.doMock() // docs: <https://www.npmjs.com/package/jest-fetch-mock>
})

describe('RemoteList', () => {
  test('getting', async () => {
    const list = new RemoteList('https://httpbin.org/encoding/utf8')

    await list.update()

    const lines = list.get()

    expect(lines.length).toBeGreaterThan(1)
    expect(lines[0]).toContain('Unicode Demo')

    lines.forEach(line => {
      expect(line.trim().length).toBeGreaterThanOrEqual(1)
    })

    let last = list.getRandom()

    for (let i = 0; i < 30; i++) {
      const current = list.getRandom()
      expect(current).not.toEqual(last)

      last = current
    }
  })

  test('wrong response code', async () => {
    await expect(async () => {
      await new RemoteList('https://httpbin.org/status/404').update()
    }).rejects.toThrowError(Error)
  })
})


