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

/**
 * @module SelectionSort
 *
 * SelectionSort is a traditional sorting algorithm that is generally
 * used on small sizes of data due to its slow performance run time.
 *
 * @performance O(n^2)
 */

import {
    LinearSort,
} from '@/utils'
import {
    CompareFn,
} from '@/utils'

/**
 * The `selectionSort` algorithm is implemented using generics, which
 * allows for specific data types to be processed. A `CompareFn`
 * function is passed as a second parameter in order to specify more
 * complex comparison operations.
 *
 * @performance O(n^2)
 */
export const selectionSort: LinearSort = <T>(data: T[], fn: CompareFn<T>): void => {
    let q = 0

    for (let i = 0, l = data.length; i < l; ++i) {
        q = i

        for (let j = i + 1; j < l; ++j) {
            if (0 < fn(data[q], data[j])) {
                q = j
            }
        }

        const temp = data[q]
        data[q] = data[i]
        data[i] = temp
    }
}
