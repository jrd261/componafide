'use strict';

module.exports = () => {

  const registry = new Map();
  const components = new Map();

  function resolve (name, children=new Set()) {
    if (components.has(name)) return components.get(name);
    if (children.has(name)) throw new Error(`Circular dependency detected for "${ name }".`);
    children.add(name);
    if (!registry.has(name)) throw new Error(`Component "${ name }" is not registered.`);
    const [dependencies, generator] = registry.get(name);
    const component = generator(...dependencies.map(name => resolve(name, children)));
    components.set(name, component);
    return component;
  }

  return class {
    static register (name, dependencies, generator) { registry.set(name, [dependencies, generator]); }
    static constant (name, value) { registry.set(name, [[], () => value]); }
    static resolve (name) { return resolve(name); }
  };

};
