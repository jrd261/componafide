'use strict';

const container = require('./').container();

container.component('component1', (x, y) => x - y, 'component2', 'constant1')
  .component('component2', () => 99)
  .component('component3', () => {}, 'component3')
  .constant('constant1', 100);

if (container.resolve('component1') !== -1) {
  global.console.error('Test 1 failed.');
  process.exit(1);
}

try {
  container.resolve('component3');
  global.console.error('Test 2 failed.');
  process.exit(1);
} catch (error) {}
