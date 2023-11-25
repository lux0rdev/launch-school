# Post ES6 syntax

ES6 introduced several shorthand notations that are very handy when working with objects and arrays. We'll take a brief look at these notations in this document.

## Concise Property Initializers

<table>
<thead>
  <tr>
    <th>Old Syntax</th>
    <th>Modern Syntax</th>
  </tr>
</thead>
<tbody>
<tr>
<td>

```js
  function xyzzy(foo, bar, qux) {
    return {
      foo: foo, // name: value
      bar: bar, // name: value
      qux: qux, // name: value
    };
  }
```
</td>

<td>

```js
function xyzzy(foo, bar, qux) {
  return {
    foo, // name: value
    bar, // name: value
    qux, // name: value
  };
}
```
</td>
</tr>
<tr>
<td>
</td>
<td>

```js
function xyzzy(foo, bar, qux) {
  return {
    foo,
    bar,
    answer: qux,
  };
}
// we can mix both styles
```

</td>
</tr>
</tbody>
</table>

## Concise Methods

<table>
<thead>
  <tr>
    <th>Old Syntax</th>
    <th>Modern Syntax</th>
  </tr>
</thead>
<tbody>
<tr>
<td>

```js
let obj = {
  foo: function() {
    // do something
  },

  bar: function(arg1, arg2) {
    // do something else with arg1 and arg2
  },
}
```
</td>

<td>

```js
let obj = {
  foo() {
    // do something
  },

  bar(arg1, arg2) {
    // do something else with arg1 and arg2
  },
}
```
</td>
</tr>
</tbody>
</table>

## Objet Destructuring

<table>
<thead>
  <tr>
    <th>Old Syntax</th>
    <th>Modern Syntax</th>
  </tr>
</thead>
<tbody>
<tr>
<td>

```js
let obj = {
  foo: "foo",
  bar: "bar",
  qux: 42,
};

let foo = obj.foo;
let bar = obj.bar;
let qux = obj.qux;
```
</td>
<td>

```js
let { foo, bar, qux } = obj;
// this creates three variables
// with the value of those properties
// the order is not important
```
</td>
</tr>
<tr>
<td>
</td>
<td>

```js
let { foo } = obj;
let { bar, qux } = obj;
// we don't have to use every variable
```
</td>
</tr>
<tr>
<td>
</td>
<td>

```js
let { qux: myQux, foo, bar } = obj;
// we can even use different names for the result
// this example creates a myQux variable with obj.qux value
```
</td>
</tr>
<tr>
<td>
</td>
<td>

```js
function xyzzy({ foo, bar, qux }) {
  console.log(qux); // 3
  console.log(bar); // 2
  console.log(foo); // 1
}

let obj = {
  foo: 1,
  bar: 2,
  qux: 3,
};

xyzzy(obj);
// it also works with function parameters
// this syntax is very common when passing React props
```
</td>
</tr>
</tbody>
</table>

## Array Destructuring

<table>
<thead>
  <tr>
    <th>Old Syntax</th>
    <th>Modern Syntax</th>
  </tr>
</thead>
<tbody>
</tr>
<tr>
<td>

```js
let foo = [1, 2, 3];

let first = foo[0];
let second = foo[1];
let third = foo[2];
```
</td>
<td>

```js
let foo = [1, 2, 3];

let [ first, second, third ] = foo;
```
</td>
</tr>
<tr>
<td>
</td>
<td>

```js
let bar = [1, 2, 3, 4, 5, 6, 7];
let [ first, , , fourth, fifth, , seventh ] = bar;
// we can skip certain elements if we don't need them
```
</td>
</tr>
<tr>
<td>
</td>
<td>

```js
let one = 1;
let two = 2;
let three = 3;

let [ num1, num2, num3 ] =  [one, two, three];
// We can perform multiple assignments in a single expression
```
</td>
</tr>
<tr>
<td>
</td>
<td>

```js
let one = 1;
let two = 2;

[ one, two ] =  [two, one];

console.log(one);   // 2
console.log(two);   // 1
// we can use this syntax to swap to values
```
</td>
</tr>
<tr>
<td>
</td>
<td>

```js
let foo = [1, 2, 3, 4];
let [ bar, ...qux ] = foo;
console.log(bar);   // 1
console.log(qux);   // [2, 3, 4]
// we can use rest syntax in array destructuring
// to assign a variable to the rest of an array
```
</td>
</tr>
</tbody>
</table>

## Spread Syntax

Note that _spread syntax_ and _rest syntax_ work in different manner, even if they both use `...`.

The **spread syntax** uses `...` to "spread" the elements of an array or object into separate items:

<table>
<thead>
  <tr>
    <th>Old Syntax</th>
    <th>Modern Syntax</th>
  </tr>
</thead>
<tbody>
<tr>
<td>

```js
function add3(item1, item2, item3) {
  return item1 + item2 + item3;
}

let foo = [3, 7, 11];
add3(foo[0], foo[1], foo[2]); // => 21
```
</td>

<td>

```js
add3(...foo); // => 21
```
</td>
</tr>
<tr>
<td>

```js
add3.apply(null, foo); // => 21
```
</td>

<td>

</td>
</tr>
</tbody>
</table>

In many cases, spread syntax can entirely replace the `apply` method.

### Common Use-Cases for spread syntax

#### Clone an array

```js
let foo = [1, 2, 3];
let bar = [...foo];
console.log(bar);         // [1, 2, 3]
console.log(foo === bar); // false -- bar is a new array
```

#### Concatenate two or more arrays

```js
let foo = [1, 2, 3];
let bar = [4, 5, 6];
let qux = [...foo, ...bar];
qux;  // => [1, 2, 3, 4, 5, 6]
```

#### Insert an array into another array

```js
let foo = [1, 2, 3]
let bar = [...foo, 4, 5, 6, ...foo];
bar; // => [1, 2, 3, 4, 5, 6, 1, 2, 3]
```

### Spread Syntax with Objects

#### Create a clone of an object

```js
// Create a clone of an object
let foo = { qux: 1, baz: 2 };
let bar = { ...foo };
console.log(bar);         // { qux: 1, baz: 2 }
console.log(foo === bar); // false -- bar is a new object
```

#### Merge Objects

```js
// Merge objects
let foo = { qux: 1, baz: 2 };
let xyz = { baz: 3, sup: 4 };
let obj = { ...foo, ...xyz };
obj;  // => { qux: 1, baz: 3, sup: 4 }
```

## Rest syntax

We can think the **rest syntax** as the opposite of spread syntax. Instead of spreading an array or object out into separate items, it instead collects multiple items into an array of object. We saw an example of this in the section on destructuring arrays:

```js
let foo = [1, 2, 3, 4];
let [ bar, ...otherStuff ] = foo;
console.log(bar);        // 1
console.log(otherStuff); // [2, 3, 4]
```

It also works with objects:

```js
let foo = {bar: 1, qux: 2, baz: 3, xyz: 4};
let { bar, baz, ...otherStuff } = foo;
console.log(bar);        // 1
console.log(baz);        // 3
console.log(otherStuff); // {qux: 2, xyz: 4}
```

Rest syntax is used most often when working with functions that take an arbitrary number of parameters:

```js
function maxItem(first, ...moreArgs) {
  let maximum = first;
  moreArgs.forEach(value => {
    if (value > maximum) {
      maximum = value;
    }
  });

  // here moreArgs is [6, 10, 4, -3]

  return maximum;
}

console.log(maxItem(2, 6, 10, 4, -3));
```