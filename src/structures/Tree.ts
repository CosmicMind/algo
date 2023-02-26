/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2022, Daniel Jonathan <daniel at cosmicmind dot com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its
 *    contributors may be used to endorse or promote products derived from
 *    this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES LOSS OF USE, DATA, OR PROFITS OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @module Tree
 */

import {
  assert,
  guard,
} from '@cosmicmind/foundationjs'

import {
  ListNode,
  List,
  listCreate,
  listIsFirst,
  listIsLast,
  listInsert,
  listAppend,
  listIterateFromFirst,
} from '@/structures/List'

import {
  StackNode,
  stackIterateFrom,
  stackDepth,
} from '@/structures/Stack'

export const TreeCompareFn = <T>(a: T, b: T): number => a === b ? 0 : a > b ? 1 : -1


/**
 * The `sentinel` value is used to determine
 * leaf nodes within the `Tree`.
 */
const sentinel = void 0

export type Tree = ListNode & StackNode & {
  parent?: Tree
  next?: Tree
  previous?: Tree
  children: List<Tree>
  size: number
}

export const treeCreate = <T extends Tree>(props?: Omit<T, keyof Tree>): T => ({
  ...(props ?? {}) as T,
  parent: sentinel,
  next: sentinel,
  previous: sentinel,
  children: listCreate<T>(),
  size: 1,
})

/**
 * @performance O(1)
 */
export function treeInsertChild<T extends Tree>(insert: T, parent: T): void {
  insert.parent = parent
  listInsert(parent.children, insert)
  treeIncreaseSize(parent, insert.size)
}

/**
 * @performance O(1)
 */
export function treeAppendChild<T extends Tree>(insert: T, parent: T): void {
  insert.parent = parent
  listAppend(parent.children, insert)
  treeIncreaseSize(parent, insert.size)
}

/**
 * @performance O(n)
 */
export const treeDepth = <T extends Tree>(node: T): ReturnType<typeof stackDepth> =>
  stackDepth(node)

/**
 * @performance O(1)
 */
export function treeIsRoot<T extends Tree>(node: T): boolean {
  return sentinel === node.parent
}

/**
 * @performance O(1)
 */
export function treeIsLeaf<T extends Tree>(node: T): boolean {
  return 0 === node.children.count
}

/**
 * @performance O(1)
 */
export function treeIsChild<T extends Tree>(node: T, parent: T, compare = TreeCompareFn): boolean {
  return guard<T>(node.parent) && 0 === compare(node.parent, parent)
}

/**
 * @performance O(1)
 */
export function treeIsFirstChild<T extends Tree>(node: T, parent: T, compare = TreeCompareFn): boolean {
  return listIsFirst(parent.children, node, compare)
}

/**
 * @performance O(1)
 */
export function treeIsLastChild<T extends Tree>(node: T, parent: T, compare = TreeCompareFn): boolean {
  return listIsLast(parent.children, node, compare)
}

/**
 * @performance O(1)
 */
export function treeIsOnlyChild<T extends Tree>(node: T, parent: T, compare = TreeCompareFn): boolean {
  return listIsFirst(parent.children, node, compare) && listIsLast(parent.children, node, compare)
}

/**
 * @performance O(n)
 */
export function treeIncreaseSize<T extends Tree>(node: T, size: number): void {
  assert(0 < size, 'size must be greater than 0')
  for (const n of stackIterateFrom(node)) {
    n.size += size
  }
}

/**
 * @performance O(n)
 */
export function treeDecreaseSize<T extends Tree>(node: T, size: number): void {
  assert(0 < size, 'size must be greater than 0')
  for (const n of stackIterateFrom(node)) {
    n.size -= size
  }
}

/**
 * @performance O(n)
 */
export function *treeIterator<T extends Tree>(node: T): IterableIterator<T> {
  yield node
  if (guard<T>(node.children)) {
    for (const n of listIterateFromFirst(node.children)) {
      yield *treeIterator(n as T)
    }
  }
}

/**
 * @performance O(n)
 */
export function treeQuery<T extends Tree>(node: T, ...fn: ((node: T) => boolean)[]): Set<T> {
  const r = new Set<T>()
  loop: for (const n of treeIterator(node)) {
    for (const f of fn) {
      if (f(n)) {
        continue
      }
      continue loop
    }
    r.add(n)
  }
  return r
}