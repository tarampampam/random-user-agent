import {RuntimeSender} from './api/transport/runtime'
import {applicableToURI, ApplicableToURIResponse} from './api/handlers/applicable-to-uri'
import {getJSProtectionEnabled, GetJSProtectionEnabledResponse} from './api/handlers/get-js-protection-enabled'
import {getUseragent, GetUseragentResponse} from './api/handlers/get-useragent'

new RuntimeSender()
  .send( // order is important!
    applicableToURI(window.location.href),
    getJSProtectionEnabled(),
    getUseragent(),
  )
  .then((resp): void => {
    const applicable = (resp[0] as ApplicableToURIResponse).payload.applicable
    const jsProtectionEnabled = (resp[1] as GetJSProtectionEnabledResponse).payload.enabled
    const useragent = (resp[2] as GetUseragentResponse).payload.useragent

    console.log(
      applicable,
      jsProtectionEnabled,
      useragent
    )
  })
