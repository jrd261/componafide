'use strict';

const container = require('componafide').container();

container.component('component1', (x, y) => x - y, 'component2', 'constant1');
container.component('component2', () => 99);
container.component('component3', () => {}, 'component3');
container.constant('constant1', 100);

if (container.resolve('component1') !== -1) {
  global.console.error('Test 1 failed.');
  process.exit(1);
}

try {
  container.resolve('component3');
  global.console.error('Test 2 failed.');
  process.exit(1);
} catch (error) {}
