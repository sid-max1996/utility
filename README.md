# @sid-max1996/utility
## Usage
A set of useful tools commonly used in development.

## Timer
Timer for easy creation and use. It is possible to restart an already running timer, start the timer again after the end. It is possible to loop the start of timers and set the maximum number of repetitions.
### Example:
```javascript
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
  firstRunImmediately?: boolean // first run of the timer function immediately
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
```

### Timer wait example:
```javascript
(async () => {
  await Timer.wait(3000);
  console.log('timer work'); // work after 3s
})();
```

## Roadmap
Stopwatch - to measure the execution time of a function call <br />
Slides - in order to take elements from the array in turn, at the end start over <br />
Cycle - delayed and stopped wrapper to while(true) or requestAnimationFrame
