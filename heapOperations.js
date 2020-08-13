let getLeftNodeIndex = (index) => 2 * index + 1
let getRightNodeIndex = (index) => 2 * index + 2
let getParentNodeIndex = (index) => Math.ceil(index / 2) - 1

/**
 *  从头部维护堆。（只有一条维护路径）（认为头部节点是被外界替换的那一个的）
 * @param {number[]} heap
 * @param {'max' | 'min'} [heapType='max']
 */
let maintainHeap = (heap = [], heapType = "max", _top = 0) => {
  if (heap[_top] === undefined || heap[_top] === null) return heap //说明此处没有节点
  let left = getLeftNodeIndex(_top)
  let right = getRightNodeIndex(_top)
  let extremum = (heapType === "max" ? Math.max : Math.min).apply(
    null,
    [heap[_top], heap[left], heap[right]].filter((n) => typeof n === "number")
  )

  if (heap[_top] === extremum) return heap
  else if (heap[left] === extremum) {
    ;[heap[left], heap[_top]] = [heap[_top], heap[left]]
    return maintainHeap(heap, heapType, left)
  } else {
    ;[heap[right], heap[_top]] = [heap[_top], heap[right]]
    return maintainHeap(heap, heapType, right)
  }
}

/**
 *  插入式建堆
 * @param {number[]} candidates
 * @param {'max' | 'min'} [heapType='max']
 */
let createHeap = (candidates = [], heapType = "max") => {
  let resultHeap = []
  for (let item of candidates) {
    resultHeap.unshift(item)
    maintainHeap(resultHeap, heapType)
  }
  return resultHeap
}
