'use strict';

const container = require('./')();
container.register('c1', ['c2', 'c3'], (x, y) => x - y);
container.constant('c2', 99);
container.register('c3', ['c2'], x => x + 4);
container.register('c4', ['c5'], () => {});
container.register('c5', ['c4'], () => {});

try {

  if (container.resolve('c1') !== -4) throw new Error(1);
  if (container.resolve('c2') !== 99) throw new Error(2);
  if (container.resolve('c3') !== 103) throw new Error(3);

  try {
    container.resolve('c4');
    throw new Error(4);
  } catch (error) { /* noop */ }

} catch (error) {
  global.console.error(error);
  process.exit(1);
}
