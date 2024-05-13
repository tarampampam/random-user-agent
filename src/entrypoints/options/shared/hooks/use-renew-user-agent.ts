import { useCallback } from 'react'
import { send } from '~/shared/messaging'

/** Renew the user agent */
export default function (): () => Promise<string> {
  return useCallback(async (): Promise<string> => {
    const { renewUserAgent } = await send({ renewUserAgent: undefined })

    if (renewUserAgent instanceof Error) {
      throw renewUserAgent
    }

    return renewUserAgent
  }, [])
}
