import Timer from '../Timer';

let workCount: number = 0;

afterEach(() => {
  workCount = 0;
});

test('TODO: endlessly timer', () => {
  expect(1).toBe(1);
});

// test('endlessly timer work', async () => {
//   const timer = Timer.create(
//     () => {
//       workCount += 1;
//     },
//     0,
//     { endlessly: true },
//   );
//   timer.start();
//   expect(timer.launched).toBe(true);
//   await Timer.wait(100);
//   timer.stop();
//   expect(timer.launched).toBe(false);
//   expect(workCount).toBeGreaterThan(5);
// });

// test('endlessly timer work after error', async () => {
//   const timer = new Timer(
//     () => {
//       workCount += 1;
//       if (workCount === 2) {
//         throw new Error('Test Error');
//       }
//       if (workCount === 4) {
//         timer.stop();
//       }
//     },
//     0,
//     {
//       endlessly: true,
//       noThrowError: true,
//     },
//   );
//   timer.start();
//   await Timer.wait(100);
//   expect(timer.launched).toBe(false);
//   expect(workCount).toBe(4);
// });

// test('endlessly timer stop on error', async () => {
//   const timer = new Timer(
//     () => {
//       workCount += 1;
//       if (workCount === 2) {
//         throw new Error('Test Error');
//       }
//     },
//     0,
//     {
//       endlessly: true,
//       stopOnError: true,
//       noThrowError: true,
//     },
//   );
//   timer.start();
//   await Timer.wait(100);
//   expect(timer.launched).toBe(false);
//   expect(workCount).toBe(2);
// });

// test('endlessly timer stop on success', async () => {
//   const timer = new Timer(
//     () => {
//       workCount += 1;
//       if (workCount === 2) {
//         throw new Error('Test Error');
//       }
//     },
//     0,
//     {
//       endlessly: true,
//       stopOnSuccess: true,
//       noThrowError: true,
//     },
//   );
//   timer.start();
//   await Timer.wait(100);
//   expect(timer.launched).toBe(false);
//   expect(workCount).toBe(1);
// });

// test('endlessly timer stop on true', async () => {
//   const timer = new Timer(
//     () => {
//       workCount += 1;
//       if (workCount === 4) {
//         return true;
//       }
//       return false;
//     },
//     0,
//     {
//       endlessly: true,
//       stopOnTrue: true,
//     },
//   );
//   timer.start();
//   await Timer.wait(100);
//   expect(timer.launched).toBe(false);
//   expect(workCount).toBe(4);
// });
