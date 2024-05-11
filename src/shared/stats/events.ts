import type { ReadonlySettingsState } from '~/shared/types'
import type { StatsEvent } from './types'

/** Creates a new extension-loaded event with the most recent settings */
export const newExtensionLoadedEvent = (s: ReadonlySettingsState, extra?: StatsEvent['props']): StatsEvent => ({
  name: 'extension_loaded',
  props: {
    ...extra,
    is_extension_enabled: s.enabled,
    is_custom_useragent_enabled: s.customUseragent.enabled,
    is_remote_useragent_list_enabled: s.remoteUseragentList.enabled,
    is_js_protection_enabled: s.jsProtection.enabled,
  },
})

/** Creates a new error event with the error message and stack trace. */
export const newErrorEvent = (error: Error | string | unknown, extra?: StatsEvent['props']): StatsEvent => {
  const props: { error_message?: string; error_stack?: string } = {}

  switch (true) {
    case typeof error === 'string':
      props.error_message = error
      break

    case error instanceof Error:
      props.error_message = error.message
      props.error_stack = error.stack ?? ''
      break

    default:
      props.error_message = String(error)
      break
  }

  return { name: 'extension_error', props: { ...extra, ...props } } // note: 'error' is a reserved event name and cannot be used
}
