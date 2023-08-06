# 01 The DOM

## The Document object

The Document object represents the HTML document that is displayed in the browser window or tab.

## The DOM

The Document Object Model (DOM) is the API that works with HTML documents, via the Document object.

HTML documents contain HTML elements nested within one another forming a tree-like structure. 

The DOM API mirrors the tree structure of an HTML document: for each HTML tag (one for HTML element) in the document, there is a corresponding Element object, and for each run of _text_ (including whitespace characters) in the document, there is a corresponding Text object. The Document, Element and Text classes are subclasses of the more general Node class, and Node objects are organized into a tree structure that JavaScript can query and traverse using the DOM API.

There is a JavaScript class corresponding to each HTML (tag) element type, and each occurrence of the tag in a document is represented by an instance of the class. The JavaScript element objects have properties that correspond to the HTML attributes of the tags.

In a tree, a node directly above another node is the _parent_ of that node; the nodes one level directly below another node are the _children_ of that node; nodes at the same level, with the same parent, are _siblings_. The set of nodes any number of levels below another node are the _descendants_ of that node. The parent, grandparent, and all nodes above a node, are the _ancestors_ of that node.

## The DOM API

The `window` object has a `document` property that refers to the Document object.

The Document object represents the content of the window (what is being displayed on the browser's window or tab). Thanks to the DOM API, we can represent and manipulate document content through the Document object.

The DOM interface provides the following functionality:

1. Select (or _query_) Document Elements.
2. Traverse the tree-like structure of the Document.
3. Query or set HTML element attributes.
4. Query or modify element content.
5. Create, move, remove nodes in the Document.

### 1. Select (or _query_) Document Elements

There are three ways to select specific elements in the document:

1. Using CSS selectors
2. Other methods
3. Shortcut properties

#### Using CSS selectors

The CSS syntax provides a powerful way to refer to specific elements or sets of elements within a document called _selectors_. This allows us to refer to elements within a document by type, ID, class, attributes, and position within the document.

[selectors cheatsheet]

We have two methods at our disposal: `querySelector()` and `querySelectorAll()`. Both are implemented by the Element class and the Document class. When invoked on an element, they will only return elements that are descendants of that element.

- `querySelector()` accepts a CSS selector as a string, and returns the first matching element, or `null` if there are no matches.

- `querySelectorAll()` works similarly, but returns the set of all elements that match the selector. The return value is an array-like object called a NodeList. This object is iterable and indexed, which means that they can be used with a `for`/`of` loop and a classic `for` loop. They also come with a `length` property. If there were no matches, the NodeList will have a `length` property of `0`.

#### Other methods

The DOM also defines other older element selection methods, more or less obsolete now. They all return a NodeList except `getElementById()`, which returns a single element. The NodeList object these methods return, however, are _live_: they are automatically updated to reflect changes in the DOM (this can lead to unexpected behavior, specially when you iterate over it or use the return value).

- `getElementById()`: the one that is mostly in use today. The argument is just the ID string, without `#`. Returns a single element.
- `getElementByName()`: Returns the list of all descendant elements that have an HTML `name` attribute with the passed in string value.
- `getElementByTagName()`: Returns the list of all descendant elements of the passed in type (i.e.: `h1`, `p`, etc.)
- `getElementByClassName()`: Returns the list of all descendant elements with a class as the passed in string (without the `.`)

#### Shortcut properties

The document defines shortcut properties to access certain kinds of nodes. These properties refer to HTMLCollection objects, which are similar to NodeList objects, but they can be indexed by element ID or name. For example, to access all images there is the `images` property, and the same with `forms` and `links` (`<a>` elements with `href` attributes only).

### Traverse the tree-like structure of the Document

The DOM traversal API does not provide any methods, but a series of properties to refer to the parent, siblings, and children relative to a given node.

There are two ways we can traverse the Document: as a tree of Element objects (ignoring non-Element objects), or as a tree of Node objects (including Text and Comment objects). These approaches are different based on the set of properties we use to traverse the tree.


#### As a tree of Element objects

- `parentNode`: it refers to the parent node, which can be an Element or the Document.
- `children`: it contains to a NodeList with all the immediate Element children.
- `childElementCount`: The number of Element children, equivalent to `children.length`.
- `firstElementChild`: The first Element child. `null` if the element has no children.
- `lastElementChild`: The last Element child. `null` if the element has no children.
- `nextElementSibling`: The Element sibling immediately after the element. `null` if the element has no siblings.
- `previousElementSibling`: The Element sibling immediately before the element.  `null` if the element has no siblings.

We use recursive functions to traverse the tree (as in any general tree data structure):

```js
function traverse(element, callBack) {
  callBack(element);                        // call function on current element
  for (let child of element.children) {     // iterate over all the children
    traverse(child, callBack);              // recurse on all the subsequent children
  }
}
```

#### As a tree of nodes

All Node objects are defined with the following properties:

- `parentNode`: it refers to the parent node, which can be an Element or the Document.
- `childNodes`: A read-only NodeList that contains all Node children (Element nodes, Text nodes, etc.)
- `firstChild`: The first child Node of node, `null` if the node has no children.
- `lastChild`: The last child Node of node, `null` if the node has no children. 
- `nextSibling`: The Node sibling immediately after the node. `null` if the node has no siblings.
- `previousSibling`: The Node sibling immediately before the node. `null` if the node has no siblings.
- `nodeType`: A number that specifies the type of node: `1` for Element, `3` for Text, `8` for Comment, `9` for Document.
- `nodeValue`: The textual content of a Text or Comment node (`null` for other types).
- `nodeName`: The HTML tag name of an Element object, in uppercase (`null` for other types).

It's important to note that this API is extremely sensitive to variations in the document text. For example, a newline character between the `<html>` and the `<head>` tag can make the document to have 3 direct children, and not the expected 2 (the head and the body of the HTML document).

### Query or set HTML element attributes

HTML consist of a tag name, a set of key-value pairs called _attributes_, and optional text content for some elements. 

There are various ways to query or to set attributes for elements:

- Via general methods
- HTML attributes as element properties


#### General methods

The Element class defines general methods:

- `getAttribute()`: retrieves the value of the attribute key passed in as a string, returns `null` if there's no attribute with that name.
- `setAttribute()`: sets the value of the attribute key passed in as a string.
- `hasAttribute()`: returns `true` if the element has an attribute with the passed in string as a name, 'false` otherwise.
- `removeAttribute()`: deletes attribute of the passed in name. This is the only way to delete attributes.

#### HTML attributes as element properties

It is much easier to work with HTML attributes as element properties: the attributes values of HTML elements (for all standard attributes of standard HTML elements) are available as properties of the HTMLElement objects that represent these elements.

- The `Element` class defines properties for the universal HTML attributes such as `id`, `title`, `lang`, and `dir`, and event handlers as `onclick`. 

- Element-specific subtypes define attributes specific for those elements. For example, to query the URL of an image element, we can use the `src` property of the Element object that represents that element. (For some elements, like the `<input>` element, some of their attributes have different property names, for example, the `value` attribute of the `<input>` is mirrored by the JavaScript `defaultValue` property. The JavaScript `value` property contains the user's current input, but changing this value does not affect the `defaultValue` property or the `value` attribute of the element.)

JavaScript property names are written in `camelCase` if the attribute is more than one word long. `onclick`, among a few others, are an exception.

Some HTML attribute names are reserved words in JavaScript, for example, the `class` attribute name is also a keyword in JavaScript. This attribute becomes `className` in JavaScript.

For the most part, the attributes have string values. For boolean attributes, the JavaScript values are booleans or numbers. Event handles always have functions or `null`.

Note that the only way to remove an attribute is the general `removeAttribute()` method. 

##### The `class` attribute

Element objects define a `classList` property that refers to an iterable array-like object with all the classes defined for that element. This object defines an interface with the following self-explanatory methods:

(passing the class name as a string)

- `add()`
- `rename()`
- `contains()`
- `toggle()`

### Query or modify document content

The content of an element can be understood as:

- an HTML string (like `'This is a <em> string </em> in an element.'`)
- a plain-text string (like `'This is a string in an element.`)

Both represent the element's content, but as different things.

#### Element content as HTML

There are two read/write properties and one method to interact with the element content:

- `innerHTML`: it returns the content of the element as a string of HTML. Setting this property invokes the web browser's parser and replaces the element's current content with a parsed representation of the new string. (This is a very efficient operation, unless the `+=` operator for appending content is used.)
- `outerHTML`: it returns the content of the element as a string of HTML, but this string includes the element itself (the opening and closing tags of the element). Setting the value of this property, the new content replaces _the element itself_. 
- `insertAdjacentHTML()`: This method accepts two arguments: the first argument is a string that represents the insertion point of the second argument; the second argument is an arbitrary string. The first argument string has to be one of the following:
    - `'beforebegin'`: right before the enclosing, first tag. 
    - `'afterbegin'`: right after the enclosing, first tag.
    - `'beforeend'`: right before the enclosing, last tag.
    - `'afterend'`:  right after the enclosing, last tag.


#### Element content as plain text

The `textContent` property is defined by the `Node` class, so it works for Text nodes and Element nodes. For Element nodes, it returns all the text in all descendants of the element (without the HTML syntax).

### Creating, inserting and deleting nodes.

The `Document` class defines instance methods for creating Element objects.

The `Element` and `Text` classes define instance methods for inserting, deleting, and replacing nodes in the tree.

We can create a new element with the `createElement()` method on a Document object, and add strings of texts or other elements to it on the resulting Element object with the `append()` or `prepend()` methods: (You can create Text nodes explicitly with `document.createTextNode()`, but there is rarely any reason todo so.)

```js
let paragraph = document.createElement('p'); // create an empty <p> element
let emphasis = document.createElement('em'); // create an empty <em> element
emphasis.append('Luke');                     // add text to the <em> element
paragraph.append('I\'m', emphasis, '!');     // add text to the <p> element
paragrah.prepend('Hi, ');
paragraph.innerHTML                          // => 'Hi, I'm <em>Luke</em> Luke!'
```

`append()` and `prepend()` can take any number of arguments, which can be strings or Node objects. String arguments are automatically converted to Text nodes. `prepend()` adds the arguments at the start of the children list. `append()` adds the arguments to the element at the end of the children list.

In case we wanted to insert an Element or Text node into the middle of the containing element's children list we should find a reference to a sibling node and call `before()` to insert the new content before that sibling or `after()` to insert it after that sibling:

```js
// Find the heading element with the class="greetings"
let greetings = document.querySelector('h2.greetings');

// Now insert the new paragraph and a horizontal rule after that heading
greetings.after(paragraph, document.createElement('hr'));
```

`before()` and `after()` take any number of string and node arguments and insert them all into the document after converting strings to Text nodes. 

`prepend()` and `append()` are only defined on Element objects, but `before()` and `after()` work with Element and Text nodes: you can use them to insert content relative to a Text node.

Elements can only be inserted at one spot in the document. If an element is already in the document, and you insert it somewhere else, the element will be moved to the new location, not copied.

To make a copy of an element, we can use the `cloneNode()` method, passing `true` as argument to copy all of its content.

You can remove an Element or Text node from the document by calling its `remove()` method, or you can replace it by calling `replaceWith()` instead. `remove()` takes no arguments; `replaceWith()` takes any number of strings and elements just like `before()` and `after()` do.


#### Older generation methods:

These methods are harder to use, and there is no reason to ever need them:

| Parent Node Method | description |
| --- | --- |
| `parent.appendChild(node)` | Append `node` to the end of `parent.childNodes` |
| `parent.insertBefore(node, targetNode)` | Insert node into `parent.childNodes` before `targetNode` |
| `parent.replaceChild(node, targetNode) `| Remove `targetNode` from `parent.childNodes` and insert node in its place |

`document.appendChild` causes an error. Use `document.body.appendChild` instead.

These methods insert a node before, after, or within an Element:

| Element Insertion Method | description |
| --- | --- |
| `element.insertAdjacentElement(position, newElement)` | Inserts `newElement` at `position` relative to `element` |
| `element.insertAdjacentText(position, text)` | Inserts Text node that contains `text` at `position` relative to `element` |

`position` must be one of the following String values:


| Position | description |
| --- | --- |
| `beforebegin` | Before the element |
| `afterbegin` | Before the first child of the element |
| `beforeend` | After the last child of the element |
| `afterend` | After the element |

We also can remove a node from the document with `parent.removeChild(node)`. If we remove a node, it becomes eligible for garbage collection unless we store a reference to it.


## The BOM

We can access other components of the browser itself with JavaScript beyond the DOM. For example:

- The windows used to display web pages.
- The browser's history.
- Sensors, including location.

These components comprise the Browser Object Model or BOM.