/**
 * FIXME alternative - https://developer.chrome.com/docs/extensions/reference/alarms/
 */
export default class Timer {
  // timer interval (mutable)
  private intervalMillis: number

  // callback (aka handler)
  private readonly handler: () => void

  // timer instance (pointer)
  private timer: number | undefined

  constructor(intervalMillis: number, handler: () => void) {
    this.intervalMillis = intervalMillis
    this.handler = handler
  }

  // Start the timer
  start(): void {
    this.timer = window.setInterval(this.handler, this.intervalMillis)
  }

  // Timer is started?
  isStarted(): boolean {
    return this.timer !== undefined
  }

  // Stop the timer
  stop(): void {
    if (this.timer !== undefined) {
      window.clearInterval(this.timer)
    }

    this.timer = undefined
  }

  // Restart the timer
  restart(): void {
    this.stop()
    this.start()
  }

  // Update the timer interval
  setIntervalMillis(interval: number): void {
    this.intervalMillis = interval

    if (this.isStarted()) {
      this.restart()
    }
  }

  // Get the timer interval
  getIntervalMillis(): number {
    return this.intervalMillis
  }
}
