import { describe, expect, test } from 'vitest'
import i18n from './i18n.ts'

describe('i18n', () => {
  test('fallback', () => {
    // @ts-expect-error testing the error
    expect(i18n('foobar', 'barbaz')).toBe('barbaz')
  })

  test('fallback to the key', () => {
    // @ts-expect-error testing the error
    expect(i18n('foobar')).toBe('foobar')
  })
})
