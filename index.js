'use strict';

module.exports = () => {

  const generators = new Map();
  const components = new Map();

  async function resolve (name, children=new Set()) {
    if (components.has(name)) return components.get(name);
    if (!generators.has(name)) throw new Error(`Component "${ name }" is not registered.`);
    if (children.has(name)) throw new Error(`Circular dependency detected for "${ name }".`);
    children.add(name);
    components.set(name, await generators.get(name)(children));
    return components.get(name);
  }

  function register (name, factory, dependencies) {
    components.delete(name);
    generators.set(name, children => inject(factory, dependencies, children));
  }

  async function inject (factory, dependencies, children) {
    const components = [];
    for (let name of dependencies) components.push(await resolve(name, children));
    return await factory(...components);
  }

  return class {
    static register (name, factory, ...dependencies) { return register(name, factory, dependencies); }
    static async resolve (name) { return await resolve(name); }
  };

};
