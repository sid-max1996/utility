import Stopwatch from './Stopwatch';
import { getPerformance } from './performance';

const stopwatch = Stopwatch.create();
const performance = getPerformance(); 

afterEach(() => {
  stopwatch.clear();
});

function sleep (time: number) {
  let diffTime = 0;
  const startTime = performance ? performance.now() : Date.now();
  while(diffTime < time) {
    const nowTime = performance ? performance.now() : Date.now();
    diffTime = nowTime - startTime;
  }
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