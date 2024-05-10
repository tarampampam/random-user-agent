export default class Timer {
  // Chrome 120: Starting in Chrome 120, the minimum alarm interval has been reduced from 1 minute to 30 seconds
  // for an alarm to trigger in 30 seconds, set periodInMinutes: 0.5
  // https://developer.chrome.com/docs/extensions/reference/api/alarms
  //
  // for FireFox, the minimum interval is 1 minute
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms/create#alarminfo
  private readonly minDelayInSeconds: number = 30

  // is set only after the timer is started
  private listener: ((alarm: chrome.alarms.Alarm) => void) | undefined
  private intervalSec: number

  private readonly name: string
  private readonly handler: (timer: this) => void

  /**
   * Create a new timer. Keep in mind that the minimum interval is 30 seconds, and the timer should be started
   * manually.
   */
  constructor(intervalSec: number, handler: (timer: Timer) => void) {
    this.intervalSec = Math.max(this.minDelayInSeconds, intervalSec)

    this.name = crypto.randomUUID()
    this.handler = handler
  }

  /** Start the timer */
  async start(): Promise<void> {
    await chrome.alarms.create(this.name, { periodInMinutes: this.intervalSec / 60 })

    this.listener = (alarm) => {
      if (alarm.name === this.name) {
        this.handler(this)
      }
    }

    chrome.alarms.onAlarm.addListener(this.listener)
  }

  /** Stop the timer */
  async stop(): Promise<boolean> {
    if (this.listener) {
      chrome.alarms.onAlarm.removeListener(this.listener)

      this.listener = undefined
    }

    return await chrome.alarms.clear(this.name)
  }

  /** Restart the timer */
  async restart(): Promise<void> {
    await this.stop()
    await this.start()
  }

  /** Change the timer interval (in seconds) */
  async changeInterval(intervalSec: number): Promise<void> {
    this.intervalSec = Math.max(this.minDelayInSeconds, intervalSec)

    if (this.listener) {
      await this.restart()
    }
  }

  /** Get the timer interval (in seconds) */
  get getIntervalSec(): number {
    return this.intervalSec
  }

  /** Is the timer started? */
  get isStarted(): boolean {
    return !!this.listener
  }
}
