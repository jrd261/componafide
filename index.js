'use strict';

function Container () {

  const generators = new Map();
  const components = new Map();

  function resolve (name, children=new Set()) {
    if (components.has(name)) return components.get(name);
    if (!generators.has(name)) throw new Error(`Component "${ name }" is not registered.`);
    if (children.has(name)) throw new Error(`Circular dependency detected for "${ name }".`);
    children.add(name);
    components.set(name, generators.get(name)(children));
    return components.get(name);
  }

  function register (name, factory, dependencies) {
    if (generators.has(name)) throw new Error(`Component "${ name }" already registered.`);
    generators.set(name, children => factory(...dependencies.map(x => resolve(x, children))));
    return ContainerApi;
  }

  class ContainerApi {
    static resolve (name) { return resolve(name); }
    static component (name, generator, ...dependencies) { return register(name, generator, dependencies); }
    static constant (name, value) { return register(name, () => value, []); }
  }

  return ContainerApi;

}

const containers = new Map();

function container (name='default') {
  if (containers.get(name)) return containers.get(name);
  containers.set(name, new Container());
  return containers.get(name);
}

function delete_ (name) {
  containers.delete(name);
}

function reset () {
  for (let name of containers.keys()) containers.delete(name);
}

module.exports = class ComponafideApi {
  static container (name='default') { return container(name); }
  static delete (name='default') { return delete_(name); }
  static reset () { return reset(); }
};
