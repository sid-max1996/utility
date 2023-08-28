import Timer from '../Timer';

let worked: boolean = false;
let workCount: number = 0;

afterEach(() => {
  worked = false;
  workCount = 0;
});

test('TODO: simple timer', () => {
  expect(1).toBe(1);
});

// test('simple timer work', async () => {
//   Timer.create(() => {
//     worked = true;
//   }, 0).start();
//   await Timer.wait(0);
//   expect(worked).toBe(true);
// });

// test('simple timer startImmediately', async () => {
//   Timer.create(
//     () => {
//       worked = true;
//     },
//     0,
//     {
//       startImmediately: true,
//     },
//   );
//   await Timer.wait(0);
//   expect(worked).toBe(true);
// });

// test('simple timer wait async callback', async () => {
//   Timer.create(async () => {
//     await Timer.wait(0);
//     worked = true;
//   }, 0).start();
//   await Timer.wait(100);
//   expect(worked).toBe(true);
// });

// test('simple timer doesnt wait async callback', async () => {
//   Timer.create(
//     async () => {
//       worked = true;
//       await Timer.wait(0);
//       worked = false;
//     },
//     0,
//     {
//       notWaitAsyncTask: true,
//       startImmediately: true,
//     },
//   );
//   await Timer.wait(0);
//   expect(worked).toBe(true);
// });

// test('simple timer run again', async () => {
//   const timer = Timer.create(() => {
//     workCount += 1;
//   }, 0);
//   timer.start();
//   expect(timer.launched).toBe(true);
//   await Timer.wait(0);
//   expect(timer.launched).toBe(false);
//   expect(workCount).toBe(1);
//   timer.start();
//   expect(timer.launched).toBe(true);
//   await Timer.wait(0);
//   expect(timer.launched).toBe(false);
//   expect(workCount).toBe(2);
//   timer.restart();
//   expect(timer.launched).toBe(true);
//   await Timer.wait(0);
//   expect(timer.launched).toBe(false);
//   expect(workCount).toBe(3);
// });
