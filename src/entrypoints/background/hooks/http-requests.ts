import { browserBrands, isMobile, platform } from '~/shared/client-hint'
import { canonizeDomain, validateDomainOrIP } from '~/shared'
import type { ContentScriptPayload, ReadonlyUserAgentState } from '~/shared/types'

// copy-paste of chrome.declarativeNetRequest.RuleActionType type (FireFox v124 does not have it)
// https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest#type-RuleActionType
enum RuleActionType {
  BLOCK = 'block', // Block the network request
  REDIRECT = 'redirect', // Redirect the network request
  ALLOW = 'allow', // Allow the network request. The request won't be intercepted if there is an allow rule which matches it
  UPGRADE_SCHEME = 'upgradeScheme', // Upgrade the network request url's scheme to https if the request is http or ftp
  MODIFY_HEADERS = 'modifyHeaders', // Modify request/response headers from the network request
  ALLOW_ALL_REQUESTS = 'allowAllRequests', // Allow all requests within a frame hierarchy, including the frame request itself
}

// copy-paste of chrome.declarativeNetRequest.HeaderOperation type (FireFox v124 does not have it)
// https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest#type-HeaderOperation
enum HeaderOperation {
  APPEND = 'append', // Adds a new entry for the specified header. This operation is not supported for request headers
  SET = 'set', // Sets a new value for the specified header, removing any existing headers with the same name
  REMOVE = 'remove', // Removes all entries for the specified header
}

// Note: the rule IDs must be unique, and do not change them after the extension is published.
// The rule IDs are used to remove the existing rules before adding new ones.
const RuleIDs: { readonly [_ in 'ReplaceUserAgent' | 'ReplaceClientHints' | 'ProvidePayload']: number } = {
  ReplaceUserAgent: 1,
  ReplaceClientHints: 2,
  ProvidePayload: 3,
}

enum HeaderNames {
  USER_AGENT = 'User-Agent',
  CLIENT_HINT_FULL_VERSION = 'Sec-CH-UA-Full-Version', // deprecated, https://mzl.la/3g1NzEI
  CLIENT_HINT_PLATFORM_VERSION = 'Sec-CH-UA-Platform-Version', // https://mzl.la/3yyNXAY
  CLIENT_HINT_BRAND_MAJOR = 'Sec-CH-UA', // https://mzl.la/3EaQyoi
  CLIENT_HINT_BRAND_FULL = 'Sec-CH-UA-Full-Version-List', // https://mzl.la/3C3x5TT
  CLIENT_HINT_PLATFORM = 'Sec-CH-UA-Platform', // https://mzl.la/3EbrbTj
  CLIENT_HINT_MOBILE = 'Sec-CH-UA-Mobile', // https://mzl.la/3SYTA3f
  SERVER_TIMING = 'server-timing', // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server-Timing
}

// the following domains are always excluded from the rules
const alwaysExcludedFor: ReadonlyArray<string> = ['challenges.cloudflare.com'].map(canonizeDomain)

/**
 * Enables the request headers modification.
 *
 * The filter parameter is optional and can be used to apply the rules only to specific domains.
 * If filter is not provided, the rules are applied to all domains.
 *
 * Enabling payload sending means that the JS protection is enabled.
 *
 * To debug the rules, you can use the following page:
 * https://www.whatismybrowser.com/detect/what-http-headers-is-my-browser-sending
 *
 * @link https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest
 *
 * @throws {Error} If the rules cannot be set
 */
export async function setRequestHeaders(
  ua: ReadonlyUserAgentState,
  filter?: { applyToDomains?: ReadonlyArray<string>; exceptDomains?: ReadonlyArray<string> },
  sendPayload: boolean = false
): Promise<Array<chrome.declarativeNetRequest.Rule>> {
  const condition: chrome.declarativeNetRequest.RuleCondition = {
    resourceTypes: Object.values(chrome?.declarativeNetRequest?.ResourceType || {}),
  }

  if (filter?.applyToDomains && filter.applyToDomains.length > 0) {
    // initiatorDomains: The rule only matches network requests originating from this list of domains. If the list
    //                   is omitted, the rule is applied to requests from all domains. An empty list is not allowed.
    //                   A canonical domain should be used. This matches against the request initiator and not the
    //                   request URL.
    //   requestDomains: The rule only matches network requests when the domain matches one from this list. If the
    //                   list is omitted, the rule is applied to requests from all domains. An empty list is not
    //                   allowed. A canonical domain should be used.
    //
    // https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest#type-MatchedRulesFilter
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/declarativeNetRequest/RuleCondition
    const list = filter.applyToDomains.map(canonizeDomain).filter(validateDomainOrIP)

    if (list.length) {
      condition.initiatorDomains = condition.requestDomains = list
    }
  }

  if (filter?.exceptDomains && filter.exceptDomains.length > 0) {
    // excludedInitiatorDomains: The rule does not match network requests originating from this list of domains.
    //                           If the list is empty or omitted, no domains are excluded. This takes precedence
    //                           over initiatorDomains. A canonical domain should be used. This matches against
    //                           the request initiator and not the request URL.
    //   excludedRequestDomains: The rule does not match network requests when the domains matches one from this
    //                           list. If the list is empty or omitted, no domains are excluded. This takes
    //                           precedence over requestDomains. A canonical domain should be used.
    const list = filter.exceptDomains.map(canonizeDomain).filter(validateDomainOrIP)

    if (list.length) {
      condition.excludedInitiatorDomains = condition.excludedRequestDomains = list
    }
  }

  // add the always excluded domains to the condition
  if (condition.excludedInitiatorDomains) {
    condition.excludedInitiatorDomains = [...new Set(condition.excludedInitiatorDomains.concat(alwaysExcludedFor))]
  } else {
    condition.excludedInitiatorDomains = [...alwaysExcludedFor]
  }

  // and do the same for the request domains
  if (condition.excludedRequestDomains) {
    condition.excludedRequestDomains = [...new Set(condition.excludedRequestDomains.concat(alwaysExcludedFor))]
  } else {
    condition.excludedRequestDomains = [...alwaysExcludedFor]
  }

  const brandsWithMajor = (() => {
    switch (ua.browser) {
      case 'chrome':
        return browserBrands('chrome', ua.version.browser.major)
      case 'opera':
        return browserBrands('opera', ua.version.browser.major, ua.version.underHood?.major || 0)
      case 'edge':
        return browserBrands('edge', ua.version.browser.major, ua.version.underHood?.major || 0)
    }

    return []
  })()

  const brandsWithFull = (() => {
    switch (ua.browser) {
      case 'chrome':
        return browserBrands('chrome', ua.version.browser.full)
      case 'opera':
        return browserBrands('opera', ua.version.browser.full, ua.version.underHood?.full || '')
      case 'edge':
        return browserBrands('edge', ua.version.browser.full, ua.version.underHood?.full || '')
    }

    return []
  })()

  const setPlatform = platform(ua.os)
  const setIsMobile = isMobile(ua.os)

  const payload: ContentScriptPayload = {
    current: ua,
    brands: {
      major: brandsWithMajor,
      full: brandsWithFull,
    },
    platform: setPlatform,
    isMobile: setIsMobile,
  }

  const rules: Array<chrome.declarativeNetRequest.Rule> = [
    {
      id: RuleIDs.ReplaceUserAgent,
      action: {
        type: RuleActionType.MODIFY_HEADERS,
        requestHeaders: [
          {
            operation: HeaderOperation.SET,
            header: HeaderNames.USER_AGENT,
            value: ua.userAgent,
          },
        ],
      },
      condition,
    },
    {
      id: RuleIDs.ReplaceClientHints,
      action: {
        type: RuleActionType.MODIFY_HEADERS,
        requestHeaders: [
          brandsWithMajor.length
            ? {
                operation: HeaderOperation.SET,
                header: HeaderNames.CLIENT_HINT_BRAND_MAJOR,
                value: brandsWithMajor.map((b) => `"${b.brand}";v="${b.version}"`).join(', '),
              }
            : { operation: HeaderOperation.REMOVE, header: HeaderNames.CLIENT_HINT_BRAND_MAJOR },
          brandsWithFull.length
            ? {
                operation: HeaderOperation.SET,
                header: HeaderNames.CLIENT_HINT_BRAND_FULL,
                value: brandsWithFull.map((b) => `"${b.brand}";v="${b.version}"`).join(', '),
              }
            : { operation: HeaderOperation.REMOVE, header: HeaderNames.CLIENT_HINT_BRAND_FULL },
          {
            operation: HeaderOperation.SET,
            header: HeaderNames.CLIENT_HINT_PLATFORM,
            value: `"${setPlatform}"`,
          },
          {
            operation: HeaderOperation.SET,
            header: HeaderNames.CLIENT_HINT_MOBILE,
            value: setIsMobile ? '?1' : '?0',
          },
          { operation: HeaderOperation.REMOVE, header: HeaderNames.CLIENT_HINT_FULL_VERSION },
          { operation: HeaderOperation.REMOVE, header: HeaderNames.CLIENT_HINT_PLATFORM_VERSION },
        ],
      },
      condition,
    },
  ]

  if (sendPayload) {
    rules.push({
      id: RuleIDs.ProvidePayload,
      action: {
        type: RuleActionType.MODIFY_HEADERS,
        responseHeaders: [
          {
            operation: HeaderOperation.SET,
            header: HeaderNames.SERVER_TIMING,
            value: `${__UNIQUE_HEADER_KEY_NAME__};desc="${btoa(JSON.stringify(payload)).replace(/=/g, '_')}"`,
          },
        ],
      },
      condition,
    })
  }

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: Object.values(RuleIDs), // remove existing rules
    addRules: rules,
  })

  return rules
}

/** Unsets the request headers. */
export async function unsetRequestHeaders(): Promise<void> {
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: Object.values(RuleIDs), // remove existing rules
  })
}
