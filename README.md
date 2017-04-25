# IOC Container for NodeJS but with Prospects

NodeJS got prospects. He's componafide.


# Usage

## `const container = module();`
## `container.register(name, [dependencies], generator);`

```javascript
container.register('myComponent', ['dep1', 'dep2'], (dep1, dep2) => { /* return myComponent */ });
container.register('dep1', [], () => { /* return dep1 */ });
```

## `container.constant(name, value);`

Convienience method for `container.register(name, [], () => value);`.

## `const component = container.resolve(name);`



# Usage Pattern

## A Component Per File

Export a component in each file. Put all dependencies in closure, and return an API or value. Require nothing outside of a file or two. No regrets. Go state!

```javascript

module.exports = (dep1, dep2) => {

  function myPrivateMethod () {}

  return class MySingleton {
    static myPublicMethod () {}
  }

}
```

Define the component in index.js or some application bootstrapping step:

```javascript
container.register('myComponent', require('src/myComponent'), ['dep1', 'dep2']);
const component = container.resolve('myComponent');
```


## Singletons

```javascript

module.exports = dep1 => {

  function privateMethod () {}

  return class SingletonAPI {
    static publicMethod (arg1, arg2) {}
  }

}

```


## Classes

```javascript

module.exports = Pomade => {

  function applyTheDap () {}

  return class DapperDan extends Pomade {
    apply () {}
  }

}

```


## Constants, Native, and Global Gimmes

Still use dependency injection. If it feels stupid your are probably still doing it right.

```javascript
container.constant('scope.process', process);
container.constant('pi', 3.14); // Because you might want to test what happens to your code when the universe implodes and pi changes to 23.
```
