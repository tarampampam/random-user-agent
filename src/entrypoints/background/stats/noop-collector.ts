import type { StatsEvent } from '~/shared/stats'
import type { Collector } from './types'

/** Noop collector does nothing */
export default class implements Collector {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async send(..._: Array<StatsEvent>): Promise<Error | undefined> {
    return
  }
}
