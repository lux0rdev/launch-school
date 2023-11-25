# 02 Asynchrony and Events

## Asynchrony

In a _synchronous_ computer program, the different operations are executed step by step (besides jumps, conditionals, etc.), following the main flow; the program executes some code, waits for the computation to end, and then does another operation with those results, until there are no more operations to be performed. This means that each operation depends on the previous one: the following computation can't be performed if the previous one has not finished and yielded its results. We can talk about operations _blocking_ the program in this case.

In most real-world computer programs (and in most real-world JavaScript), however, the execution is _asynchronous_. This means that there are operations performed _independently_ of the main program flow: when an asynchronous part of the program is executed, some operation (a function's invocation, for instance) is _left pending_, until some condition is met or some event occurs, _without blocking the program to wait for the result_.

> In other words, being JavaScript a single-threaded language, asynchronous JavaScript code allows us to perform long operations (like HTTP requests) without blocking the main thread.

At its core, asynchronous programming in JavaScript is based on _callbacks_, functions passed to other functions as arguments; when some event is triggered or some condition is met, the other functions invoke (_calls back_) the passed-in function. However, based on how this process is structured, what features of the JavaScript language is supported by, or what syntax is used, we can classify the different models of asynchronous programming by:

- Callback-based

    - Timers
    - Events
    - Network events

- Promise-based

    - without `async`/`await` syntax.
    - with `async`/`await` syntax.

It's very important to note that _all synchronous code runs before any asynchronous code does_. This happens because of the way JavaScript handles the synchronous and asynchronous parts in the same program: the event loop.

### The event loop

We can understand the JavaScript Runtime Environment as having three main components or _sub-environments_: the _call stack_; the web APIs (or the core C/C++ APIs if we are in Node.js); and the _message or macro-task queue_. The last two are not part of the JavaScript engine itself, but they belong to the browser's environment or the Node.js environment.

The call stack is the stack-like structure (Last In, First Out) that stores information about the active functions in a program in _frames_; once a function is executed, it is removed or _popped out_ from the top of the stack, so the one immediately below it can be invoked and popped. This is the basis for how recursion works.

The APIs handle the asynchronous code, whether it's timer-based or event-based. In essence, all of them are based on callbacks that will get executed when certain conditions are met (for instance, when a response arrives or an event occurs); when those conditions are met, the callbacks will be placed into the message queue.

The message or macro tasks queue is a queue-like structure (First In, First Out) that stores those callbacks: this structure acts as an intermediary state before they are pushed onto the call stack, in order to be executed as any other function. And here is where the _event loop_ comes in.

The event loop's job is to push the callbacks waiting in the message queue onto the call stack: it's called a loop because it continuously checks if the call stack is empty; if it is not, it will wait until it is, and, when it's finally empty, it will push the pending callback in the message queue onto the top of the call stack.

With ES6 and the arrival of promise-based asynchrony, the concept of _job queue/micro-task queue_ was introduced to manage Promises. This queue works in parallel to the message queue; the difference is that, in the micro-task queue, the promise-based callbacks have a higher priority over the callbacks in the message queue.

In practice, all this means that every piece of synchronous code will be executed first, as it will be immediately pushed onto the call stack; the asynchronous code, even if the promises are fulfilled immediately, will have to wait for the stack to be empty to execute. And, in this last case, Promises (_micro-tasks_) will have a higher priority over the callbacks pending in the message queue (_macro-tasks_).

Notice the order of execution:

```js
console.log('This first'); // 1 (Synchronous)
setTimeout(() => console.log('This last'), 0); // 4 (Asynchronous - Timer)
new Promise((res, _) => res('This third')).then(res => console.log(res)); // 3 (Asynchronous - Promise)
console.log('This second'); // 2 (Synchronous)
```

## Callback-based asynchronous programming

### Timers

The simplest kind of asynchronous programming can be achieved with the help of functions that execute another function (callback) after some time has passed, or upon previously-set intervals, without making the program to stop its main flow. These functions are:

- `setTimeout()`: this function accepts two arguments: the first one is the callback function, and the second is the amount of time in milliseconds. The callback will be _registered_ synchronously when the line is executed, but the function will be _asynchronously invoked_ when the milliseconds have passed. This method returns an identifier that we can pass to a `clearTimeout()` function to cancel the timer.

- `setInterval()`: this function accepts the same arguments as the previous one, but it will call the first argument on intervals of the specified milliseconds. This method returns an identifier that we can pass to a `clearInterval()` function to cancel the interval timer.

### Events

(See [02a_events.md](./02a_events.md))

### Network events

Another common sample of asynchronous programming in JavaScript is performing network requests: we can use `XMLHttpRequest` objects in combination with some event listeners to make HTTP requests and asynchronously handle the server's response when it arrives. For example:

```js
let request = new XMLHttpRequest();
request.open('GET', '/path');
request.send(); // The request is sent asynchronously

request.addEventListener('load', event => {
  if (request.status === 200) {
    // success
  } else {
    // log code, do some other thing
  }
})

request.addEventListener('error', event => {
  // handle error
})
```

## Promise-based asynchronous programming.

Promises are a core JavaScript feature released on ES6 designed to simplify asynchronous programming in this language. In essence, Promises are an easier alternative to pure callback-based asynchrony, seeking to solve two major problems the callback approach has:

- The first and most obvious problem with pure callbacks is that it is easy ending up with **multi-level callbacks**, one nested in each other, which makes code difficult to read: Promises reinvent this nested callback mess as a more linear _promise chain_, much easier to read and understand.
- The other major problem is **error handling**. If an asynchronous callback function throws an exception, there is no way for that exception to propagate back to the caller function: this is why pure callback-based code breaks exception handling. Promises, on the other hand, standardize error handling and provide a way for exceptions to propagate through the chain of Promises.

A Promise is an object that represents the _result_ of an eventual asynchronous operation. That result may or may not be ready at certain time; this is by design: there is no way to synchronously get the value of a promise, the only thing we can expect is to it to invoke some callback function when that value is ready.

It's important to note that Promises represent eventual **single** asynchronous operations, and cannot be used to represent repeated asynchronous operations.

### Promise terminology

There are five technical terms with precise answers whose differences have to be understood in order to really understand Promises.

- **Fulfilled**: we say that a Promise is fulfilled if the operation associated with it has been completed successfully. For instance, when we call `then()` with two callbacks as arguments, a fulfilled Promise would mean that the _first_ callback has been invoked.
- **Rejected**: If the operation failed. For instance, when we call `then()` with two callback as arguments, a fulfilled Promise would mean that the _second_ callback has been invoked.
- **Pending**: The initial state of a Promise; it's neither fulfilled nor rejected.
- **Settled**: The Promise that it is either fulfilled or rejected, but not pending.
- **Resolved**: Colloquially used as a synonym of _fulfilled_, but it's not quite the same. A promise can be _resolved_ but still _pending_: a resolved Promise is the Promise that has been bound or 'locked-onto' another Promise. For example, when the potential value of a Promise is another Promise, the first one may be resolved, but it won't be settled until the second Promise is also settled. When this happens, we say that the first Promise has been 'locked-in' to the second Promise, and the fate of the former (first Promise) depends entirely on the other (the second Promise).

```js
new Promise((resolveOuter) => { // First Promise
  resolveOuter(
    new Promise((resolveInner) => { // Second Promise
      setTimeout(resolveInner, 1000);
    }),
  );
});
```

In this case, the first Promise is immediately _resolved_ because `resolveOuter` has been called synchronously, but, as its value is another Promise (the second Promise), it won't be _fulfilled_ until 1 second later, when the second Promise fulfills.

### Basic Promise use

The basic components of Promise use are: functions that specifically return a `Promise` object; Promise instance (like `then()`); callbacks, and, in some case `Promise` class static methods that provide additional functionality for Promises (like `Promise.all()`). A typical example of a Promise-returning function is `fetch()`:

```js
fetch(someUrl)
  .then(response => {
    // does something with the Response object
  })
```

`fetch()` is a global function that sends an asynchronous HTTP request and returns a pending `Promise` object. The Promise defines a `then()` instance method: when the Promise is fulfilled (when the response arrives), the callback we pass to `then()` is invoked with the resolve value of the Promise as argument. In this case, the value of the `Promise` object returned by `fetch` is a `Response` object.

### `then()`

`then()` is the distinctive feature of Promises, and it works like a callback registration method for listeners, but each `Promise` object represents a single operation, and each callback within `then()` will only be called once.

The callback passed to `then()` will always be invoked asynchronously, even if the operation is already ready when `then()` is invoked.

Another very important point about promises is that, when we write chains of `then()` methods, we are not registering multiple callbacks on a single Promise: each invocation of `then()` returns a new `Promise` object, and that new `Promise` object won't be fulfilled until the function passed to `then()` finishes its execution.

As a convention, we name functions that return Promises with verbs, and we append `then()` to the function directly, instead of storing the Promise in a variable.

> Returns a new Promise immediately. This new promise is always pending when returned, regardless of the current promise's status.

> One of the `onFulfilled` and `onRejected` handlers will be executed to handle the current promise's fulfillment or rejection. The call always happens asynchronously, even when the current promise is already settled. The behavior of the returned promise (call it `p`) depends on the handler's execution result, following a specific set of rules. If the handler function:

- returns a value: `p` gets fulfilled with the returned value as its value.
- doesn't return anything: `p` gets fulfilled with undefined as its value.
- throws an error: `p` gets rejected with the thrown error as its value.
- returns an already fulfilled promise: `p` gets fulfilled with that promise's value as its value.
- returns an already rejected promise: `p` gets rejected with that promise's value as its value.
- returns another pending promise: `p` is pending and becomes fulfilled/rejected with that promise's value as its value immediately after that promise becomes fulfilled/rejected.

### Handling Errors with Promises

Every code that involves some kind of networking has to be prepared to deal with all the potential errors that can occur. When we use Promises, we can handle errors in two ways: via `then()`'s second argument, or with the `catch()` method.

#### with `then()` second argument

This method accepts another callback as a second argument: this is the error-handling function. If a Promise-based asynchronous operation completes normally, it passes the result of the Promise to the first argument of `then()`, the main callback. But, if there is an error, the Promise passes the exception (usually an `Error` object) to the second argument passed to `then()`, the error-handling function:

```js
fetch(someUrl)
  .then(mainCallback, errorHandlingCallback)
```

#### with `catch()`

In practice, the idiomatic way to handle errors in Promise-based asynchronous operations is to add a `catch()` invocation at the end of the Promise chain, passing the error-handling. Thanks to how Promises are implemented, any error will propagate, reaching the error-handling function.

```js
fetch(someUrl)
  .then(mainCallback)
  .catch(errorHandlingCallback)
```

`catch()` is really a shortcut for calling `then()` with a `null` first argument and a function as second argument.

In ES2018 a `finally()` method for Promises was introduced, which works similarly to the `finally` of `try`/`catch`/`finally` statements. We add this method at the end of a Promise chain, passing a callback as an argument; this callback will be invoked at the end when the Promise you called it on settles. _It won't be called with any arguments_, so we can't know if it was fulfilled or rejected, but this method is useful to make some kind of cleanup or closing connections.

### Promises in parallel

- `Promise.all()`: One of the Promise concurrency methods (it will tell all the promises in the argument array to run concurrently). It can be useful for aggregating the results of multiple promises. This method takes an array of `Promise` objects as argument and returns another Promise. That Promise will be fulfilled with an array of the fulfillment values of each of the input Promises in the array argument; it will be rejected if any of the input Promises is rejected. The argument array can take any kind of value: for non-Promise values, it will be treated as it is the value of an already fulfilled Promise.

- `Promise.allSettled()`: this method takes an array of Promises and returns another Promise. This Promise won't be fulfilled until all the Promises in the input array have settled. The value of this Promise is an array of special objects, one per input Promise, that have three properties: `status`, `value`, and `reason`, all self-explanatory.

- `Promise.race()`: This method takes an array of Promises and returns another Promise. This Promise is fulfilled or rejected when the first of the Promises in the input array is fulfilled or rejected (or the first of non-Promise values, as they count as immediately fulfilled).

### Promises based on synchronous values

`Promise.resolve()`: It takes a value as its single argument and returns a Promise that will immediately, but asynchronously, be fulfilled to that value.
`Promise.reject()`: It takes a value as its single argument and returns a Promise that will immediately, but asynchronously, be rejected with that value as the reason.

### Making Promises from scratch:

We invoke the `Promise()` constructor with `new`, passing an _executor_ function as only argument. The passed-in function has to be written with two expected parameters, that, by convention, are called `resolve` and `reject`. When the new `Promise` object is created, the corresponding functions for `resolve` and `reject` are also created and bound to the Promise. 

Then, as soon as the Promise is created, the executor function is invoked, along with the `resolve` and `reject` functions. The executor should make some asynchronous operation, to then call the `resolve` function to resolve (or fulfill) the newly created Promise, or `reject`, to reject it.

`resolve` and `reject` accept a single argument of any type, even another Promise (but remember that resolving the promise does not necessarily cause the promise to become fulfilled or rejected (i.e. settled)):

```js
resolve(value); // call on resolved
reject(reason); // call on rejected
```

`value` will become the resolve value of the Promise.

> `reject` has semantics close to the `throw` statement, so reason is typically an `Error` instance. If either value or reason is omitted, the promise is fulfilled/rejected with `undefined`.

In other words (MDN):

> The eventual completion of the asynchronous operation is communicated with the Promise via the side effect caused by `resolve` or `reject`: the side effect is that the Promise object becomes resolved:
>
> - If `resolve` is called first, the value passed will be resolved (It will be the value of the resolved Promise; the value passed to the callback in `then()`) The promise may stay pending (in case another thenable is passed), become fulfilled (in most cases where a non-thenable value is passed), or become rejected (in case of an invalid resolution value).
> - If `reject` is called first, the promise instantly becomes rejected.
> - Once one of the resolving functions (`resolve` or `reject`) is called, the promise stays resolved. _Only the first call to `resolve` or `reject` counts_.
> - If `executor` exits by throwing an error, then the promise is rejected. However, the error is ignored if one of the resolving functions has already been called (so that the promise is already resolved).

The promise object will become resolved when either of the functions are invoked. 

### `async` and `await`

These new keywords were introduced in ES2017, and their aim is to simplify Promise-based asynchronous code even more. `async` and `await` are basically wrappers for traditional Promises: they hide Promises, so the asynchronous code can look like synchronous code, thus making it much easier to read and understand.

#### `await` expressions

The `await` operator takes a Promise and turns it back into a return value or a thrown exception. It can be used with any value to wait for. If there is an expression `await p`, where `p` is a `Promise` object, this expression `await p` waits asynchronously until `p` is settled; if `p` is fulfilled, then the value of the `await` expression is the fulfillment value of `p`; if `p` is rejected, then the expression throws the rejection value of `p`.

We use the `await` operator before the invocation of a function that returns a Promise:

```js
let response = await fetch(url);
```

_Any code that uses the `await` keyword is itself asynchronous_: this keyword does not 'block' the program waiting for the result of the computation, it simply 'disguises' the asynchrony. However, using `await` _pauses the execution of its surrounding `async` function until the promise is settled_. When execution continues, the value of the `await` expression becomes that of the fulfilled promise.

Syntax: 

```js
await expression 
```

The `expression` can be a Promise, or any value to wait for. The return value is the fulfillment value of the promise, or the expression's own value if it's not a promise. It will throw the rejection reason if the promise is rejected.

In MDN words:

> `await` is usually used to unwrap promises by passing a Promise as the expression. Using `await` pauses the execution of its surrounding async function until the promise is settled (that is, fulfilled or rejected). When execution resumes, the value of the `await` expression becomes that of the fulfilled promise.
> If the promise is rejected, the `await` expression throws the rejected value. The function containing the `await` expression will appear in the stack trace of the error. Otherwise, if the rejected promise is not `await`ed or is immediately returned, the caller function will not appear in the stack trace.
> The expression is resolved in the same way as `Promise.resolve()`: it's always converted to a native Promise and then awaited. If the expression is:
> - A Promise: The promise is directly used and awaited natively, without calling `then()`.
> - Non-thenable value: An already-fulfilled Promise is constructed and used.
> Even when the used promise is already fulfilled, the `async` function's execution still pauses until the next tick. In the meantime, the caller of the `async` function resumes execution. 
> Because `await` is only valid inside `async` functions and modules, which themselves are asynchronous and return promises, the `await` expression never blocks the main thread and only defers execution of code that actually depends on the result, i.e. anything after the await expression.


#### `async` functions

Because any code that uses `await` is asynchronous, we can only use the `await` keyword within functions that have been declared with the `async` keyword:

```js
async function fetchProperty(url) {
  let response = await fetch(url);
  let content = await response.json();
  return content.someProperty;
}
```

A function declared this way makes its return value to be a Promise, even if the code within its body is not Promise-related. The apparent explicit return value of an `async` function (expression preceded by the `return` keyword), is, in fact, the resolve value of the function's real return value: a Promise. And, if the `async` Function seems to throw an exception, then the Promise object that the function returns will be rejected with that exception.

There are two important caveats to remember about `async` functions: first, that we can't use `await` on the top level or inside a function that is not declared with `async`; in these cases we will have to use classic Promise `then()` chains. Secondly, that we can use `async` with any function declaration, expression, arrow function, etc.

If the result of a second `await` does not depend on the first `await` expression (unlike the case in the previous snippet), we should try to fetch both resources concurrently: we can use `await` with a set of asynchronous `async` functions with the help of the `Promise.all()` method, as we did with classic Promises syntax:

```js
async function doubleFetch(url1, url2) {
  let promise1 = fetchProperty(url1);
  let promise2 = fetchProperty(url2);
  return await Promise.all([promise1, promise2]); 
}
```

Another great advantage of `async` functions is the ability to wrap our code in a `try`/`catch` block, instead of chaining `then()` and `catch()` like with traditional Promises:

```js
async function doubleFetch(url1, url2) {
  try {
    let promise1 = fetchProperty(url1);
    let promise2 = fetchProperty(url2);
    let valuesArray = await Promise.all(promise1, promise2);

    return valuesArray;
  } catch(error) {
    console.log(error);
    return 'Error found';
  }
}
```

According to MDN:

> The `async` function declaration creates a binding of a new `async` function to a given name. The `await` keyword is permitted within the function body, enabling asynchronous, promise-based behavior to be written in a cleaner style and avoiding the need to explicitly configure promise chains. 
> You can also define async functions using the `async` function expression.
> An async function declaration creates an `AsyncFunction` object. Each time when an async function is called, it returns a new Promise which will be resolved with the value returned by the async function, or rejected with an exception uncaught within the async function.
> Async functions can contain zero or more `await` expressions. Await expressions make promise-returning functions behave as though they're synchronous by suspending execution until the returned promise is fulfilled or rejected. The resolved value of the promise is treated as the return value of the `await` expression. Use of `async` and `await` enables the use of ordinary `try` / `catch` blocks around asynchronous code.
> Async functions always return a promise. If the return value of an async function is not explicitly a promise, it will be implicitly wrapped in a promise.

### Asynchronous iteration

[Rephrase, complete]

Because single Promises do not work for sequences of asynchronous events, we also cannot use regular `async` functions and the `await` statements for these things.

ES2018 provides a solution. Asynchronous iterators are like normal iterators, but they are Promise-based and are meant to be used with a new form of the `for`/`of` loop: the `for`/`await` loop.

Like a regular `await` expression, the `for`/`await` loop is Promise-based: the asynchronous iterator produces a Promise and the `for`/`await` loop waits for that Promise to fulfill, assigns the fulfillment value to the loop variable, and runs the body of the loop. And then it starts over, getting another Promise from the iterator and waiting for that new Promise to fulfill.

We can create asynchronously iterable objects by implementing a `[Symbol.asyncIterator]()` method on the object or by invoking an `async function *` generator function. Asynchronous iterators provide an alternative to 'data' events on streams in Node and can be used to represent a stream of user input events in client-side JavaScript.
