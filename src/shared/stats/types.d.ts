/** A generic event that can be sent to a statistics collector. */
export type StatsEvent = {
  name: string
  props?: Record<string, string | number | boolean>
}
