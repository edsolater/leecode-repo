/****************
 * 个人觉得heap就是数组的一种视角,所以还是不要构建class了
 */

/**
 * 索引，一般是数组下标
 * @typedef {number} Index
 */

/**
 * function-type: **mutation**
 *
 * 交换堆中的两个数据
 * @param {number[]} heap 堆
 * @param {Index} i1 要交换的索引
 * @param {Index} i2 要交换的索引
 */
let swap = (heap, i1, i2) => {
  ;[heap[i1], heap[i2]] = [heap[i2], heap[i1]]
}

/**
 * function-type: **pure**
 *
 * 获取堆中下一个左节点的索引
 * @param {Index} index 当前索引
 */
let getLeftNodeIndex = (index = 0) => (index >= 0 ? 2 * index + 1 : -1)

/**
 * function-type: **pure**
 *
 * 获取堆中下一个右节点的索引
 * @param {Index} index 当前索引
 */
let getRightNodeIndex = (index = 0) => (index >= 0 ? 2 * index + 2 : -1)

/**
 * function-type: **pure**
 *
 * 获取堆中父节点的索引
 * @param {Index} index 当前索引
 */
let getParentNodeIndex = (index = 0) =>
  index >= 0 ? Math.ceil(index / 2) - 1 : -1

/**
 * function-type: **mutation**
 *
 * 插入一个新节点
 * @param {number[]} heap 目标堆
 * @param {'max'|'min'} heapType 指示是大/小堆
 * @param {number} newItem 要插入的数据
 */
let insert = (heap = [], heapType = "max", newItem) => {
  heap.push(newItem)
  let cur = heap.length - 1
  while (cur > -1) {
    let parent = getParentNodeIndex(cur)
    if (parent === -1) return
    if (
      heapType === "max" ? heap[parent] >= heap[cur] : heap[cur] <= heap[parent]
    ) {
      break
    } else {
      swap(heap, cur, parent)
      cur = parent
    }
  }
}

/**
 * function-type: **mutation**
 *
 * 弹出堆顶元素
 *
 * - 与堆底元素互换
 * - 删除堆底元素（原堆顶元素）
 * - 从堆顶元素开始（原堆底元素），维护堆
 * @param {number[]} heap 目标堆
 * @param {'max'|'min'} [heapType='max'] 指示是大/小堆
 * @param {number} newItem 要插入的数据
 */
let popHeapTop = (heap = [], heapType = "max") => {
  swap(heap, 0, heap.length - 1)

  heap.pop()

  let cur = 0
  while (true) {
    let left = getLeftNodeIndex(cur)
    let right = getRightNodeIndex(cur)
    if (right === -1 && left === -1) return
    let extremum = (heapType === "max" ? Math.max : Math.min).apply(
      null,
      [heap[cur], heap[left], heap[right]].filter((n) => typeof n === "number")
    )
    if (heap[cur] === extremum) {
      break
    } else if (heap[left] === extremum) {
      swap(heap, cur, left)
      cur = left
    } else {
      swap(heap, cur, right)
      cur = right
    }
  }
}

/**
 * function-type: **pure**
 *
 * 插入式建堆
 * @param {number[]} candidates 数组
 * @param {'max' | 'min'} [heapType='max'] 指示是大/小堆
 * @returns {number[]} 堆
 */
let createHeap = (candidates = [], heapType = "max") => {
  let resultHeap = []
  for (let item of candidates) {
    insert(resultHeap, heapType, item)
  }
  return resultHeap
}

/**
 * function-type: **pure**
 *
 * 获取最小的几个数
 * @param {number[]} arr 目标数组
 * @param {number} k 需要多少极值
 * @return {number[]}  极值数组
 */
let getMinierNumbers = function (arr, k) {
  let myHeap = createHeap(arr.slice(0, k))
  for (let n of arr.slice(k)) {
    if (n < myHeap[0]) {
      popHeapTop(myHeap)
      insert(myHeap, "max", n)
    }
  }
  return myHeap
}

/**
 * function-type: **pure**
 *
 * 获取较大的几个数
 * @param {number[]} arr 目标数组
 * @param {number} k 需要多少极值
 * @return {number[]}  极值数组
 */
let getMaxierNumbers = function (arr, k) {
  let myHeap = createHeap(arr.slice(0, k))
  for (let n of arr.slice(k)) {
    if (n > myHeap[0]) {
      popHeapTop(myHeap)
      insert(myHeap, "min", n)
    }
  }
  return myHeap
}
