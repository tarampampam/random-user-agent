import { RemoteUserAgentList } from '../persistent'

export default async function (
  remote: RemoteUserAgentList,
  clearBefore?: boolean
): Promise<
  Readonly<{
    url: string
    gotListSize: number
  }>
> {
  if (!remote.url) {
    throw new Error('Remote list URL is not set')
  }

  if (clearBefore) {
    await remote.clear()
  }

  await remote.update()

  return Object.freeze({
    url: remote.url.toString(),
    gotListSize: (await remote.get(false))?.length || 0,
  })
}
