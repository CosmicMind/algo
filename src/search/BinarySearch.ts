/* Copyright (C) 2022, CosmicMind, Inc. <http://cosmicmind.com>. All rights reserved. */

/**
 * @module InsertionSort
 *
 * Insertion sort is an `in place` sorting algorithm that holds a constant number
 *  of keys outside the sequence at any given time.
 *
 *  It is an efficient algorithm for smaller sizes of `S`, where `S` is a sequence
 *  of type `T` and size `n`, in the form
 *
 *     S[T] <= S[2] <= S[3] ... S[n -1] <= S[n]
 *  It works by comparing an unsorted value in the sequence to the other members
 *  of that sequence until it finds its new position.
 *
 *  For example:
 *
 *     Consider a sequence of numbers `A`, where `A` = {8, 3, 9, 10, 2, 4}
 *  Insertion sort begins at position `i` where A[i] = 3, and compares that value
 *  with position A[i - 1] = 8. If A[i] < A[i - 1], whereas 3 < 8, which is true,
 *  insertion sort will swap the value in position A[i] for that in position
 *  A[i - 1]. This sequence of operations continue until the first false result,
 *  that is A[i] > A[i - 1]. Insertion sort then moves to position A[i + 1] and
 *  continues the sequence of operations just as before.
 *  At worst case, the sorting algorithm will perform at O(n^2) performance, where
 *  all smaller values are pushed towards the end of the sequence causing a full
 *  reorder of the sequence itself, for example {7, 6, 5, 4, 3, 2, 1}, would need
 *  to be sorted to {1, 2, 3, 4, 5, 6, 7}. If the sequence has already been sorted
 *  than subsequent insertions and sorts will perform at O(n), thus making
 *  insertion sort a suitable sorting algorithm for sequential input of data that
 *  has a small size `n`.
 *
 * @performance O(log(n))
 */

// import { CompareFn } from '../utils/compare'
// import { LogarithmicSearch } from '../utils/search'

/**
 * @performance O(log(n))
 */
// export const binarySearch: LogarithmicSearch = <T>(data: T[], fn: CompareFn<T>): void => {
//
// }
