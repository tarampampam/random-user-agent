import { afterEach, describe, expect, test, vi } from 'vitest'
import { setRequestHeaders } from './http-requests'
import type { ReadonlyUserAgentState } from '~/shared/types'

const userAgent: ReadonlyUserAgentState = {
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
  browser: 'chrome',
  os: 'macOS',
  version: { browser: { major: 139, full: '139.0.0.0' } },
}

const installChromeMock = () => {
  const updateDynamicRules = vi.fn().mockResolvedValue(undefined)

  vi.stubGlobal('chrome', {
    declarativeNetRequest: {
      ResourceType: {
        MAIN_FRAME: 'main_frame',
        SCRIPT: 'script',
      },
      updateDynamicRules,
    },
  })

  return updateDynamicRules
}

describe('setRequestHeaders', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  test('allows whitelist rules to match a top-level navigation', async () => {
    const updateDynamicRules = installChromeMock()
    const rules = await setRequestHeaders(userAgent, { applyToDomains: ['lcps.aodianyun.com'] }, true)

    expect(rules).toHaveLength(3)
    for (const rule of rules) {
      expect(rule.condition.requestDomains).toEqual(['lcps.aodianyun.com'])
      expect(rule.condition).not.toHaveProperty('initiatorDomains')
    }
    expect(updateDynamicRules).toHaveBeenCalledWith({
      removeRuleIds: [1, 2, 3],
      addRules: rules,
    })
  })

  test('keeps blacklist exclusions on both request and initiator domains', async () => {
    installChromeMock()
    const rules = await setRequestHeaders(userAgent, { exceptDomains: ['example.com'] })

    for (const rule of rules) {
      expect(rule.condition.excludedRequestDomains).toContain('example.com')
      expect(rule.condition.excludedInitiatorDomains).toContain('example.com')
    }
  })
})
