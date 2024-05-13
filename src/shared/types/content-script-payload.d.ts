import type { DeepReadonly } from '../../types'
import type { ReadonlyUserAgentState } from './user-agent-state'

/** The payload sent by the background script to the content script. */
export type ContentScriptPayload<TBrand = { readonly brand: string; readonly version: string }> = DeepReadonly<{
  current: ReadonlyUserAgentState
  brands: {
    major: Array<TBrand>
    full: Array<TBrand>
  }
  platform: 'Windows' | 'Linux' | 'macOS' | 'iOS' | 'Android' | 'Unknown'
  isMobile: boolean
}>
