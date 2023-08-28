import Stopwatch from './Stopwatch';
import { IPerformance } from './Stopwatch';

class MockPerformance implements IPerformance {
  private time = 0;

  now() {
    return this.time;
  }

  add(time: number) {
    this.time += time;
  }

  clear() {
    this.time = 0;
  }
}

const performance = new MockPerformance();
const stopwatch = Stopwatch.create(performance);

afterEach(() => {
  stopwatch.clear();
  performance.clear();
});

function sleep(time: number) {
  performance.add(time);
}

test('stopwatch stop', async () => {
  stopwatch.start();
  sleep(10);
  const elapsedTime = stopwatch.stop();
  expect(elapsedTime).toBeGreaterThan(5);
  expect(elapsedTime).toBeLessThan(15);
  expect(elapsedTime).toEqual(stopwatch.elapsedTime);
});

test('stopwatch clear 0', async () => {
  expect(stopwatch.elapsedTime).toBe(0);
});

test('stopwatch pause 0', async () => {
  let elapsedTime = stopwatch.pause();
  expect(elapsedTime).toBe(0);
  expect(elapsedTime).toEqual(stopwatch.elapsedTime);
});

test('stopwatch stop 0', async () => {
  let elapsedTime = stopwatch.stop();
  expect(elapsedTime).toBe(0);
  expect(elapsedTime).toEqual(stopwatch.elapsedTime);
});

test('stopwatch pause', async () => {
  stopwatch.start();
  sleep(10);
  let elapsedTime = stopwatch.pause();
  expect(elapsedTime).toBeGreaterThan(5);
  expect(elapsedTime).toBeLessThan(15);
  expect(elapsedTime).toEqual(stopwatch.elapsedTime);
  stopwatch.start();
  sleep(10);
  elapsedTime = stopwatch.pause();
  expect(elapsedTime).toBeGreaterThan(15);
  expect(elapsedTime).toBeLessThan(25);
  expect(elapsedTime).toEqual(stopwatch.elapsedTime);
  stopwatch.start();
  sleep(10);
  elapsedTime = stopwatch.stop();
  expect(elapsedTime).toBeGreaterThan(25);
  expect(elapsedTime).toBeLessThan(35);
  expect(elapsedTime).toEqual(stopwatch.elapsedTime);
  elapsedTime = stopwatch.pause();
  expect(elapsedTime).toBe(0);
  expect(elapsedTime).toEqual(stopwatch.elapsedTime);
  elapsedTime = stopwatch.stop();
  expect(elapsedTime).toBe(0);
  expect(elapsedTime).toEqual(stopwatch.elapsedTime);
});

test('stopwatch restart', async () => {
  stopwatch.start();
  sleep(10);
  let elapsedTime = stopwatch.pause();
  expect(elapsedTime).toBeGreaterThan(5);
  expect(elapsedTime).toBeLessThan(15);
  expect(elapsedTime).toEqual(stopwatch.elapsedTime);
  stopwatch.restart();
  sleep(15);
  elapsedTime = stopwatch.pause();
  expect(elapsedTime).toBeGreaterThan(10);
  expect(elapsedTime).toBeLessThan(20);
  expect(elapsedTime).toEqual(stopwatch.elapsedTime);
  stopwatch.restart();
  sleep(10);
  elapsedTime = stopwatch.stop();
  expect(elapsedTime).toBeGreaterThan(5);
  expect(elapsedTime).toBeLessThan(15);
  expect(elapsedTime).toEqual(stopwatch.elapsedTime);
});

test('stopwatch elapsedTime', async () => {
  stopwatch.start();
  sleep(10);
  expect(stopwatch.elapsedTime).toBe(10);
  sleep(10);
  expect(stopwatch.elapsedTime).toBe(20);
  sleep(5);
  const elapsedTime = stopwatch.stop();
  expect(elapsedTime).toBe(25);
  expect(elapsedTime).toEqual(stopwatch.elapsedTime);
});
