# IOC Container for NodeJS but with Prospects

NodeJS got prospects. He's componafide.


# Usage

## `const container = module();`

## `container.register(name, factory, ...dependencies);

Name is any string you like to assign to this component.

Factory is a function that dependencies will be injected into. It should return or resolve to your component.

...dependencies are names of dependencies the component depends on, by name.

```javascript
container.register('myComponent', function (dep1, dep2) { return { /* component */ } }, 'dep1Name', 'dep2Name');
container.register('dep1Name', function MyDependency (someOtherDependency) {

  function myPrivateMethod () {
    // do private things you dont tell your mom about
  }

  return class MyClassUsesDITakeThatAndChewOnIt {
    static mySweetPublicMethodForGeneralConsumption () {}
  }
});
```


## `const promise = container.resolve(name)`

Returns a promise to the specified component.

```javascript
const myComponent = container.resolve('myComponent');
```


# Patterns

## Constants, Native, and Global Gimmes

Still use dependency injection. If it feels stupid your are probably still doing it right.

```javascript
container.register('native.process', () => global.process);
container.register('pi', () => 3.14); // Because you might want to test what happens to your code when the universe implodes and pi changes to 23.
```

## Components

All of your application should be exported functions that put all dependencies in closure, and return an API or value. Require nothing outside of a file or two. No regrets. Go state!

```javascript
container.register('myComponent', require('src/myComponent'), ['dep1', 'dep2']);
```


## Asyncronous Components

Use asyncronously intialized components only when it feels like
something that is absolutely part of getting your module up and
running. It should be start up logic, not business logic.


## Can I make a promise into a component?

Thanks for asking. What a thoughtful question!

Any promises returned by component di phase are resolved. Stick another one on top:

```javascript

module.exports = () => {

  const myPromise = new Promise(() => {});
  // Don't await this sucka!

  return myPromise; // component will be resolved promise value
  return Promise.resolve(myPromise); // component will be literal promise, this smells better using async/await.
}




# Example


```javascript

const container = require('componafide')();

container.register('native.fs', () => require('fs'));
container.register('dapperDan', require('./dapperDan.js'), 'native.fs');
container.register('hornyToad', require('./hornyToad.js'), 'dapperDan', 'native.fs');

container.resolve('hornyToad', hornyToad => {
  // Well there delmer, I reckon the application be starting or something like that. Its really just an example.
});

```



```javascript

/* dapperDan.js */

module.exports = fs => {
  return new Promise(resolve => fs.readFile('dapper-dan', resolve));
};

```



```javascript

/* hornyToad.js */

module.exports = (dapperDan, fs) => {
  // This component got prospects. 
}

```
