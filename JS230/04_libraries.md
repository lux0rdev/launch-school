# 04 Libraries and Documentation

## How to read software documentation

Different types of documentation for different stages in the learning process:

1. General overview
2. Tutorials/How-to pages
3. API Reference
    - Learn the structure of the API reference (by method/class, by functionality, etc.)
    - Become familiar with the style and layout of syntax definitions; follow this pattern:
        - General description of the method/function.
        - Parameters/Arguments for the function.
        - Return value.
        - Code examples.

Other tips, trick and routines when studying documentation:

- Use mental models, and leverage those that already exist to learn new ones.
- Try things out (specially useful for bad documentation).
- Always check the software version.
- Use documentation as to make well-informed decisions.

## How to include an external library in the web application

### Host the files locally

- Within the appropriate folder of a well-structured directory:

```sh
├── index.html
├── assets
├── styles
├── javascript
│   ├── app.js
│   └── library
│       └── library_file.js
```

- Reference script file within the `<head>` element of the HTML document:

```html
<!doctype html>
<html lang="en">
   <head>
      <title>My Awesome Project</title>
      <script src="/js/library/library_file.js"></script>
   </head>
   <body>
   <!-- rest of html -->
</html>
```

### Use a Content Distribution Network (CDN)

- Include a `<script>` element within the `<head>` element with these attributes:
    - `scr`: the URL of the CDN
    - `integrity`: its value is verified by the browser to check if the resource is safe (has or has not been manipulated on transit)
    - `crossorigin`: its value helps the browser to process the CORS request correctly.

Some important points:

- The last two attributes are part of the _Subresource Integrity_, an essential browser's security feature.

- The `<script>` that loads the library should be included in the HTML _before_ any other script that uses that library.

## jQuery

This library was born with two main goals:

1. Provide a convenient API that groups DOM traversal and manipulation, event management, and networking functionality (send requests/handle responses) based on easy-to-use methods and properties.
2. Provide a universal standard able to work within the vast majority of browsers. This was specially important when there were major compatibility issues among browsers and API.

It's also important to note that jQuery is not different from JavaScript: it is just a library of functions and methods providing an extra convenient level of abstraction over vanilla JavaScript functionality.

### The jQuery function

jQuery works as a function to which we can pass:

- A string (a CSS selector) or a single DOM element
- A function.

If we passed a CSS selector string or a DOM element, this function will return a jQuery object that, not only _represents a collection of one or more elements_ (either the DOM element passed, or all elements that match the passed-in CSS selector string), but also has a number of _very useful methods_ to access or modify the elements represented in by the collection, or even to add new elements.

By convention, we name the jQuery functions as the character `$`, and the returned jQuery object is also prepended `$`:

```js
let $links = $('a'); // this function returns a jQuery object that represents all <a> elements in the document
```

#### The `jquery` property

We can check that a variable or property references a jQuery object by trying to access the `jquery` property; if it is, this property will be set to a string representing the jQuery version number, `undefined` otherwise.

#### The DOM Ready Callback

jQuery provides a way to run JavaScript code when the DOM content is loaded. There are two modalities:

- Code run when the DOM is loaded _without waiting for the assets to load (like images)_:

```js
$(handler)
```

```js
$(document).ready(handler)
```

(Only the first syntax is recommended; the other is deprecated)

- Code run when the DOM is fully loaded, _including all assets_:

```js
$(window).load(handler)
```

```js
$(window).on('load', handler)
```

The passed-in callback or _handler_ will be invoked as soon as the condition for each modality is met (DOM loaded, etc.)

### jQuery Object Methods

We use methods of the jQuery object (that contains a collection that represents one or more elements) to retrieve or modify the elements. Most of these methods work both as getters and setters: _if called without arguments, the method simply returns the value; if called with an argument, that argument is used to set some value._

#### Chaining Method Calls

Most of these methods also return a jQuery object, so we can chain multiple methods together:

```js
$elements.css('font-size', '12px').css('color', 'red');
```

#### Object Argument

Many methods accept a convenient object as argument, in which each key-value pair represents some property to be set; for instance:

```js
$element.css({
  'font-size': '12px',
  color: 'red',
})
```

#### Property Name Syntax

For property names that include hyphens (multi-word properties, like `font-size`), their names must be introduced as strings in the object argument, or in traditional JavaScript camel case: `fontSize`.

We may need to escape some CSS selector characters. jQuery also has some custom selectors.

#### Convenience Methods

jQuery also includes some convenient methods that are called directly on the jQuery object:

### jQuery DOM Traversal

jQuery objects offer useful methods for DOM traversal to be used from different perspectives:

#### Looking Upwards the Object

[Paraphrase]

(All these methods accept an optional selector string; If the selector is supplied, the elements will be filtered by testing whether they match it.)

(All these methods are called on a jQuery object that represent a collection of DOM elements)

| Name | Description |
| --- | --- |
| `parent([selector])`| Traverses to the immediate parent of each of these elements in the DOM tree and constructs a new jQuery object from the matching elements. Only travels a single level up the DOM tree. | 
| `parents([selector])`|  Searches through the ancestors of these elements in the DOM tree and construct a new jQuery object from the matching elements ordered from immediate parent on up | 
| `closest([selector])`| Searches through these elements and their ancestors in the DOM tree and constructs a new jQuery object from the matching elements; Begins with the current element; Travels up the DOM tree until it finds a match for the supplied selector; The returned jQuery object contains zero or one element for each element in the original set, in document order| 

#### Looking Downwards the Object

| Name | Description |
| --- | --- |
| `find(selector)` | Searches through the descendants of these elements in the DOM tree and construct a new jQuery object from the matching elements; travels many levels down |
| `children([selector])` | Get the _direct_ children of each element in the set of matched elements; only travels a single level down  |

The selector expression is required in a call to .find(). If we need to retrieve all the descendant elements, we can pass in the universal selector `*` to accomplish this.

#### Finding Sibling Elements

| Name | Description |
| --- | --- |
| `siblings([selector])`  |  Get the siblings of each element in the set of matched elements |
| `next([selector])`  |  Get the immediately following sibling of each element in the set of matched elements |
| `nextAll([selector])`  |  Get all following siblings of each element in the set of matched elements |
| `prev([selector])`  |  Get the immediately preceding sibling of each element in the set of matched elements |
| `prevAll([selector])`  |  Get all preceding siblings of each element in the set of matched elements |

### jQuery Event Management

We can use the `on()` method to register event listeners on a jQuery object representing one or more DOM elements (if it is the latter case, the listener will be registered on every element.)

The syntax for this method is:

`$elementCollection.on(events, [selector], [data], handler)`

| Parameter name | Required | Description |
| --- | --- | --- |
| `events` |  Yes  |  One or more space-separated event types  |
| `[selector]` | No   |  A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.   |
| `[data]` | No   |  Data to be passed to the handler in `event.data` when the event is triggered.  |
| `handler` | Yes  |  A function to execute when the event is triggered.  |

If `[selector]` is omitted or is `null`, the event handler is referred to as _direct_ or _directly-bound_. The handler is called every time an event occurs on the selected elements, whether it occurs directly on the element or bubbles from a descendant (inner) element.

When a `[selector]` is provided, the event handler is referred to as _delegated_. The handler is not called when the event occurs directly on the bound element, but only for descendants (inner elements) that match the selector. jQuery bubbles the event from the event target up to the element where the handler is attached.

We can remove an event handler that were registered using `on()` with the `off()` method. Calling `off()` with no arguments removes all handlers attached to the elements. Specific event handlers can be removed on elements by providing combinations of event names, selectors, or handler function names. When multiple filtering arguments are given, all the arguments provided must match for the event handler to be removed.

We can execute all handlers and behaviors attached to the matched elements for the given event type with the help of the `trigger()` method:

`$elementsCollection.trigger(eventType, [extraParameters])`

Any event handlers attached with `on()` or one of its shortcut methods are triggered when the corresponding event occurs. They can be fired manually, however, with the `trigger()` method.

### jQuery AJAX Requests

We can perform asynchronous HTTP requests (AJAX) via the `$.ajax([settings])` method. The `[settings]` parameter consists of a configuration object that can set all the request characteristics: URL, type (the method), the data type, headers, the data sent to the server, etc. This method will return a jQuery XHR object (`jqXHR`) on which we can invoke methods to handle different outcomes (success, error, etc.): `done()`, `fail()`, `always()`, among others. To these methods we pass a callback function that will be executed upon each outcome case.

This is an example of an HTTP request made from jQuery:

```js
$.ajax( {
  url: 'https://host.com/path',
  type: 'GET',
  dataType: 'json',
  headers: { name: 'value' },
  data: { a: "bc", d: "e,f" },
}).done(returnedData => { // this function will be invoked upon success
  // do something with response data
})
```

There are more simple, easier to use methods in jQuery to perform AJAX requests that also accept a configuration object argument, for instance: `get()`, `post()`, etc. 

There is also a very handy method `load()` that loads data from the server and place the returned HTML into the matched elements (on which we call this method)

## 'Templating' with JavaScript: Handlebars

Basic Handlebars use:

1. Create HTML code for template. It has to be wrapped by a `<script>` element:

```html
<script id='templateName' type='text/x-handlebars'>
 <!-- Template HTML code -->
</script>
```

2. Compile HTML code into a function via `Handlebars.compile()`
3. Register any partial template (templates that can be used by other templates) with `Handlebars.registerPartial(name, htmlCode)`
4. Inject return value of function from step 2 called with a _context_ argument.


Handlebars syntax:

- `{{propertyName}}`: anywhere in the template HTML code; it will be replaced by the value of the property from the passed in context argument object.

- `{{> partialTemplateName}}`: loads a partial (has to be registered first)

Handlebars blocks:

```html
{{#if propertyName}}
...
{{else}}
...
{{/if}}
```

```html
{{#each propertyName}}
...
{{@index}}
...
{{/each}}
```

## `fetch()`

The global `fetch()` method starts the asynchronous process of fetching a resource from the network, returning a promise which is fulfilled once the response is available.

The promise resolves to the `Response` object representing the response to your request.

A `fetch()` promise only rejects when a network error is encountered (which is usually when there's a permissions issue or similar). A `fetch() `promise does not reject on HTTP errors (`404`, etc.). Instead, a `then()` handler must check the `Response.ok` and/or `Response.status` properties.

Syntax:

```js
fetch(resource, [options])
```

- The `resource` can be a string containing the URL of the resource to fetch, or a `Request` object.
- `[options]` is an optional configuration object with any custom settings that you want to apply to the request. Useful options for this object are:
    - `method`
    - `headers`
    - `body`
    - `mode`
    - `redirect`

`fetch()` returns a Promise that resolves to a `Response` object. For this reason, we can chain multiple calls to `then()`, etc.