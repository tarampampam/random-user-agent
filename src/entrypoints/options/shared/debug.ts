/** Debugging logging function for the options page. */
export default function (msg: string, ...args: Array<unknown>): void {
  console.debug(`%c👾 ${msg}`, 'font-weight:bold', ...args)
}
