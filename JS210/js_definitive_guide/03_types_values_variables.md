## Chapter 3: Types, Values and Variables.

Computer programs work by manipulating values. (a number, a string, an object)

Types: the kind of values that can be represented and manipulated in a programming language. When a program needs to retain a value for future use, it assigns the value to a variable. Variables have names, and they allow use of those names in our programs to refer to values.

JavaScript Types:

  - Primitive Types:
    - Numbers
    - Strings
    - Booleans
    - `null`
    - `undefined`
    - Symbols
    - Big Integers

  - Object or _Compound_ Types:
    - Object
    - Function
    - Class
    - Array
    - Set
    - Map
    - Regular Expression
    - Date
  
### Primitive Types

Primitives are immutable in JS. When a function/method _modifies_ a primitive, like a string, it just returns a new string with the modifications.

#### Numbers

JavaScript uses the floating point system to represent all numbers.

JS primary numeric type, `Number`, is used to represent integers and to approximate real numbers using the 64-bit floating-point format defined by the IEEE 754 standard. LS: "The largest number that can be precisely stored is 9,007,199,254,740,991 (`Number.MAX_SAFE_INTEGER`). However, the maximum numeric value that can be represented is 1.7976931348623157e+308 (`Number.MAX_VALUE`). Any number greater than this is represented as Infinity."

JavaScript uses a floating point system to represent all numbers. 

Supported numeric literals:
  - Integers:
    - Base 10: `255`
    - Base 16: `0xff`
    - Base 2: `0b11111111`
    - Base 8: `0xff`
  - Floating-point Literals:
    - Traditional: `3.14`
    - Exponential: `6.02e23`, `6.02e-23`

We can use underscores within numeric literals to break long literals into chunks:

```javascript
const billion = 1_000_000_000;
```

JS includes the traditional operators to perform basic arithmetic (`+`, `-`, `*`, `/`, `%`, `**`). It also supporst more complex mathematical operations via a set functions and constants defined as properties of the `Math` object:

```javascript
Math.pow(2,53)           // => 9007199254740992: 2 to the power 53
Math.round(.6)           // => 1.0: round to the nearest integer
Math.ceil(.6)            // => 1.0: round up to an integer
Math.floor(.6)           // => 0.0: round down to an integer
Math.abs(-5)             // => 5: absolute value
Math.max(x,y,z)          // Return the largest argument
Math.min(x,y,z)          // Return the smallest argument
Math.random()            // Pseudo-random number x where 0 <= x < 1.0
Math.PI                  // π: circumference of a circle / diameter
Math.E                   // e: The base of the natural logarithm
Math.sqrt(3)             // => 3**0.5: the square root of 3
Math.pow(3, 1/3)         // => 3**(1/3): the cube root of 3
Math.sin(0)              // Trigonometry: also Math.cos, 
Math.atan, etc.
Math.log(10)             // Natural logarithm of 10
Math.log(100)/Math.LN10  // Base 10 logarithm of 100
Math.log(512)/Math.LN2   // Base 2 logarithm of 512
Math.exp(3)              // Math.E cubed
```

Arithmetic in JS does not raise errors in cases of overflow, underflow, or division by zero, etc.:

  - Overflow (when the result of an operation is larger/smaller than the largest/smallest representable number):
    - Larger: `Infinity`
    - Smaller: `-Infinity`
  - Underflow (when the result of a numeric operation is closer to zero than the smallest representable number):
    - From positive number: `0`
    - From negative number: `-0`
  - Others:
    ```javascript
      2 / 0; // => Infinity
      Math.sqrt(-1); // => NaN (Not a Number)
    ```

`NaN` does not compare equal to any other value, including itself. In order to do this, we need to use `isNan()` or `Number.isNaN`.

In order to avoid binary floating-point and rounding errors, use scaled integers, like integers of the smallest relevant units, for example when manipulating monetary values (representing amounts in cents, not fractional dollars.), or time durations (using seconds, not hours).

#### Strings

A string is an ordered sequence of 16-bit values, each of them usually a UNICODE character. Strings use zero-based index. The length of a string is the number of characters that contains.

String literals:
  - Single quotes: `'al""oha'`
  - Double quotes: `"al''oha"`
  - Backticks: ``al""o''ha``

Some characters can be escaped: `'It\'s there'`

String interpolation:
  The final value of a string literal in backticks is computed by evaluating any included expressions, converting the values of those expression to strings and combining those computed strings with the literal characters within the backticks.
  ```javascript
  let name = "Bill";
  let greeting = `Hello ${ name }.`;  // greeting == "Hello Bill."
  ```

The `+` operator concatenates strings, producing a new string.

Strings can be compared to each other using the traditional operators, by character ASCII code.
A string is strictly equal (`===`) to other if both have the exact same characters, in the same order.

JavaScript provides a rich API to work with strings:
```javascript
let s = "Hello, world"; // Start with some text.

// Obtaining portions of a string
s.substring(1,4)        // => "ell": the 2nd, 3rd, and 4th characters.
s.slice(1,4)            // => "ell": same thing
s.slice(-3)             // => "rld": last 3 characters
s.split(", ")           // => ["Hello", "world"]: split at delimiter string

// Searching a string
s.indexOf("l")          // => 2: position of first letter l
s.indexOf("l", 3)       // => 3: position of first "l" at or after 3
s.indexOf("zz")         // => -1: s does not include the substring "zz"
s.lastIndexOf("l")      // => 10: position of last letter l

// Boolean searching functions in ES6 and later
s.startsWith("Hell")    // => true: the string starts with these
s.endsWith("!")         // => false: s does not end with that
s.includes("or")        // => true: s includes substring "or"

// Creating modified versions of a string
s.replace("llo", "ya")  // => "Heya, world"
s.toLowerCase()         // => "hello, world"
s.toUpperCase()         // => "HELLO, WORLD"
s.normalize()           // Unicode NFC normalization: ES6
s.normalize("NFD")      // NFD normalization. Also "NFKC", 
"NFKD"

// Inspecting individual (16-bit) characters of a string
s.charAt(0)             // => "H": the first character
s.charAt(s.length-1)    // => "d": the last character
s.charCodeAt(0)         // => 72: 16-bit number at the specified position
s.codePointAt(0)        // => 72: ES6, works for codepoints > 16 bits

// String padding functions in ES2017
"x".padStart(3)         // => "  x": add spaces on the left to a length of 3
"x".padEnd(3)           // => "x  ": add spaces on the right to a length of 3
"x".padStart(3, "*")    // => "**x": add stars on the left to a length of 3
"x".padEnd(3, "-")      // => "x--": add dashes on the right to a length of 3

// Space trimming functions. trim() is ES5; others ES2019
" test ".trim()         // => "test": remove spaces at start and end
" test ".trimStart()    // => "test ": remove spaces on left. Also trimLeft
" test ".trimEnd()      // => " test": remove spaces at right. Also trimRight

// Miscellaneous string methods
s.concat("!")           // => "Hello, world!": just use + operator instead
"<>".repeat(5)          // => "<><><><><>": concatenate n copies. ES6
```


JavaScript supports the use of Regular Expressions (which are a data type by themselves), via a literal syntax: `/regexp/`

`RegExp` objects define a number of useful methods:
```javascript
let text = "testing: 1, 2, 3";   // Sample text
let pattern = /\d+/g;            // Matches all instances (`g`) of one or more digits

pattern.test(text)               // => true: a match exists
text.search(pattern)             // => 9: position of first match
text.match(pattern)              // => ["1", "2", "3"]: array of all matches
text.replace(pattern, "#")       // => "testing: #, #, #"
text.split(/\D+/)                // => ["","1","2","3"]: split on nondigits
```
  
#### Boolean

Any JavaScript can be converted to a boolean:

_Falsy_ values in JS:

  - `undefined`
  - `null`
  - `0`
  - `-0`
  - `NaN`
  - `""` (empty strings)

All other values, including all objects (even empty arrays) are _truthy_.

#### `null`

It indicates the absence of a value (like Ruby's `nil`).

It can be thought as representing a program-level, normal, or expected absence of value.

No methods can be called on `null` (It cannot have properties)

#### `undefined`

It represents a deeper kind of absence: it is the value of variables that have not been initialized and the value you get when you query the value of an object property or array element that does not exist; it is also the return value of functions that do not explicitly return a value and the value of function parameters for which no argument is passed.

It is a predefined global constant (not a reserved keyword like `null`)

It can be thought as representing a system-level, unexpected, or error-like absence of value.

No methods can be called on `undefined` (It cannot have properties)

#### Symbol

They serve as non-string property names.

#### The Global Object

The global object is a regular JS object that serves a very important purpose: the properties of this object are the globally defined identifiers that are available to a JavaScript program.
When the JavaScript interpreter starts (or whenever a web browser loads a new page), it creates a new global object and gives it an initial set of properties that define:

- Global constants like `undefined`, `Infinity`, and `NaN`
- Global functions like `isNaN()`, `parseInt()`, and `eval() `
- Constructor functions like `Date()`, `RegExp()`, `String()`, `Object()`, and `Array()`
- Global objects like `Math` and `JSON` 

In Node, the global object has a property named `global` whose value is the global object itself.

In web browsers, the `Window` object serves as the global object to all JS code contained in the browser window it represents. This global `Window` object has a self-referential `Window` property that can be used to refer to the global object.

ES2020 defined a `globalThis` as the standard way to refer to the global object in any context. 

### Immutable Primitive **Values*** vs. Mutable Object **References**

In JS, primitives are immutable, and objects are mutable. It is obvious for booleans and numbers; all string methods that appear to return a modified string are, in fact, returning a new string value.

Primitives are compared **by value**: two values are the same only if they have the same value.

Objects are compared **by reference**: two distinct objects are not equal even if they have the same properties and values, even two distinct arrays are not equal even if they have the same elements in the same order. Objects can be also understood as _reference types_: two objects values are the same if they refer to the same underlying object.

Assigning an object or array to a variable simply assigns the reference: it does not create a new copy of the object.

### Variable Declaration, Assignment, and Scope

Before we can use variables or constants in a JS program, we must _declare_ them:
  - Post ES6 (2015): This is done with `let` and `const`
  - Pre ES6: This is done with `var`

The value of an assignment expression, is the value of the right-side operand. As a side effect, the `=` operator assigns the value on the right to the variable or property on the left so that future references to the variables or property evaluate to that value.

```js
i = 0; // Set the variable to number 0
o.p = 1; // Set property p of object o to number 1
```

#### Declarations with `let` and `const`

In modern JS, variables are declared with the `let` keyword:

```js
let i;
let sum;
```

We can also declare multiple variables in a single `let` statement:

```js
let i, sum;
```

It is a good practice to assign an initial value (initialize) to the variables when they are declared:

```js
let message = 'Hello';
let i = 0, j = 0, k = 0;
let x = 2, y = x ** 2; // Initializers can use previously declared variables
```

If you don't initialize a variable when you declare it with the `let` statement, the variable is declared, but its value remains `undefined` until it is initialized.

To declare a constant, use `const`. `const` works exactly like `let` except:
  - constants must be initialized when they are declared
  - constants cannot be reassigned (this causes a `TypeError` to be thrown)
  - It is a universal convention to give them names in all capital letters

`for`, `for/of` and `for/in` loops allow declaring the loop variable as part of the loop syntax itself (this is very common):

```js
for (let i = 0; i < 3; i++) console.log(i);
for (let datum of data) console.log(datum);
for (let property in object) console.log(property);
```

### Variable and Constant Scope

The scope of a variable is the region of your program source code in which it is _defined_ (reachable). Variables and constants declared with `let` and `const` are **block scoped**. This means that they are only defined within the block of code in which the `let` or `const` statements (their declarations) appears (and thus in all subsequent nested blocks within that block). 

JavaScript class and function definitions are blocks, and so are the bodies of `if/else` statements, loops, and so on. Roughly speaking, if a variable or constant is declared within a set of curly braces, then those curly braces delimit the region of code in which the variable or constant is defined. Of course, we cannot refer to that variable or constant before they are declared. Variables and constants that are part of `for`, `for/of` and `for/in` loop have the loop body as their scope.

When a declaration appears at the top level, outside any code blocks, we say it is a _global_ variable or constant, and has **global scope**. In Node and client-side JS modules, the scope of a global variable is the file that it is defined in. In traditional client-side JS, the scope of a global variable is the HTML document in which it is defined. That is: if one `<script>` declares a global variable or constant, that variable is defined in all the `<script>` elements in that document (that execute, after the `let` or `const` statement executes).

### Repeated Declarations and Variable Shadowing

It is a syntax error to use the same name with more than one `let` or `const` declaration in the same scope (_redeclare_ variables with the same name).

It is legal, but not a good practice (_shadowing_) to declare a new variable with the same name in a nested scope:

```js
let x = 1;
if (x === 1) {
  let x = 2;
  console.log(x); // Prints 2
}
console.log(x); // Prints 1
```

### Variable Declarations with `var`

Pre ES6, the only way to declare variables was `var`, and there was no way to declare constants.

They have the same syntax, but important differences:

- Variables declared with `var` are not block-scoped. Instead, _they are scoped to the body of the containing function, no matter how deeply nested they are inside that function_.

- If we use `var` outside a function body, it declares a global variable. But global variables declared with `var` differ from global variables declared with `let`:
  Globals declared with `var` are implemented as properties of the global object (we can refer via `globalThis`) But the properties created with global `var` declaration cannot be deleted with the `delete` operator. Global variables and constants declared with `let` and `const` are not properties of the global object.

- Unlike variables declared with `let`, it is legal to declare the same variable multiple times with `var`.

- **Hoisting**: when a variable is declared with `var`, the declaration is lifted-up or _hoisted_ to the top of the enclosing function. The _initialization_ remains when it was written, but the _declaration_ of the variables moves to the top of the function, so variables declared with `var` can be used, without error, anywhere in the enclosing function. (If the initialization code has not run yet, then the value of the variable may be `undefined`, but we won't get an error if we use the variable before it is initialized. This is a source of bugs)

### Destructuring Assignment

In a destructuring assignment, the value on the right-hand side of the `=` operator is an array of object (a _structured_ value), and the left-hand side specifies one or more variable names using a syntax that mimics array and object literal syntax. When a destructuring assignment occurs, one or more values are extracted (_destructured_) from the value on the right and stored into the variables named on the left:

```js
let [x, y] = [1, 2]; // Same as let x = 1, y = 2
[x, y] = [x + 1, y + 2]
```

This is also important because allows us to swap values:

```js
[x, y] = [y, x]; // Swap the value of the two variables
```

Destructuring assignment makes it easy to work with functions that return arrays of values:

```js
// Convert [x, y] coordinates to [r, theta] polar coordinates
function toPolar(x, y) {
  return [Math.sqrt(x*x+y*y), Math.atan2(y, x)];
}
```