import Dropper from './Dropper';
import Timer from '../timer/Timer';

let lastValue: number = 0;

afterEach(() => {
  lastValue = 0;
});

test('ExecuteDropper without params', async () => {
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

test('ExecuteDropper notWaitAsyncTask', async () => {
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

test('ExecuteDropper runLastDroppedInTheEnd', async () => {
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
