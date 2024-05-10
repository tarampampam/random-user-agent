export default function (handlers: { renewUserAgent: () => Promise<void> | void }) {
  chrome.commands.onCommand.addListener(async (command) => {
    switch (command) {
      case 'renew-useragent': // command name, defined in manifest.json
        await handlers.renewUserAgent()
        break
    }
  })
}
