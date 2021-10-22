# Handlers

Handlers are used to communicate between the popup page (content script) and the background (using `chrome.runtime` transport layer). Handlers should not contain "hard" logic - we have a better place for the logic named [services](../../services).

Usage example:

```typescript
import {RuntimeSender} from '../transport/runtime'
import {setEnabled} from './set-enabled'

new RuntimeSender() // create a wrapper around the `chrome.runtime.sendMessage` function
  .send(setEnabled(true)) // use a tiny request factory function
  .then((): void => {
    console.log('changed!')
  })
  .catch(console.error)
```
