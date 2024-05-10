import UseragentService from '../services/useragent-service'

export default class OnCommand {
  private readonly useragentService: UseragentService

  constructor(useragentService: UseragentService) {
    this.useragentService = useragentService
  }

  /**
   * @link https://developer.chrome.com/docs/extensions/reference/commands/
   */
  listen(): void {
    enum Commands {
      renewUseragent = 'renew-useragent'
    }

    chrome.commands.onCommand.addListener((command) => {
      switch (command) {
        case Commands.renewUseragent:
          this.useragentService.renew()
          break
      }
    })
  }
}
