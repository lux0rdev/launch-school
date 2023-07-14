# Scope and Closures

## Scope Review

The scope of a variable is the region of your program source code in which it is defined (reachable). Variables and constants declared with let and `const` are block scoped. This means that they are only defined within the block of code in which the let or `const` statements (their declarations) appears (and thus in all subsequent nested blocks within that block).

JavaScript uses lexical scoping to determine where it looks for variables: the program's textual (lexical) structure determines the variable's scope. In other words: the source code defines the scope. When you write a function in your code, it creates a scope even if the function never gets executed and has no variables of its own. At any point in the program, there is a hierarchy of scopes from the local scopes up to the global scope.

When JavaScript tries to find a variable, it searches this hierarchy from the bottom to the top. It stops and returns the first variable it finds with a matching name. 

## Higher-order functions

When we say that JavaScript has _first-class functions_ we mean that, as objects, in this language functions can also work as any other value: they can be assigned to variables, stored in the properties of objects or the elements of arrays, passed by as arguments to other functions, etc. 

We talk about _higher-order functions_ to refer to particular functions that operate on another functions, for example, accepting other functions as arguments, returning a new function, or both. Higher-order functions become a powerful tool when we understand that in JavaScript functions are closures, and, through them, we can gain access to variables that would be otherwise out of scope, calling that functions from a context different from where they were defined.

## Closures and Private Data

Like most programming languages, JavaScript uses lexical scoping. This means that functions are executed using the variable scope that in effect _when they were defined_, not the scope in effect when they are invoked.

In order to implement lexical scoping, the internal state of a JavaScript function object must include, not only the function's code body, but also a reference to the scope in which the function definition appears. This combination of a function object and a scope (the set of variable bindings, its context) is called a _closure_: Functions take their contexts with them. More over, this set of variable references in the closure is _private_ to the function: they are not accessible by any other means from outside the function. In consequence, the function can have its own data stash or _state_, protected from any accidental or malicious modifications: this is key in achieving a form of data protection and encapsulation, and enforces the use of the appropriate interface to interact with the data in our program.

Closures' true power becomes apparent when they are invoked from a different scope than the one they were defined in. This happens most commonly when a nested function object is returned from the function within which it was defined. 

However, using closures to restrict data access can make further modifications to the code (_extend_ the code) much more difficult, as not always we will be able to modify the original definitions of the functions or classes. This happens when we want, for instance, to add extra methods to already created objects whose built-in methods are the only way to access some data.

## Garbage Collection

In JavaScript memory is managed automatically, which means that the user does not have to allocate chunks of memory for the necessary entities in the program (identifiers, values, objects...), and to _deallocate_ them when they are no longer needed. Deallocation here means to _mark_ a set of memory addresses to be eligible for being occupied by other values or `null` values: the process of automatic memory freeing is called _garbage collection_. Although a language with garbage collection (GC) gives its user less control over the computer, it also avoids the many possible bugs and memory leaks that usually accompany non-GC languages.

When this process occurs is out of the JavaScript user's control. A value becomes eligible to get garbage-collected when there are no references left to that value (this means that no variables, closures or objects contains references to the memory addresses in which the value is stored) It's important to note that, when a variable goes out of scope, there can be still references to its value in existence. However, we can _dereference_ by reassigning the variables associated with the function or object that contains the persisting reference to other value, like `null`.

### The Stack and the Heap

Most languages divide the memory in two sectors, the _stack_ and the _heap_. 

The stack contains most primitive values and references, since these values have a fixed size in bytes and the engine can calculate in advance the amount of space needed for them, and how much stack space it needs when what we call _hoisting_ occurs. When a function or block is executed, JavaScript allocates memory on the stack for the variables defined in it. When the function or block finishes its execution, that allocated memory is claimed by the system automatically. This process is not garbage collection, besides its similarity: the stack does not participate in garbage collection.

On the heap is stored everything that is not on the stack: bigger primitive values like `BigInt` or strings, which don't fit in the fixed sized stack values. Because each heap value can have a different size, new values have to be allocated as they are created, and, since the program can keep references to heap values, it needs to deallocate them when they are no longer needed: the garbage collector's task is to find these values and claim them again for the system to use.

A possible rudimentary approach to implement this system would be to use a reference counting system, deallocating values with 0 references; JavaScript engines use a _Mark and Sweep algorithm_ that avoids reference cycle problems (when values reference each other, thus not having 0 references), but can introduce other problems such as memory fragmentation.


## Partial Function Application

This technique takes advantage of closures and higher-order functions to return a new function that reduces the arguments required by that invoked function. This is very useful for when we want to encapsulate protected data and functionality in a function, while being able to pass the function around without losing that private data: closures are like objects in the sense that both can help us in organizing code in manageable units of data and behavior. 

There are two main ways to perform partial application:

- Without `Function.prototype.bind()`: This mode of partial application employs three functions: a _generator_ function, an _applicator_ function, and a _primary_ function. The generator creates and returns a new function, the applicator, and the applicator, when invoked, calls the primary function within its body. The main advantage is that the generator receives some arguments A upon invocation, then the applicator receives another set of arguments B upon invocation too, which, in turn, is able to invoke the primary passing it the arguments A and B. That's made possible because the applicator took A as part of its closure when it was created, so A is still in scope when it invokes the primary.

- With `Function.prototype.bind()`: this method allows us to create a permanently bound function, not only to a particular object as context (its first argument), but to other arguments as well (the extra arguments after the first one)

## Immediately Invoked Function Expressions

Immediately Invoked Function Expressions (IIFE) are function expressions invoked at the same time that they are defined. This is not possible with function declarations (a `SyntaxError` will be thrown). As with any function expression, IIFEs are not hoisted, and their name is optional (name is useful only for self-reference within the function- i.e.: recursion).  If the function expression occurs at the beginning of a line, it must be enclosed in parentheses; and an IIFE has always the argument list, empty or with arguments, at the end, to indicate that we are actually invoking it.

We can use IFFEs to implement two main powerful features in JavaScript:

- IFFEs as namespaces: Because of JavaScript lexical rules, variables declared within a function are not visible outside the function, so we can use an IIFE to define a temporary namespace to work with variables that won't pollute the global namespace, or in the case we are not sure the variables are going to conflict with other possible variables in the program.

- Create private data: We can use an IFFE to return a function with access to a private state via its closure, or we can use an IFEE to return an object that also has access to a private state via its methods' closures.
