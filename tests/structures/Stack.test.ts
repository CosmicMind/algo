/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2022, Daniel Jonathan <daniel at cosmicverse dot org>
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
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import test from 'ava'

import { guardFor } from '@cosmicverse/foundation'

import {
  Stackable,
  stackableCreate,
  Stack,
  stackCreate,
  stackPeek,
  stackPush,
  stackPop,
  stackClear,
  stackIterator,
} from '../../src'

const sentinel = void 0

class StackNode implements Stackable {
  readonly parent?: Stackable
  readonly key: number
  readonly value: string
  constructor(key: number, value: string) {
    this.parent = sentinel
    this.key = key
    this.value = value
  }
}

interface StackableNode extends Stackable {
  key: number
  value: string
}

const createStackableNode = (key: number, value: string): Readonly<StackableNode> =>
  stackableCreate<StackableNode>({
    key,
    value,
  })

test('Stack: stackableCreate', t => {
  const node = stackableCreate({})

  t.true(guardFor<Stackable>(node, 'parent'))
})

test('Stack: createStackableNode', t => {
  const node = createStackableNode(1, 'a')

  t.true(guardFor<StackableNode>(node, 'parent'))
  t.true(guardFor<StackableNode>(node, 'key'))
  t.true(guardFor<StackableNode>(node, 'value'))
})

test('Stack: new StackNode', t => {
  const node = new StackNode(1, 'a')

  t.true(node instanceof StackNode)
  t.true(guardFor<StackNode>(node, 'parent'))
  t.true(guardFor<StackNode>(node, 'key'))
  t.true(guardFor<StackNode>(node, 'value'))
})

test('Stack: stackCreate', t => {
  const stack = stackCreate<StackNode>()
  t.true(stack instanceof Stack)
})

test('Stack: stackPeek', t => {
  const stack = stackCreate<StackNode>()

  const n1 = createStackableNode(1, 'a')
  const n2 = createStackableNode(2, 'b')
  const n3 = createStackableNode(3, 'c')

  stackPush(stack, n1)
  stackPush(stack, n2)
  stackPush(stack, n3)

  t.is(stackPeek(stack), n3)
})

test('Stack: stackPush/stackPop', t => {
  const stack = stackCreate<StackNode>()

  const n1 = createStackableNode(1, 'a')
  const n2 = createStackableNode(2, 'b')
  const n3 = createStackableNode(3, 'c')

  stackPush(stack, n1)
  stackPush(stack, n2)
  stackPush(stack, n3)

  t.is(stack.count, 3)

  const result = [
    stackPop(stack),
    stackPop(stack),
    stackPop(stack)
  ]

  t.deepEqual(result, [ n3, n2, n1 ])
})

test('Stack: stackClear', t => {
  const stack = stackCreate<StackNode>()

  const n1 = createStackableNode(1, 'a')
  const n2 = createStackableNode(2, 'b')
  const n3 = createStackableNode(3, 'c')

  stackPush(stack, n1)
  stackPush(stack, n2)
  stackPush(stack, n3)

  t.is(stack.count, 3)

  stackClear(stack)

  t.is(stack.count, 0)
})

test('Stack: stackIterator', t => {
  const stack = stackCreate<StackNode>()

  const n1 = createStackableNode(1, 'a')
  const n2 = createStackableNode(2, 'b')
  const n3 = createStackableNode(3, 'c')

  stackPush(stack, n1)
  stackPush(stack, n2)
  stackPush(stack, n3)

  t.is(stack.count, 3)

  const data: StackNode[] = []

  for (const x of stackIterator(stack)) {
    data.push(x)
  }

  t.deepEqual(data, [ n3, n2, n1 ])
})