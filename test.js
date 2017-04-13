'use strict';

const componafide = require('./')();

componafide.define('component1', x => x + 1, 'component2');
componafide.define('component2', () => 10);
componafide.define('component3', () => {}, 'component3');

if (componafide.resolve('component1') !== 11) {
  global.console.error('Test failed.');
  process.exit(1);
}

try {
  componafide.resolve('component3');
  global.console.error('Test failed.');
  process.exit(1);
} catch (error) {}
