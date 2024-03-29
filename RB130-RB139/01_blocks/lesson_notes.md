Assessment study guide:

- Closures, binding, and scope
- How blocks work, and when we want to use them.
- Blocks and variable scope
- Write methods that use blocks and procs
- Understand that methods and blocks can return chunks of code (closures)
- Methods with an explicit block parameter
- Arguments and return values with blocks
- When can you pass a block to a method
- &:symbol
- Arity of blocks and methods


## Lesson 01: Blocks

(_remember to also study the exercises_)
___
Closures in Ruby:

  - `proc` objects, instances of the `Proc` class
  - lambdas
  - blocks

A **closure** is a concept in general programming that many languages implement in different ways. Closures allow to save chunks of code for a later use and execute them when needed. Closures bind their enviroment: they capture references to the surrounding artifacts (like variables or methods) that are in scope when the closures are created, defining an encapsulation or _enclosure_ around everything, so they still can be referenced and even reassigned when the closure is executed. They can be understood as a special kind of anonymous methods or functions that can be passed around and executed, but with the extra convenience of _remembering_ the entire context in which they were created.

The surrounding artifacts in scope at the time of the closure's creation is called its **binding**. The binding is comprised by local variables, method references, constants and other artifacts, defined BEFORE the the closure is created. If not, the variable will have to be explicitly passed to the closure if we want to use it. The closure will keep track of all the artifacts, retaining references to them. So, if, for example, a variable in a closure's binding it's reassigned to another object after the closure is created, the closure will keep track of that change, and the variable will refer to the newly assigned value.
___

### a. How methods interact with blocks

Every method call in Ruby has the following syntax:

  - A receiver object or variable (defaulting to self if absent)
  - A dot (required if there’s an explicit receiver; disallowed otherwise)
  - A method name (required)
  - An argument list (optional; defaults to `()`)
  - A code block (optional; no default)

Note that the argument list and the code block are separate.

(If a method seems to be ignoring a block that you expect it to yield to, look closely at the precedence rules and make sure the block really is available to the method.)

For example:
```ruby
[1, 2, 3].each do |number|
  puts number
end
```
- `[1, 2, 3]` is the receiver object on which we call the `Array#each` method.
- `.` is the _message sending operator_ through which we send the _message_ with the method name to the receiver object `[1, 2, 3]`
- `each` is the method name we send to the receiver object, that will indicate it to execute the `Array#each` method.
- `do (...) end` is the block we provide to the method call. We _pass in_ the block to the `Array#each` method _as an argument_ at method invocation time. 

(According Launch School resources, the block is an argument we pass in to the method, but this is not technically correct. The block is part of the method invocation syntax, not an argument. Here we are providing an empty list of arguments to `Array#each`. Arguments and blocks are different constructs, refer to different things, and exist independently of each other, although methods make use of both.)

In Ruby, every method accepts an optional block provided to its invocation (in other words, every method takes an implicit block regardless of its definition). How the block affects to the method's return value depends on the method's implementation.

We have to differentiate between a method's implementation and the method invocation.

Defining methods with an explicit block parameter:

We can define a block as a method parameter, the block will be assigned to it so it can be referenced, reassigned, passed around and invoked like any other object stored in a variable.
To define a explicit block as a parameter, we have to add an `&` symbol before the parameter's name in the method definition.
Adding the `&` symbol makes Ruby to convert the block we provided to a `Proc` object (an instance of the `Proc` class, the encapsulation of a code block). As it has been already converted, we won't need the `&` symbol to refer to the `Proc` object within the method. This variable is a _handle_ that allows us to pass the `Proc` to another method, and to call methods on it.
To invoke the `Proc` object within the method's definition, we call the `Proc#call` method on it instead of using `yield`. We can even pass arguments to the explicit block by passing them as arguments to `Proc#call`. This method, like `yield`, will return the last evaluated expression's return value in the code executed.


### b. Yield

With the `yield` keyword we can execute the code inside the block (a.k.a. _calling_ the block) provided to the method from within the method's definition.

When the method _yields_ to the block, the code in the block runs, and then control returns to the method. Yielding isn’t the same as returning from a method. Yielding takes place while the method is still running. After the code block is executed, control returns to the method at the statement immediately following the call to `yield`.

If a method's implementation contains a `yield`, a developer using the method can inject aditional code in the middle of the method execution without altering the method's definition. This provides a very handy extra flexibility to the method, hence one of the great advantages of using code blocks in Ruby.

The `LocalJumpError` exception:

It is raised when the method includes a `yield` and expects a block that was not provided in the method invocation. This error can be avoided wrapping the `yield` call in a conditional, making use of the `Kernel#block_given?` method. This provides the flexibility for a method to work with and without a block.

We can define block parameters in the block we provide to the method (between `|` after `{` or `do`). Within the block, the parameter will be a **block local variable**, a special type of local variable whose scope is limited to the block. If we name a block parameter like a variable in scope when the block is defined, that outer variable will be _shadowed_ by the parameter of the same name, and we won't be able to access that outer variable from within the block.

`yield` accepts an argument list that will be passed to the block, in which the block parameters will be assigned to the arguments passed in from the method, so they can work as block local variables within the block. These arguments can be mutated permanently by a _destructive_ method inside the block like another method.

`yield` returns the return value of the block it yields to, which which will be its last evaluated expression. 

### c. Arity

**Arity** refers to the rule regarding the number of arguments that you must pass a block, `proc` or `lambda`.

In Ruby, blocks and `procs` have **lenient arity**, so that Ruby doesn't raise an exception when less or more arguments are passed to the block than the number of block parameters.

Methods and `lambdas` have **strict arity**, which means that the same number of arguments have to be passed to them as the number of parameters the method or `lambda` defines.

If the method or block allows any kind of optional arguments (like `*sponge` arguments), the arity rules do not apply to those arguments.

### d. When and why use blocks in your own methods

Two main use cases for using blocks in your own methods are:

1. To defer some implementation code to method invocation decision.

   Blocks allow the method user to fine tune the behavior of a method at invocation time, extending its capabilities without altering the method implementation. This gives the method great flexibility, as we can adapt its generic behavior with a code block appropiate to each situation.

   Example:

2. Methods that need to perform some 'before' and 'after' operations (_sandwich code_)

   We can implement methods designed to perform a task between two other operations. We can implement the 'before' and 'after' operations, and let the method user to decide what task should be performed between them via a block: that task will be the execution of the code block we provided at invocation time.

   Example:

### e. Using closures

Closures retain, _bind_, their surrounding context, they retain reference to the artifacts in its environment at the time of its creation, like variables, constants or even methods. This is called its **binding**. A closure keeps track of its binding in order to be executed later. However, local variables must be defined before the closure's creation so it can access them; if not, we will need to explicitly pass the local variables  to the closure at the time of its invocation.

This can be very useful when methods or blocks return a closure via, for instance, a `Proc` object: the `Proc` object will form a closure with its environment at the time of its creation. Each new `Proc` object created in the same environment will have its own closure.

### f. Blocks and variable scope

The surrounding artifacts in scope at the time of the closure's creation is called its **binding**. The binding is comprised by local variables, method references, constants and other artifacts, defined BEFORE the closure is created. If not, the variable will have to be explicitly passed to the closure if it has to use it in any way. The closure will keep track of all of them; so, if, for example, a variable in scope it's reassigned to another object after the closure's creation, the closure will keep track of that change, and will be able to reference the variable's newly assigned object.

- Blocks create a closure when they are passed to a method
- `Proc` objects and lambdas create a closure when they are created (whent the `Proc` class is instantiated)

Bindings and closure determine the variable scope rules in Ruby. 'Inner scopes' can access 'outer scopes' because, at the time of the code execution in the 'inner scope', variables from the 'outer scope' are variables that are already in scope: they form part of the environment, are part of the binding, so they are retained by the 'inner scope' closures, but not viceversa, because they were not variables that were in scope at the moment of the execution of the code in the 'outer scope'.

### g. Symbol to proc
___
When applied to an argument object for a method, a lone & causes ruby to try to convert that object to a block. If that object is a proc, the conversion happens automatically, just as shown above. If the object is not a proc, then & attempts to call the #to_proc method on the object first. Used with symbols, e.g., &:to_s, Ruby creates a proc that calls the #to_s method on a passed object, and then converts that proc to a block. This is the "symbol to proc" operation (though perhaps it should be called "symbol to block").
___

If we want to invoke a method on each element in a collection, we can use the shortcut:
```ruby
collection_object.iterator_method(&:symbol_name_for_method_to_be_invoked_on_each_element)
```
Unfortunately, we can't use this shortcut for methods that take arguments.

The mechanism at work is: 
1. We apply the `&` operator to an object(usually referenced by a variable)
2. Ruby converts the object to a `Proc` if not already one. (calling `Symbol#to_proc` in the example)
3. Ruby then converts the `Proc` into a block

___
Note that `&`, when applied to an argument object is not the same as an & applied to a method parameter, as in this code:

```ruby
def foo(&block)
  block.call
end
```
- While `&` applied to **an argument object** causes the object to be converted to a block, 

- `&` applied to **a method parameter** causes the associated object to be converted to a `proc`. 

In essence, the two uses of `&` are opposites.
___



