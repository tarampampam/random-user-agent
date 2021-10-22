import {matchesWildcard, uriToPattern} from './patterns'

test('matchesWildcard', (): void => {
  expect(matchesWildcard('aaa', '*a*')).toBeTruthy()
  expect(matchesWildcard('_A', '?a')).toBeTruthy()
  expect(matchesWildcard('__a', '?a')).toBeFalsy()
  expect(matchesWildcard('__a', '*A')).toBeTruthy()
  expect(matchesWildcard('zafaggggg bb', '?a?a*b')).toBeTruthy()
  expect(matchesWildcard('zafaXXb', '?a?a?b')).toBeFalsy()

  expect(matchesWildcard('https://www.google.com/foo?bar&baz[]=a%20b#anchor', 'http?://*.GOOGLE.com/*')).toBeTruthy()
  expect(matchesWildcard('https://www.google.com/foo?bar&baz[]=a%20b#anchor', 'http?://google.com/*')).toBeFalsy()
  expect(matchesWildcard('https://mail.google.com/foo?bar', 'http?://mail.google.com/*')).toBeTruthy()
  expect(matchesWildcard('http://mail.google.com/', 'http?://mail.google.com/*')).toBeTruthy()
  expect(matchesWildcard('chrome://', 'chrome://*')).toBeTruthy()
  expect(matchesWildcard('chrome://foo bar? ~!@#$%^&*()_+-=[]{}\\|\'";:,.<>/?"', 'chrome://*')).toBeTruthy()
})

test('uriToPattern', (): void => {
  expect(uriToPattern('https://mail.google.com/foo?bar')).toEqual('http?://mail.google.com/*')
  expect(uriToPattern('http://mail.google.com/foo?bar')).toEqual('http?://mail.google.com/*')
  expect(uriToPattern('http://yahoo.com/foo?bar&baz[]=a%20b#anchor')).toEqual('http?://yahoo.com/*')
  expect(uriToPattern('http:/foo.com')).toEqual('http?://foo.com/*')
  expect(uriToPattern('ftp://bar.com')).toEqual('ftp://bar.com/*')

  // invalid URIs
  expect(uriToPattern('foo')).toEqual('')
  expect(uriToPattern('http ://foo.com')).toEqual('')
})
