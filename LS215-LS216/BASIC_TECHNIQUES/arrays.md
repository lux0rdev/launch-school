# Basic Array techniques:

0. [Get number of occurrences of a primitive element in array](#get-number-of-occurrences-of-a-primitive-element-in-array)
1. [Get array of SUBARRAYS with consecutive elements from array](#get-array-of-subarrays-with-consecutive-element-from-array)
- [Get array of subarrays with all possible combinations of size 3 from arrays of numbers](#get-array-of-subarrays-with-all-possible-combinations-of-size-3-from-arrays-of-numbers)
- [Get array of subarrays with all possible combinations of any size from array of characters or numbers](#get-array-of-subarrays-with-all-possible-combinations-of-any-size-from-array-of-characters-or-numbers-order-does-not-matter---not-repeated-combinations)
2. [Find out if array has DUPLICATES](#find-out-if-array-has-duplicates)
3. [REMOVE DUPLICATES in an array](#remove-duplicates-in-an-array)
4. [COMPARE if two arrays have the same type of values (are equivalent)](#compare-if-two-arrays-have-the-same-type-of-values-are-equivalent)
5. [REMOVE SPARSE areas from an array](#remove-sparse-areas-from-an-array)
6. [FILTER OUT NaN values from an array](#filter-out-nan-values-from-an-array)
7. [Get MAX/MIN VALUE from a list of arguments](#get-maxmin-value-from-a-list-of-arguments)
8. [Get all possible COMBINATIONS and PERMUTATIONS (same elements, different order) from an array:](#get-all-possible-permutations-same-elements-different-order-from-an-array)
9. [SORT list of STRINGS, case insensitively](#sort-list-of-strings-case-insensitively)
10. [COPY an ARRAY populated by primitive values](#copy-an-array-populated-by-primitive-values)
11. [SWAP VALUES in an array](#swap-values-in-an-array)
12. [DELETE only CERTAIN ELEMENTS from an array, in place](#delete-only-certain-elements-from-an-array-in-place)
13. [How to get recursively the DEPTH of an array:](#how-to-get-recursively-the-depth-of-an-array)
14. [How to make a DEEP COPY of an array](#how-to-make-a-deep-copy-of-an-array)
15. [Create a copy of an array with values SORTED BY TYPE, discriminating `null` values](#create-a-copy-of-an-array-with-sorted-elements-by-type-discriminating-null-values)
16. [Check if an array is a list of CONSECUTIVE numbers, ASCENDING or DESCENDING](#check-if-an-array-is-a-list-of-consecutive-numbers-ascending-or-descending)
17. [Check if two arrays have the SAME PRIMITIVE VALUES](#check-if-two-arrays-have-the-same-primitive-values)
18. [Check if an array has sparse areas](#check-if-an-array-has-sparse-areas)

## Get number of occurrences of a primitive element in array

```js
function count(element, array) {
  return array.filter(e => e === element || (isNaN(e) && isNaN(element))).length;
}
```

## Get array of subarrays with consecutive element from array

```js
let array = [1, 2, 3, 4];
let subarrays = [];
let subarrayMinSize = 2;
for (let i = 0; i < array.length; i += 1) {
  for (let j = i + subarrayMinSize; j <= array.length; j += 1) {
    subarrays.push(array.slice(i, j))
  }
}

subarrays // => 
// [
//   [ 1, 2 ],
//   [ 1, 2, 3 ],
//   [ 1, 2, 3, 4 ],
//   [ 2, 3 ],
//   [ 2, 3, 4 ],
//   [ 3, 4 ]
// ]
```

## Get array of subarrays with all possible combinations of size 3 from arrays of numbers

```js
let numbers = [1, 2, 3, 4]
 let combinations = [];

  for(let i = 0; i < numbers.length -2; i += 1){
    for(let j = i + 1; j < numbers.length -1; j += 1){
      for(let k = j + 1; k < numbers.length; k += 1){
         combinations.push([numbers[i], numbers[j], numbers[k]]);
      }
    }
  }
```

## Get array of subarrays with all possible combinations of any size from array of characters or numbers (order does not matter - not repeated combinations)

```js
function nCombinations(array, size) {
  let combinations;
  let partA;
  let partB;
  
	// Guard clauses:
	// There is no way to take e.g. arrays of 5 elements from
	// a array of 4.
	// if (k > array.length || k <= 0) return [];
	
	// K-sized array has only one K-sized subarray.
	// if (k === array.length) return [array]; 
	
	// Base case: There is N 1-sized subarrays in a N-sized array.
	if (size === 1) return array.flat();

	combinations = [];
	for (let i = 0; i < array.length - size + 1; i += 1) {
		// partA is a list that includes only our current element.
		partA = array.slice(i, i + 1);
		// We take smaller combinations from the subsequent elements
		partB = nCombinations(array.slice(i + 1), size - 1);
		// For each (k-1)-combination we join it with the current one 
		// and store it to the array of k-combinations.
		for (let j = 0; j < partB.length; j += 1) {
			combinations.push(partA.concat(partB[j]));
		}
	}
	return combinations;
}
```

## Find out if array has duplicates

```js
function hasDuplicates(array) {
  let noDuplicates = [...new Set(array)].join('');

  return noDuplicates !== array.join('')
}

let a = [1,1,2,2];

hasDuplicates(a); // => true
```

## Remove duplicates in an array

```js
let a = [1,1,2,2];
[...new Set(a)];
```

## Compare if two arrays have the same type of values (are equivalent)

```js
function arrayComparison(arrayA, arrayB) {
  function getType(value) {
    if (Array.isArray(value)) return 'array';
    else if (isNaN(value)) return 'NaN';
    else if (value === null) return 'null';
    else return typeof value;
  }

  function count(typeToCount, array) {
    let counter = 0;
    array.forEach(element => {
      if (getType(element) === typeToCount) counter += 1;
    })

    return counter;
  }

  const TYPES = ['NaN', 'null', 'undefined', 'boolean', 'array', 'object', 'number', 'string'];
  if (arrayA.length !== arrayB.length) return false;

  for (let i = 0; i < TYPES.length; i += 1) {
    let type = TYPES[i];
    if (count(type, arrayA) !== count(type, arrayB)) return false;
  }

  return true;
}
```

## Remove sparse areas from an array

```js
let a = [1,,,,,,2];
a.filter(() => true) // => [1, 2] 
```

## Filter out NaN values from an array

```js
let a = [1,NaN,2];
a.filter((element) => !isNaN(element) ) // => [1, 2]
```

## Get max/min value from a list of arguments

```js
let a = [1, 2, 3];
Math.max(...a); // => 3
Math.min(...a); // => 1
```

## Get all possible permutations (same elements, different order) from an array:

Combinations all sizes, in the same order as the input array
```js
function combinations(array) {
  return array.reduce((accumulator, element) => {
    let newCombination = accumulator.map(combination => combination.concat(element));
    accumulator.push([element], ...newCombination);
    return accumulator
  }, []);
}
```


```js
function permutations(array) {
  function permute(array, accumulator = []) {
    if (array.length === 0) {
      output.push(accumulator)
    } else {
      for (let i = 0; i < array.length; i++) {
        let current = array.slice();
        let next = current.splice(i, 1);
        permute(current.slice(), accumulator.concat(next));
     }
   } 
  }

  let output = [];

  permute(array);

  return output;
}

let a = ['a', 'b', 'c'];
permutations(a); // =>
//                 [
//                   [ 'a', 'b', 'c' ],
//                   [ 'a', 'c', 'b' ],
//                   [ 'b', 'a', 'c' ],
//                   [ 'b', 'c', 'a' ],
//                   [ 'c', 'a', 'b' ],
//                   [ 'c', 'b', 'a' ]
//                 ]
```

## Sort list of strings, case insensitively

```js
let list = ['ZZZ', 'bbb', 'AaA'];

list.sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1);

list // => [ 'AaA', 'bbb', 'ZZZ' ]
```

## Create an empty matrix (square) 

```js
function createMatrix(order) {
  let output = [];

  for (let i = 0; i < order; i += 1) {
    output.push([]);
  }

  return output;
}
```

## Copy an array populated by primitive values

```js
let a = [1, 2]

let copy = [...a];
```

## Swap values in an array

```js
let a = [1,2,3];
[a[0], a[2]] = [a[2], a[0]]
a // => [3,2,1]
```

## Delete only certain elements from an array, in place

```js
let a = [0, 1, 2, 3]

let i = 0
while (i < a.length) {
  if (a[i] % 2 !== 0) a.splice(i, 1);
  else i += 1;
}
```

## How to get recursively the depth of an array:

```js
function depth(value) {
  return Array.isArray(value) ? 1 + Math.max(0, ...value.map(depth)) : 0;
}
```

## How to make a deep copy of an Array

```js
let original = [{a: 1}];
let copy = JSON.parse(JSON.stringify(original));
original[0].b = 2;
copy = [{a: 1}]; 
original = [{a: 1, b: 2}]; 
```

## Create a copy of an array with sorted elements by type, discriminating `null` values

```js
function sortUniversal(array = []) {
  return [...array].sort((a, b) =>  {
    let [typeA, typeB] = [typeof a, typeof b];
    if (a === null) return 1;
    else if (b === null) return -1;
    else if (typeA < typeB) return -1;
    else if (typeA > typeB) return 1;
  })
}
```

## Check if an array is a list of CONSECUTIVE numbers, ASCENDING or DESCENDING

```js
  function areConsecutives(array) {
    if (array.length === 1) return true;
  
    let ascending = array.slice(1).every((number, index) => number === array[index] + 1)
    let descending = array.slice(1).every((number, index) => number === array[index] - 1)
    return ascending || descending;
  }
```

## Check if two arrays have the same primitive values

```js
function compareArrays(arrayA, arrayB) {
  if (arrayA.length !== arrayB.length || 
      Object.keys(arrayA).join() !== Object.keys(arrayB).join()) {
    return false;
  }

  let sortedA = [...arrayA].sort();
  let sortedB = [...arrayB].sort();
  
  // alternative using strings
  if (sortedA.join('') !== sortedB.join('')) return false;

  for (let i = 0; i < sortedA.length; i += 1) {
    let elementA = sortedA[i];
    let elementB = sortedB[i];
    if (isNaN(elementA) && !isNaN(elementB)) return false;
    else if (isNaN(elementA) && isNaN(elementB)) continue;
    else if (elementA !== elementB) return false;
  }

  return true;
}
```

## Check if an array has sparse areas

```js
function isSparse(array) {
  return /\,\,/.test(array.join());
}
```