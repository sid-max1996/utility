import Dropper from './Dropper';
import Timer from '../timer/Timer';

let lastValue: number = 0;

afterEach(() => {
  lastValue = 0;
});

test('Dropper without params', async () => {
  const dropper = Dropper.create(async (value: number) => {
    lastValue = value;
    await Timer.wait(10);
  });
  dropper.execute(1);
  expect(lastValue).toBe(1);
  dropper.execute(2);
  expect(lastValue).toBe(1);
  dropper.execute(3);
  expect(lastValue).toBe(1);
  await Timer.wait(20);
  expect(lastValue).toBe(1);
  dropper.execute(4);
  expect(lastValue).toBe(4);
});

test('Dropper notWaitAsyncTask', async () => {
  const dropper = Dropper.create(async (value: number) => {
    lastValue = value;
    await Timer.wait(10);
  }, { notWaitAsyncTask: true });
  dropper.execute(1);
  expect(lastValue).toBe(1);
  dropper.execute(2);
  expect(lastValue).toBe(2);
  dropper.execute(3);
  expect(lastValue).toBe(3);
});

test('Dropper runLastDroppedInTheEnd', async () => {
  const dropper = Dropper.create(async (value: number) => {
    lastValue = value;
    await Timer.wait(10);
  }, { runLastDroppedInTheEnd: true });
  dropper.execute(1);
  expect(lastValue).toBe(1);
  dropper.execute(2);
  expect(lastValue).toBe(1);
  dropper.execute(3);
  expect(lastValue).toBe(1);
  await Timer.wait(50);
  expect(lastValue).toBe(3);
});

test('Dropper errors', async () => {
  const dropper = Dropper.create((value: number) => {
    lastValue = value;
    throw new Error(`Test error ${value}`);
  });
  try {
    dropper.execute(1);
  } catch (err) {}
  expect(lastValue).toBe(1);
  try {
    dropper.execute(2);
  } catch (err) {}
  expect(lastValue).toBe(2);
  try {
    dropper.execute(3);
  } catch (err) {}
  expect(lastValue).toBe(3);
});
