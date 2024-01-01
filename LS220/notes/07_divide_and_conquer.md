# 07 Divide & Conquer Algorithms

In computer science, the Divide and Conquer algorithm is a problem-solving technique that involves breaking down a complex problem into smaller sub-problems that are easier to solve individually. The solutions to these sub-problems are then combined to obtain the final answer. This algorithm can be divided into three main steps: _divide_, _conquer_, and _combine_.

### Divide: Breaking Down the Problem

By breaking down the problem into sub-problems, you reduce its complexity and make it more manageable. The division is performed in a way that ensures the sub-problems resemble the structure of the original problem, allowing the algorithm to be recursively applied.

### Conquer: Solving the Sub-Problems

Once the problem is divided into sub-problems, we proceed to conquer each sub-problem by solving them recursively. It's similar to working on each smaller puzzle section independently. We apply the same divide and conquer algorithm to each sub-problem until we reach a base case. The base case represents a sub-problem that is simple enough to be solved directly, without further division. By solving each sub-problem, we gradually progress toward solving the original problem.

### Combine: Merging the Solutions

After conquering the sub-problems and obtaining their solutions, the final step is to combine these solutions to derive the solution to the original problem. Going back to our jigsaw puzzle analogy, once all the smaller puzzle sections are solved, we merge them back together to form the complete picture. Combining the solutions is a crucial step in the divide and conquer algorithm, as it allows us to aggregate the individual solutions and derive the desired result.

The divide and conquer algorithm finds applications in various domains, including sorting algorithms (such as Merge Sort and Quick Sort), searching algorithms (like Binary Search), and computational geometry algorithms. These algorithms leverage the recursive nature of the divide and conquer approach to efficiently solve problems by breaking them down into smaller, manageable parts.

## Quicksort

QuickSort is a popular sorting algorithm used by many programming languages due to its exceptional speed and efficiency, particularly in average scenarios. Though it performs similarly to Insertion Sort and Selection Sort in worst-case scenarios (such as when dealing with inversely sorted arrays), it significantly outperforms them in average scenarios, which are more commonly encountered in practice.

### Partitioning

The fundamental part of the QuickSort algorithm is _partitioning_. To partition the array, we first select a pivot point, which is a somewhat random element in the array. Afterwards, we arrange the elements in such a way that elements smaller than the pivot are positioned before it, while elements larger than the pivot are placed after it. Elements equal to the pivot can be placed on either the left or right side, as long as we are consistent throughout the partitioning process.

#### Algorithm

1.	Choose the pivot element (it's best to use the middle element)**.
2.	In the second step, assign `left` and `right` pointers to the leftmost and rightmost indices of the remaining elements in the array, respectively.
3.	Increment the `left` pointer continuously, one cell at a time, until it reaches a value that is greater than or equal to the pivot or until it becomes greater than `right`.
4.	Decrement the `right` pointer continuously, one cell at a time, until it reaches a value that is less than the pivot, or until it becomes smaller than `left`.
5.	Once you're done incrementing and decrementing the pointers, evaluate whether the `left` pointer has gone beyond the `right` pointer.
    - If this is the case, move on to step 6.
    - If this is not the case, swap the values that the `left` and `right` pointers are pointing to, move both pointers toward each other, and repeat steps 3 and 4.
6.	Swap the value at the pivot index with the value the `right` pointer is pointing to. This places the pivot at its correct position in the array.

>** A crucial factor that significantly impacts the algorithm's performance is the selection of the pivot element. If the input array is already sorted or nearly sorted, using the first element as the pivot can lead to inefficient partitioning and a time complexity of O(n^2). 
>
>This degradation in performance is undesirable and undermines the primary objective of Quicksort. Opting for the middle element significantly improves the algorithm's overall performance. By selecting a pivot closer to the median value, the likelihood of encountering already sorted or nearly sorted input arrays decreases. This choice reduces the risk of worst-case scenarios and enables Quicksort to exhibit superior efficiency. 
>
>When the middle element is selected as the pivot, the partition function starts with the left pointer at the first element and the right pointer at the last element. Notably, the pivot is already in its correct sorted position, eliminating the need for extra swaps. When the middle element is the pivot, the recursive calls in the quickSort function include the pivot element. By doing so, the algorithm avoids worst-case scenarios and generally achieves better performance.

#### Implementation

```js
function partition(arr, low, high) {
  const pivotIndex = Math.floor((low + high) / 2);
  const pivot = arr[pivotIndex];
  let left = low;
  let right = high;

  while (left <= right) {
    while (arr[left] < pivot) {
      left++;
    }

    while (arr[right] > pivot) {
      right--;
    }

    if (left > right) {
      break;
    }

    // Swap values at left and right pointers
    [arr[left], arr[right]] = [arr[right], arr[left]];

    left++;
    right--;
  }

  // Return the pivot index
  return left;
}
```

### Adding Recursion

Relative to the pivot element, the elements are on the correct side but not in their correct places within the array. This is where recursion comes into play. After performing the initial partition, we treat the subarrays to the left and right of the pivot as their own arrays and recursively repeat the partitioning process. This recursive approach allows us to sort the entire array.

#### Algorithm

1.	Partition the array based on a chosen pivot element. Select a pivot element from the array and rearrange the elements so that all elements smaller than the pivot are placed to its left, and all elements greater than the pivot are placed to its right.
2.	Treat the subarrays to the left and right of the pivot as their own arrays and recursively repeat the first step. Partition each smaller subarray by selecting a new pivot and applying the partitioning process again.
3.	Continue recursively partitioning the subarrays until you reach subarrays that have zero or one element. These smaller subarrays serve as the base case, as an empty array or an array with one element is already sorted.

#### Implementation

```js
function quickSort(arr, low = 0, high = arr.length - 1) {
  const pivotIndex = partition(arr, low, high);
  if (low < pivotIndex - 1) {
    quickSort(arr, low, pivotIndex - 1);
  }
  if (pivotIndex < high) {
    quickSort(arr, pivotIndex, high);
  }
}
```

### Time Complexity

In Quicksort, the time complexity is influenced by two main factors: the partitioning step and the recursion step.

#### Partitioning Step

During the partitioning step, Quicksort scans the array once and partitions it based on the chosen pivot element. The partitioning process involves rearranging the elements such that elements smaller than the pivot are placed to the left, and elements greater than the pivot are placed to the right. On average, this process takes linear time, O(N), where N is the number of elements in the array. The exact implementation details of partitioning may vary, but the overall time complexity remains linear.

#### Recursion Step

After partitioning, as we have seen, Quicksort recursively applies the partitioning process to the subarrays created. This recursive process repeatedly divides the array into smaller parts until each subarray contains either zero or one element, which are already considered sorted. The recursion occurs on average log N times because each recursive call typically divides the array into two roughly equal-sized subarray.

#### Combining the Partitioning and Recursion Steps

Since the partitioning step takes linear time, and the recursion occurs logarithmically, we can multiply these complexities together. As a result, the overall average-case time complexity of Quicksort is expressed as O(N log N), where N is the number of elements in the array.

It is important to note that the O(N log N) time complexity represents the average-case scenario, which occurs when the input array is randomly ordered or has no specific patterns. In this case, Quicksort performs efficiently and sorts the array effectively.

However, in the worst-case scenario, as we have seen in previous assignments, the time complexity of Quicksort can degrade to O(N^2). This occurs when the input array is already sorted or nearly sorted, and a poor pivot selection strategy is used. 
