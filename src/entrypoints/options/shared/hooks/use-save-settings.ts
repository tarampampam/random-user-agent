import { useCallback, useRef } from 'react'
import { send } from '~/shared/messaging'
import type { PartialSettingsState, ReadonlySettingsState } from '~/shared/types'

/** Save the settings with throttle */
export default function (): (settings: PartialSettingsState, throttle?: number) => Promise<ReadonlySettingsState> {
  // the timer us used to throttle the save operations
  const saveTimer = useRef<NodeJS.Timeout>()

  return useCallback((settings: PartialSettingsState, throttle: number = 400): Promise<ReadonlySettingsState> => {
    return new Promise((resolve: (_: ReadonlySettingsState) => void, reject: (_: Error) => void) => {
      if (saveTimer.current) {
        clearTimeout(saveTimer.current) // remove the previous timer
      }

      saveTimer.current = setTimeout(async () => {
        const { updateSettings } = await send({ updateSettings: [settings] })

        if (updateSettings instanceof Error) {
          return reject(updateSettings)
        }

        if (saveTimer.current) {
          clearTimeout(saveTimer.current) // clear the timer
        }

        saveTimer.current = undefined // unset the reference

        return resolve(updateSettings)
      }, throttle)
    })
  }, [])
}
