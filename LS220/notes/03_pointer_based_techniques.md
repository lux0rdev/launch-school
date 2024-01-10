# 03 Introduction to Pointer-Based Optimization Techniques

This approach offers an optimization strategy that can transform our naive algorithms from quadratic solutions O(N^2) to linear solutions O(N), all while preserving a constant space complexity O(1). The greatest advantage of using pointer-based approaches is that they improve time complexity without the need for additional data structures.

We offer three basic strategies:

- Start-End Pointers
- Anchor/Runner Pointers
- K-Window Slide

## Two Pointers: Start/End

The Start-End Pointers approach involves using two pointers, namely the `start` and `end` pointers. These pointers define a segment within the list, and by manipulating them, we can efficiently process the elements within that segment. This technique is particularly useful in solving subarray problems, such as finding the longest increasing subarray or determining if an array is a palindrome.

The start-end pointer strategy is a powerful optimization technique commonly used for solving problems on sorted arrays.

### Sample problem

Given a sorted array in ascending order, our task is to find two numbers in the array that sum up to a target number, and return them. If you don't find a pair that adds up to the target, return null.
The order of the output array matters, and the number that appears first should be the first one in the output array.

```js
// Example:
// Input: nums = [1, 3, 6, 7, 8, 12], target = 14
// Output: [6, 8]

// Input: nums = [2, 6, 8, 10], target = 20
// Output: null
```

#### Naive Solution O(N^2)

One possible solution is to use nested loops to check all possible pairs of numbers in the array and find the desired sum. However, this approach would result in a time complexity of O(N^2), which is not efficient.

```js
function findTwoNumbers(nums, target) {
  const n = nums.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }

  return [];
}
```

#### Optimized Solution O(N)

To effectively use the start-end pointer strategy, we need to answer several key questions:

1. _Where does my `start` pointer begin?_ - The `start` pointer is initially set to the beginning of the array (index 0).
2. _Where does my `end` pointer begin?_ - The `end` pointer is initially set to the end of the array (index N-1), where N represents the length of the array.
3. _Under which condition do I move the `start` pointer?_ - We move the `start` pointer to the right (increment it) when the sum of the numbers at the `start` and `end` pointers **is less** than the target.
4. _Under which condition do I move the `end` pointer?_ - We move the end pointer to the left (decrement it) when the sum of the numbers at the `start` and `end` pointers **is greater** than the target.
5. _Under which condition do I cease the iteration?_ - We stop the iteration when we find our target number, or when the `start` and `end` pointers meet, indicating that there is no valid solution.

```js
function findTwoSum(array, target) {
  let start = 0;
  let end = array.length - 1;

  while (start < end) {
    const sum = array[start] + array[end];
    if (sum === target) {
      return [array[start], array[end]];
    } else if (sum < target) {
      start++;
    } else {
      end--;
    }
  }
  return null;
}
```

The start-end pointer strategy is effective in this case because the array is sorted in ascending order, meaning that smaller elements are located towards the beginning, while larger elements are positioned towards the end.

## Two Pointers: Anchor/Runner

The Anchor/Runner Pointers approach, also known as slow/fast pointers, employs two pointers with different speeds. The `anchor` pointer advances at a slower pace compared to the `runner` pointer. This technique is commonly used to solve problems such as finding the midpoint of an array or determining if an array has any duplicates. By carefully manipulating these pointers, we can efficiently navigate and process the elements of the array. There is a variant called the writer/reader approach.

In conclusion, the anchor-runner pointer strategy provides an effective and efficient method for manipulating arrays in place. 

### Sample problem

Given an array of positive integers and zeroes, our task is to move all zeroes to the end of the array while preserving the relative order of non-zero elements. The goal is to solve this problem in constant space complexity. If no zeroes are present in the array, no changes are needed.

```js
// Example:
// Input: nums = [0, 2, 0, 4, 8]
// Output: [2, 4, 8, 0, 0]
```

#### Naive Solution O(N^2)

1. Iterate through the array.
2. If the current element is zero, delete it from the array using the splice method.
3. Push the deleted zero to the end of the array using the push method.
4. Repeat steps 2 and 3 until all zeroes have been moved to the end of the array.
5. Return the modified array.

```js
function moveZeroesNaive(nums) {
  let i = 0;
  while (i < nums.length) {
    if (nums[i] === 0) {
      nums.splice(i, 1);
      nums.push(0);
    } else {
      i++;
    }
  }
  return nums;
}
```

The time complexity of the naive solution is O(N^2) since in each iteration through the array, we perform a deletion operation, which has a time complexity of O(N). This deletion operation is repeated for each element in the array, resulting in a quadratic overall time complexity.

#### Optimized Solution O(N)

1.	_Where does my `anchor` pointer start?_ - The `anchor` pointer is initially set to the beginning of the array (index 0).
2.	_Where does my `runner` pointer start?_ - The `runner` pointer is initially set to the beginning of the array (index 0) as well.
3.	_Under which condition do I move the `anchor` pointer?_ - We move the `anchor` pointer when the element at the `runner` pointer is non-zero.
4.	_Under which condition do I move the `runner` pointer?_ - We move the `runner` pointer on each iteration, regardless of the element.
5.	_What does the `anchor` pointer do besides moving?_ - It ensures that non-zero elements are moved towards the beginning of the array by swapping the element at its current index with the element at the index pointed to by the `runner` pointer.
6.	_What does the `runner` pointer do besides moving?_ - When the `runner` pointer encounters a non-zero element, it swaps the value at its current index with the value at the index pointed to by the `anchor` pointer.

```js
function moveZeroesToEnd(arr) {
  let anchor = 0;
  let runner = 0;

  while (runner < arr.length) {
    if (arr[runner] !== 0) {
      [arr[anchor], arr[runner]] = [arr[runner], arr[anchor]];
      anchor++;
    }
    runner++;
  }

  return arr;
}
```

##### The reader-writer variant O(N)

The anchor-runner swaps values within the array. When swapping elements is too costly (it is slow in the implementation language, or we are swapping big objects), this variant of the same approach can be beneficial.

1. _Where is my `anchor` pointer?_ - The `anchor` pointer (`writer`) is initially set to the beginning of the array (index 0).
2. _Where is my `runner` pointer?_ - The `runner` pointer (`reader`) is initially set to the beginning of the array (index 0) as well.
3. _Under which condition do I move the `anchor` pointer?_ - We move the `anchor` pointer (`writer`) when the element at the `runner` pointer is non-zero.
4. _Under which condition do I move the `runner` pointer?_ - We move the `runner` pointer (`reader`) on each iteration, regardless of the element.
5. _What does the `anchor` pointer do besides moving?_ - The `anchor` pointer (`writer`) indicates the position where the next non-zero element should be written.
6. _What does the `runner` pointer do besides moving?_ - The `runner` pointer (`reader`) iterates through the array, reading each element, and its goal is to find non-zero elements that will be written.

```js
function moveZeroes(nums) {
  let writer = 0;
  let reader = 0;

  while (reader < nums.length) {
    if (nums[reader] !== 0) {
      nums[writer] = nums[reader];
      writer++;
    }
    reader++;
  }

  while (writer < nums.length) {
    nums[writer] = 0;
    writer++;
  }

  return nums;
}
```

## Two Pointers: K-Window Slide

The K-Window Slide technique is applied when we need to process elements within a sliding window of size `K`. It involves maintaining a fixed-width window and sliding it through the list, updating the boundaries as we iterate. This technique is useful for solving problems such as finding the maximum or minimum sum of a fixed-size window within a collection, calculating sliding window averages, or solving substring-related problems.

### Sample problem

Write a function that takes an array of integers and an integer k as inputs and returns the maximum sum of any consecutive k elements in the array. If the array contains less than k elements, the function should return null. If the integer k is less than 1 return null as well.

```js
// Example:
// Input: nums = [3, 2, 6, 5, 1, 10, -2], k = 4
// Output: 22

// Input: nums = [1, 2, 3], k = 4
// Output: null

// Input: nums = [1, 2, 3], k = 0
// Output: null
```

#### Naive Solution O(N^2)

1.	Initialize max to the lowest possible integer.
2.	Iterate through the array, generate subarrays of length k and compute their sums.
3.	If the sum is greater than the max, reassign the max variable to the new sum.
4.	Return max.

```js
function maximumSum(nums, k) {
  if (nums.length < k || k < 1) {
    return null;
  }
  let max = Math.max(); // returns negative infinity
  for (let i = 0; i < nums.length; i++) {
    let subArr = nums.slice(i, i+k)
    let sum = subArr.reduce((a, b) => a + b, 0);
    if (sum > max) {
      max = sum;
    }
  }
  return max;
}
```

#### Optimized Solution O(N)

To utilize the K Window Slide strategy, let's first answer the questions from above, using the first test case where `k` is 4:

1. _Where do the `left` and `right` pointers start (what is the size of the window)?_ - In this case, we will start with a window size of 4, so the `left` pointer will start at index 0 and the `right` pointer will start at index 3.
2. _What does the `left` pointer do besides moving?_ - The `left` pointer is responsible for maintaining the window's size and updating the sum of elements within the window. As the window slides, the `left` pointer removes the element that is no longer part of the window from the current sum, before moving forward.
3. _What does the `right` pointer do besides moving?_ - The `right` pointer is also responsible for maintaining the window's size and updating the sum. As the window slides, the `right` pointer moves forward, adding the element that is now part of the window to the current sum.

```js
function maximumSum(nums, k) {
  if (nums.length < k || k < 1) {
    return null;
  }
  let left = 0;
  let right = k - 1;
  let sum = 0;

  for (let i = 0; i <= right; i++) {
    sum += nums[i];
  }

  let max = sum;

  while (right < nums.length - 1) {
    sum -= nums[left];
    left++;
    right++;
    sum += nums[right];
    max = Math.max(max, sum);
  }
  return max;
}
```
