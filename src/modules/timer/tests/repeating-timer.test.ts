import Timer from '../Timer';

let workCount: number = 0;

afterEach(() => {
  workCount = 0;
});

test('repeating timer work', async () => {
  const timer = Timer.create(() => {
    workCount += 1;
  }, 0, { repeatCount: 5 });
  timer.start();
  expect(timer.launched).toBe(true);
  await Timer.wait(100);
  expect(timer.launched).toBe(false);
  expect(workCount).toBe(6);
});

test('repeating timer early stop', async () => {
  const timer = Timer.create(() => {
    workCount += 1;
    if (workCount === 3) {
      timer.stop();
    }
  }, 0, { repeatCount: 5 });
  timer.start();
  expect(timer.launched).toBe(true);
  await Timer.wait(100);
  expect(timer.launched).toBe(false);
  expect(workCount).toBe(3);
});

test('repeating timer stop on error', async () => {
  const timer = new Timer(() => {
    workCount += 1;
    if (workCount === 2) {
      throw new Error('Test Error');
    }
  }, 0, {
    repeatCount: 5,
    stopOnError: true,
    noThrowError: true
  });
  timer.start();
  await Timer.wait(100);
  expect(timer.launched).toBe(false);
  expect(workCount).toBe(2);
});

test('repeating timer stop on success', async () => {
  const timer = new Timer(() => {
    workCount += 1;
    if (workCount === 1) {
      throw new Error('Test Error');
    }
  }, 0, {
    repeatCount: 5,
    stopOnSuccess: true,
    noThrowError: true
  });
  timer.start();
  await Timer.wait(100);
  expect(timer.launched).toBe(false);
  expect(workCount).toBe(2);
});

test('repeating timer stop on true', async () => {
  const timer = new Timer(() => {
    workCount += 1;
    if (workCount === 4) {
      return true;
    }
    return false;
  }, 0, {
    repeatCount: 5,
    stopOnTrue: true
  });
  timer.start();
  await Timer.wait(100);
  expect(timer.launched).toBe(false);
  expect(workCount).toBe(4);
});
