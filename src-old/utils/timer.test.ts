import Timer from './timer'

const pause = (delay: number): Promise<void> => {
  return new Promise((r) => setTimeout(r, delay))
}

test('start and stop', async () => {
  let handledCount = 0

  const timer = new Timer(30, () => handledCount++)

  expect(timer.isStarted()).toBeFalsy()
  expect(timer.getIntervalMillis()).toBe(30)

  expect(handledCount).toBe(0)
  await pause(31)
  expect(handledCount).toBe(0)

  timer.start()
  expect(timer.isStarted()).toBeTruthy()

  await pause(20)
  expect(handledCount).toBe(0)
  await pause(11)
  expect(handledCount).toBe(1)

  timer.stop()
  expect(timer.isStarted()).toBeFalsy()

  await pause(31)
  expect(handledCount).toBe(1)
})

test('restart', async () => {
  let handledCount = 0

  const timer = new Timer(30, () => handledCount++)

  expect(timer.isStarted()).toBeFalsy()

  timer.restart()
  expect(timer.isStarted()).toBeTruthy()

  await pause(31)
  expect(handledCount).toBe(1)
  expect(timer.isStarted()).toBeTruthy()

  timer.setIntervalMillis(60)

  await pause(62)
  expect(handledCount).toBe(2)
  expect(timer.isStarted()).toBeTruthy()

  timer.stop()
})
