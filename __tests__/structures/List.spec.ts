/**
 * BSD 3-Clause License
 *
 * Copyright © 2024, Daniel Jonathan <daniel at cosmicmind dot com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
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

import {
    guard,
} from '@cosmicmind/foundationjs'
import {
    it,
    expect,
    describe,
} from 'vitest'


import {
    SentinelNode,
    Listable,
    List,
    listNodeCreate,
    listCreate,
    listInsert,
    listRemoveFirst,
    listAppend,
    listRemoveLast,
    listInsertBefore,
    listRemoveBefore,
    listInsertAfter,
    listRemoveAfter,
    listRemove,
    listIterateFromFirst,
    listIterateFromLast,
    listIterateToNext,
    listIterateToPrevious,
    listClear,
    listIsFirst,
    listIsLast,
    listHas,
    listQuery,
} from '@/index'

type ListNode = Listable & {
  key: number
  value: string
}

const createListNode = (key: number, value: string): ListNode =>
    listNodeCreate<ListNode>({
        key,
        value,
    })

class ListTraceNode implements Listable {
    readonly next?: Listable
    readonly previous?: Listable
    readonly key: number
    readonly value: string
    constructor(key: number, value: string) {
        this.next = SentinelNode
        this.previous = SentinelNode
        this.key = key
        this.value = value
    }
}

class ListTrace<T extends ListTraceNode> implements List<T> {
    readonly first?: T
    readonly last?: T
    readonly count: number
    constructor() {
        this.first = SentinelNode
        this.last = SentinelNode
        this.count = 0
    }
}

describe('List', () => {
    it('listNodeCreate', () => {
        const node = listNodeCreate({})

        expect(guard(node)).toBeTruthy()
        expect(node.previous).toBe(SentinelNode)
        expect(node.next).toBe(SentinelNode)
    })

    it('listCreate', () => {
        const list = listCreate<ListNode>()

        expect(guard(list)).toBeTruthy()
        expect(list.first).toBe(SentinelNode)
        expect(list.last).toBe(SentinelNode)
        expect(list.count).toBe(0)
    })

    it('createListNode', () => {
        const node = createListNode(1, 'a')

        expect(guard(node, 'key', 'value')).toBeTruthy()
        expect(node.previous).toBe(SentinelNode)
        expect(node.next).toBe(SentinelNode)
        expect(node.key).toBe(1)
        expect(node.value).toBe('a')
    })

    it('new Listable', () => {
        const node = new ListTraceNode(1, 'a')

        expect(guard(node, 'key', 'value')).toBeTruthy()
        expect(node.previous).toBe(SentinelNode)
        expect(node.next).toBe(SentinelNode)
        expect(node.key).toBe(1)
        expect(node.value).toBe('a')
    })

    it('new ListTrace', () => {
        const list = new ListTrace()

        expect(guard(list)).toBeTruthy()
        expect(list.first).toBe(SentinelNode)
        expect(list.last).toBe(SentinelNode)
        expect(list.count).toBe(0)
    })

    it('listInsert', () => {
        const list = listCreate<ListNode>()

        const n1 = createListNode(1, 'a')
        const n2 = createListNode(2, 'b')
        const n3 = createListNode(3, 'c')

        listInsert(list, n1)
        listInsert(list, n2)
        listInsert(list, n3)

        const result: ListNode[] = []
        const expectation = [ n3, n2, n1 ]

        for (const n of listIterateFromFirst(list)) {
            result.push(n)
        }

        expect(result[0]).toBe(expectation[0])
        expect(result[1]).toBe(expectation[1])
        expect(result[2]).toBe(expectation[2])
        expect(result.length).toBe(list.count)
    })

    it('listRemoveFirst', () => {
        const list = listCreate<ListNode>()

        const n1 = createListNode(1, 'a')
        const n2 = createListNode(2, 'b')
        const n3 = createListNode(3, 'c')

        listAppend(list, n1)
        listAppend(list, n2)
        listAppend(list, n3)

        let result: ListNode[] = []
        let expectation = [ n1, n2, n3 ]

        for (const n of listIterateFromFirst(list)) {
            result.push(n)
        }

        expect(result[0]).toBe(expectation[0])
        expect(result[1]).toBe(expectation[1])
        expect(result[2]).toBe(expectation[2])
        expect(result.length).toBe(list.count)

        listRemoveFirst(list)
        listRemoveFirst(list)

        result = []
        for (const n of listIterateFromFirst(list)) {
            result.push(n)
        }

        expectation = [ n3 ]

        expect(result[0]).toBe(expectation[0])
        expect(result.length).toBe(list.count)
    })

    it('listAppend', () => {
        const list = listCreate<ListNode>()

        const n1 = createListNode(1, 'a')
        const n2 = createListNode(2, 'b')
        const n3 = createListNode(3, 'c')

        listAppend(list, n1)
        listAppend(list, n2)
        listAppend(list, n3)

        const result: ListNode[] = []
        const expectation = [ n3, n2, n1 ]

        for (const n of listIterateFromLast(list)) {
            result.push(n)
        }

        expect(result[0]).toBe(expectation[0])
        expect(result[1]).toBe(expectation[1])
        expect(result[2]).toBe(expectation[2])
        expect(result.length).toBe(list.count)
    })

    it('listRemoveLast', () => {
        const list = listCreate<ListNode>()

        const n1 = createListNode(1, 'a')
        const n2 = createListNode(2, 'b')
        const n3 = createListNode(3, 'c')

        listAppend(list, n1)
        listAppend(list, n2)
        listAppend(list, n3)

        let result: ListNode[] = []
        let expectation = [ n1, n2, n3 ]

        for (const n of listIterateFromFirst(list)) {
            result.push(n)
        }

        expect(result[0]).toBe(expectation[0])
        expect(result[1]).toBe(expectation[1])
        expect(result[2]).toBe(expectation[2])
        expect(result.length).toBe(list.count)

        listRemoveLast(list)
        listRemoveLast(list)

        result = []
        for (const n of listIterateFromFirst(list)) {
            result.push(n)
        }

        expectation = [ n1 ]

        expect(result[0]).toBe(expectation[0])
        expect(result.length).toBe(list.count)
    })

    it('listInsertBefore', () => {
        const list = listCreate<ListNode>()

        const n1 = createListNode(1, 'a')
        const n2 = createListNode(2, 'b')
        const n3 = createListNode(3, 'c')

        listInsert(list, n1)
        listInsertBefore(list, n2, n1)
        listInsertBefore(list, n3, n1)

        const result: ListNode[] = []
        const expectation = [ n2, n3, n1 ]

        for (const n of listIterateFromFirst(list)) {
            result.push(n)
        }

        expect(result[0]).toBe(expectation[0])
        expect(result[1]).toBe(expectation[1])
        expect(result[2]).toBe(expectation[2])
        expect(result.length).toBe(list.count)
    })

    it('listRemoveBefore', () => {
        const list = listCreate<ListNode>()

        const n1 = createListNode(1, 'a')
        const n2 = createListNode(2, 'b')
        const n3 = createListNode(3, 'c')

        listInsert(list, n1)
        listInsertBefore(list, n2, n1)
        listInsertBefore(list, n3, n1)
        listRemoveBefore(list, n3)

        const result: ListNode[] = []
        const expectation = [ n3, n1 ]

        for (const n of listIterateFromFirst(list)) {
            result.push(n)
        }

        expect(result[0]).toBe(expectation[0])
        expect(result[1]).toBe(expectation[1])
        expect(result.length).toBe(list.count)
    })

    it('listInsertAfter', () => {
        const list = listCreate<ListNode>()

        const n1 = createListNode(1, 'a')
        const n2 = createListNode(2, 'b')
        const n3 = createListNode(3, 'c')

        listInsert(list, n1)
        listInsertAfter(list, n2, n1)
        listInsertAfter(list, n3, n2)

        const result: ListNode[] = []
        const expectation = [ n1, n2, n3 ]

        for (const n of listIterateFromFirst(list)) {
            result.push(n)
        }

        expect(result[0]).toBe(expectation[0])
        expect(result[1]).toBe(expectation[1])
        expect(result[2]).toBe(expectation[2])
        expect(result.length).toBe(list.count)
    })

    it('listRemoveAfter', () => {
        const list = listCreate<ListNode>()

        const n1 = createListNode(1, 'a')
        const n2 = createListNode(2, 'b')
        const n3 = createListNode(3, 'c')

        listInsert(list, n1)
        listInsertAfter(list, n2, n1)
        listInsertAfter(list, n3, n2)
        listRemoveAfter(list, n1)

        const result: ListNode[] = []
        const expectation = [ n1, n3 ]

        for (const n of listIterateFromFirst(list)) {
            result.push(n)
        }

        expect(result[0]).toBe(expectation[0])
        expect(result[1]).toBe(expectation[1])
        expect(result.length).toBe(list.count)
    })

    it('listRemove', () => {
        const list = listCreate<ListNode>()

        const n1 = createListNode(1, 'a')
        const n2 = createListNode(2, 'b')
        const n3 = createListNode(3, 'c')

        listInsert(list, n1)
        listAppend(list, n2)
        listAppend(list, n3)
        listRemove(list, n3)

        const result: ListNode[] = []
        const expectation = [ n1, n2 ]

        for (const n of listIterateFromFirst(list)) {
            result.push(n)
        }

        expect(result[0]).toBe(expectation[0])
        expect(result[1]).toBe(expectation[1])
        expect(result.length).toBe(list.count)
    })

    it('listIterateFromFirst', () => {
        const list = listCreate<ListNode>()

        const n1 = createListNode(1, 'a')
        const n2 = createListNode(2, 'b')
        const n3 = createListNode(3, 'c')

        listInsert(list, n1)
        listInsert(list, n2)
        listInsert(list, n3)

        const result: ListNode[] = []
        const expectation = [ n3, n2, n1 ]

        for (const n of listIterateFromFirst(list)) {
            result.push(n)
        }

        expect(result[0]).toBe(expectation[0])
        expect(result[1]).toBe(expectation[1])
        expect(result[2]).toBe(expectation[2])
        expect(result.length).toBe(list.count)
    })

    it('listIterateFromLast', () => {
        const list = listCreate<ListNode>()

        const n1 = createListNode(1, 'a')
        const n2 = createListNode(2, 'b')
        const n3 = createListNode(3, 'c')

        listAppend(list, n1)
        listAppend(list, n2)
        listAppend(list, n3)

        const result: ListNode[] = []
        const expectation = [ n3, n2, n1 ]

        for (const n of listIterateFromLast(list)) {
            result.push(n)
        }

        expect(result[0]).toBe(expectation[0])
        expect(result[1]).toBe(expectation[1])
        expect(result[2]).toBe(expectation[2])
        expect(result.length).toBe(list.count)
    })

    it('listIterateToNext', () => {
        const list = listCreate<ListNode>()

        const n1 = createListNode(1, 'a')
        const n2 = createListNode(2, 'b')
        const n3 = createListNode(3, 'c')

        listAppend(list, n1)
        listAppend(list, n2)
        listAppend(list, n3)

        expect(list.count).toBe(3)

        const result: ListNode[] = []
        const expectation = [ n1, n2, n3 ]

        for (const n of listIterateToNext(n1)) {
            result.push(n)
        }

        expect(result[0]).toBe(expectation[0])
        expect(result[1]).toBe(expectation[1])
        expect(result.length).toBe(3)
    })

    it('listIterateToPrevious', () => {
        const list = listCreate<ListNode>()

        const n1 = createListNode(1, 'a')
        const n2 = createListNode(2, 'b')
        const n3 = createListNode(3, 'c')

        listAppend(list, n1)
        listAppend(list, n2)
        listAppend(list, n3)

        expect(list.count).toBe(3)

        const result: ListNode[] = []
        const expectation = [ n3, n2, n1 ]

        for (const n of listIterateToPrevious(n3)) {
            result.push(n)
        }

        expect(result[0]).toBe(expectation[0])
        expect(result[1]).toBe(expectation[1])
        expect(result.length).toBe(3)
    })

    it('listClear', () => {
        const list = listCreate<ListNode>()

        const n1 = createListNode(1, 'a')
        const n2 = createListNode(2, 'b')
        const n3 = createListNode(3, 'c')

        listAppend(list, n1)
        listAppend(list, n2)
        listAppend(list, n3)

        expect(list.count).toBe(3)

        listClear(list)

        expect(list.count).toBe(0)
    })

    it('listIsFirst/listIsLast', () => {
        const list = listCreate<ListNode>()

        const n1 = createListNode(1, 'a')
        const n2 = createListNode(2, 'b')
        const n3 = createListNode(3, 'c')

        listAppend(list, n1)
        listAppend(list, n2)
        listAppend(list, n3)

        expect(listIsFirst(list, n1)).toBeTruthy()
        expect(listIsFirst(list, n2)).toBeFalsy()
        expect(listIsLast(list, n3)).toBeTruthy()
        expect(listIsLast(list, n2)).toBeFalsy()
    })

    it('listHas', () => {
        const list = listCreate<ListNode>()

        const n1 = createListNode(1, 'a')
        const n2 = createListNode(2, 'b')
        const n3 = createListNode(3, 'c')
        const n4 = createListNode(3, 'd')

        listAppend(list, n1)
        listAppend(list, n2)
        listAppend(list, n3)

        expect(listHas(list, n1)).toBeTruthy()
        expect(listHas(list, n2)).toBeTruthy()
        expect(listHas(list, n3)).toBeTruthy()
        expect(listHas(list, n4)).toBeFalsy()
    })

    it('listQuery', () => {
        const list = listCreate<ListNode>()

        const n1 = createListNode(1, 'a')
        const n2 = createListNode(2, 'b')
        const n3 = createListNode(3, 'c')
        const n4 = createListNode(4, 'd')

        listAppend(list, n1)
        listAppend(list, n2)
        listAppend(list, n3)
        listAppend(list, n4)

        let result = listQuery(list, node => 1 === node.key || 3 === node.key)
        expect(result.size).toBe(2)

        result = listQuery(list,
            node => 1 === node.key,
            node => 'a' === node.value || 'b' === node.value
        )
        expect(result.size).toBe(1)

        result = listQuery(list,
            node => 1 === node.key,
            node => 'b' === node.value
        )
        expect(result.size).toBe(0)
    })
})