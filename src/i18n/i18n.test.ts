import { describe, expect, test, vi, vitest } from 'vitest'
import i18n from './i18n'

describe('i18n', () => {
  test('fallback', () => {
    // @ts-expect-error testing the error
    expect(i18n('foobar', 'barbaz')).toBe('barbaz')
  })

  test('fallback to the key', () => {
    // @ts-expect-error testing the error
    expect(i18n('foobar')).toBe('foobar')
  })

  test('chrome.i18n', () => {
    vi.stubGlobal('chrome', {
      i18n: {
        getMessage: vitest.fn(() => 'Active User-Agent'),
      },
    })

    expect(i18n('active_user_agent')).toBe('Active User-Agent')
  })

  test('chrome.i18n with empty string', () => {
    vi.stubGlobal('chrome', {
      i18n: {
        getMessage: vitest.fn(() => ''), // empty
      },
    })

    expect(i18n('auto_renew_on_startup', 'fallback')).toBe('fallback')
  })
})
