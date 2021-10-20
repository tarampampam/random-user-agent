import {mergeStates} from './settings'

test('mergeStates', () => {
  expect(mergeStates(
    {},
    {bar: 'bar'},
  )).toEqual(
    {bar: 'bar'},
  )

  expect(mergeStates(
    {foo: 'foo'}, {bar: 'bar'},
  )).toEqual(
    {foo: 'foo', bar: 'bar'},
  )

  expect(mergeStates(
    {foo: [1]}, {bar: [2], baz: {}},
  )).toEqual(
    {foo: [1], bar: [2], baz: {}},
  )

  expect(mergeStates(
    {foo: [1]}, {foo: [2], bar: {}},
  )).toEqual(
    {foo: [2], bar: {}},
  )

  expect(mergeStates(
    {foo: [1], bar: {baz: 'baz'}},
    {blah: 'blah', bar: {}},
  )).toEqual(
    {foo: [1], bar: {baz: 'baz'}, blah: 'blah'},
  )

  expect(mergeStates(
    {foo: 'foo', bar: {baz: 'baz', arr: ['arr', 'arr2']}, blah: 'blah'},
    {bar: {baz: 'baz', arr: ['arr3'], some: 1}, blah: {}, addArr: ['new arr']},
  )).toEqual(
    {foo: 'foo', bar: {baz: 'baz', arr: ['arr3'], some: 1}, blah: {}, addArr: ['new arr']},
  )
})
