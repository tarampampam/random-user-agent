import type { StatsEvent } from '~/shared/stats'

/**
 * Collector is an interface that defines the contract for a class that sends events to a stats collector.
 *
 * It returns a promise that resolves to an error or undefined (if the operation was successful).
 */
export interface Collector {
  send(...events: Array<StatsEvent>): Promise<Error | undefined>
}
