// https://nodejs.dev/en/learn/understanding-setimmediate/

// ----

const baz = () => console.log('baz');
const foo = () => console.log('foo');
const zoo = () => console.log('zoo');

const start = () => {
  console.log('start');

  // Schedules 'baz' to be invoked in the next iteration of the event loop
  setImmediate(baz);

  // Creates a Promise that is immediately resolved with the value 'bar'
  new Promise((resolve, reject) => {
    resolve('bar');
  }).then((resolve) => {
    console.log(resolve);

    // Schedules 'zoo' to be invoked immediately after the current operation completes,
    // before any other I/O operations or timers fire (even ones scheduled earlier).
    process.nextTick(zoo);
  });

  // Schedules 'foo' to be invoked immediately after the current operation completes,
  // before any other I/O operations or timers fire.
  process.nextTick(foo);
};

start();
