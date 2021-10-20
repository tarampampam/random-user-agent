export enum GeneratorType { // do NOT forget to update LOCALES on keys changes or appending
  ie6 = 'ie6',
  ie7 = 'ie7',
  ie8 = 'ie8',
  ie9 = 'ie9',
  ie10 = 'ie10',
  ie11 = 'ie11',
  edgeWin = 'edge_win',
  edgeXbox = 'edge_xbox',
  chromeWin = 'chrome_win',
  chromeMac = 'chrome_mac',
  chromeLinux = 'chrome_linux',
  chromeAndroid = 'chrome_android',
  firefoxWin = 'firefox_win',
  firefoxMac = 'firefox_mac',
  firefoxLinux = 'firefox_linux',
  firefoxAndroid = 'firefox_android',
  operaWin = 'opera_win',
  operaMac = 'opera_mac',
  operaAndroid = 'opera_android',
  safariIphone = 'safari_iphone',
  safariMac = 'safari_mac',
}

export function validType(type: String): boolean {
  return false // TODO implement this
}

export default class Generator {
  generate(): Promise<string> {
    return new Promise<string>(resolve => {
      resolve(`Implement the generator (timestamp/${new Date().getTime()})`)
    })
  }
}
