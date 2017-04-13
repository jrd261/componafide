'use strict';

module.exports = () => {

  const registry = new Map();
  const components = new Map();

  function generate (name, targets) {
    if (targets.has(name)) throw new Error(`Circular dependency detected for "${ name }".`);
    if (!registry.has(name)) throw new Error(`Component "${ name }" not in registry.`);
    targets.add(name);
    const [ generator, dependencies ] = registry.get(name);
    const components = dependencies.map(x => resolve(x, targets));
    return generator(...components);
  }

  function resolve (name, targets) {
    if (!components.has(name)) components.set(name, generate(name, targets || new Set()));
    return components.get(name);
  }

  function define (name, generator, ...dependencies) {
    if (components.has(name)) throw new Error(`Component name "${ name }" already in use.`);
    registry.set(name, [ generator, dependencies ]);
  }

  return { resolve: name => resolve(name), define };

};
