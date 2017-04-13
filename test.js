'use strict';

(async () => {

  const container = require('./')();
  container.register('c1', (x, y) => x - y, 'c2', 'c3');
  container.register('c2', () => 99);
  container.register('c3', () => Promise.resolve(82));
  container.register('c4', () => {}, 'c5');
  container.register('c5', () => {}, 'c4');

  if (await container.resolve('c1') !== 17) throw new Error(1);
  if (await container.resolve('c2') !== 99) throw new Error(2);
  if (await container.resolve('c3') !== 82) throw new Error(3);

  try {
    await container.resolve('c4');
    throw new Error(4);
  } catch (error) { /* noop */ }

})().catch(error => {
  global.console.error(error);
  process.exit(1);
});
