# @sid-max1996/utility
## Usage
A set of useful tools commonly used in development.

## Timer
Timer for easy creation and use. It is possible to restart an already running timer, start the timer again after the end. It is possible to loop the start of timers and set the maximum number of repetitions.
### Example:
```javascript
import { Timer } from '@sid-max1996/utility';

Timer.create(() => {
  console.log('timer work');
}, 100, {
  startImmediately: true
});
```
### All possible params:
```javascript
{
  startImmediately?: boolean // start timer immediately
  instantStart?: boolean // short alias for startImmediately
  firstRunImmediately?: boolean // first run of the timer function immediately
  instantExecute?: boolean // short alias for firstRunImmediately
  repeatCount?: number // how many times to repeat the timer function call
  endlessly?: boolean // repeat timert function call endlessly
  notWaitAsyncTask?: boolean // do not wait for the async timer function to complete before starting the next timer
  stopOnSuccess?: boolean // call the stop method on the timer if no errors occur during timer function execution
  stopOnError?: boolean // call the stop method on the timer if an error occur during timer function execution
  stopOnTrue?: boolean // call the stop method on the timer if the function returns true
  noThrowError?: boolean // do not throw err if an error in timer function occur
}
```
### Repeationg timer example:
```javascript
import { Timer } from '@sid-max1996/utility';

Timer.create(() => {
  console.log('timer work'); // it works 6 times
}, 100, {
  repeatCount: 5,
  startImmediately: true
});

let workCount = 0;
const timer = Timer.create(() => {
  workCount += 1;
  console.log('timer work'); // it works 3 times
  if (workCount < 3) {
    throw new Error('Test Error');
  }
}, 100, {
  repeatCount: 5,
  stopOnSuccess: true // if error occur repeat else stop
});
timer.start();
```

### Endlessly timer example:
```javascript
import { Timer } from '@sid-max1996/utility';

const timer = Timer.create(() => {
  console.log('timer work');
}, 100, { endlessly: true });
timer.start();
setTimeout(() => timer.stop(), 5000); // stop endlessly timer

const timer1 = Timer.create(() => {
  console.log('timer1 work');
}, 100, {
  endlessly: true,
  firstRunImmediately: true // first work immediately, next after 100ms
});
timer1.start();

const timer2 = Timer.create(() => {
  console.log('timer1 work');
}, 100);
timer2.method(); // run timer method immediately
timer2.start(); // start timer that will work after 100ms 
```

### Timer wait example:
```javascript
import { Timer } from '@sid-max1996/utility';

(async () => {
  await Timer.wait(3000);
  console.log('timer work'); // work after 3s
})();
```

## Stopwatch
Stopwatch with accurate time with the ability to pause and resume. Can be used to measure the execution time of operations.
### Example:
```javascript
import { Stopwatch, Timer } from '@sid-max1996/utility';

(async () => {
  const stopwatch = Stopwatch.create(performance); // For browser
  // const stopwatch = Stopwatch.create(require('perf_hooks').performance); // For nodejs
  // const stopwatch = Stopwatch.create({ now: Date.now }); // For both less accurate!!!
  stopwatch.start();
  await Timer.wait(100);
  const pauseTime = stopwatch.pause();
  console.log(`pauseTime: ${pauseTime} == elapsedTime: ${stopwatch.elapsedTime}`);
  await Timer.wait(100);
  const stopTime = stopwatch.stop();
  console.log(`stopTime: ${stopTime} == elapsedTime: ${stopwatch.elapsedTime}`);
})();
```

## Slides
Slides is a convenient passage through the array, when we reach the end, we start over. It is also possible to set the position.
### Example:
```javascript
import { Slides, Timer } from '@sid-max1996/utility';

const slides = Slides.create([1, 2, 3, 4, 5]);

(async () => {
  while (true) {
    const slide = slides.current;
    const currentSlide = slides.next(); // next() return current slide
    const nextSlide = slides.current; // after next() current slide changed
    console.log(`current slide: ${slide} === currentSlide: ${currentSlide}, nextSlide: ${nextSlide}`);
    if (slides.position === 3) { // skip 4 slide
      console.log('skip 4 slide');
      slides.set(slides.position + 1); // go to 5 slide
    }
    await Timer.wait(1000);
  }
})();
```
## Dropper
Discards calls to a function if it is in progress.

### All possible params:
```javascript
{
  runLastDroppedInTheEnd?: boolean; // run last dropped in the end
  notWaitAsyncTask?: boolean; // do not wait for the async callback
}
```
### Example:
```javascript
import { Dropper, Timer } from '@sid-max1996/utility';

(async () => {
  let lastValue = 0;
  console.log(`dropper1 drop if in proccess`);
  const dropper1 = Dropper.create(async (value) => {
    lastValue = value;
    await Timer.wait(10);
  });
  dropper1.execute(1);
  console.log(`dropper1 execute(1) 1 changed lastValue: ${lastValue}`);
  dropper1.execute(2);
  console.log(`dropper1 execute(2) 2 dropped lastValue: ${lastValue}`);
  dropper1.execute(3);
  console.log(`dropper1 execute(3) 3 dropped lastValue: ${lastValue}`);
  await Timer.wait(50);
  console.log(`dropper1 wait 50ms`);
  dropper1.execute(4);
  console.log(`dropper1 execute(4) 4 changed lastValue: ${lastValue}`);
  console.log(`-----------------------------------------------------`);
  lastValue = 0;
  console.log(`dropper2 drop if in proccess and run last dropped in the end`);
  const dropper2 = Dropper.create(async (value) => {
    lastValue = value;
    await Timer.wait(10);
  }, { runLastDroppedInTheEnd: true });
  dropper2.execute(1);
  console.log(`dropper2 execute(1) 1 changed lastValue: ${lastValue}`);
  dropper2.execute(2);
  console.log(`dropper2 execute(2) 2 next lastValue: ${lastValue}`);
  dropper2.execute(3);
  console.log(`dropper2 execute(3) 3 next 2 dropped lastValue: ${lastValue}`);
  await Timer.wait(50);
  console.log(`dropper2 wait 50ms 3 changed lastValue: ${lastValue}`);
})();
```
