/**
 * 值是一个索引值（代表一个指针）
 * @typedef {number} Point
 */

/**
 * 快速排序
 * @param {number[]} arr
 * @param {Point} leftEdge
 * @param {Point} rightEdge
 */
function quickSort(arr, leftEdge = 0, rightEdge = arr.length - 1) {
  if (leftEdge < rightEdge) {
    const partitionIndex = partition(arr, leftEdge, rightEdge)
    quickSort(arr, leftEdge, partitionIndex - 1)
    quickSort(arr, partitionIndex + 1, rightEdge)
  }
  return arr
}

/**
 * 分区操作
 * @param {number[]} arr
 * @param {Point} leftEdge
 * @param {Point} rightEdge
 * @returns {Point} 返回被选中的基准所处的位置
 */
function partition(
  arr,
  leftEdge, // 假定leftIndex就是被选中的基准的index
  rightEdge
) {
  let p1 = leftEdge + 1 // p1 就是分界线
  for (let p2 = leftEdge + 1; p2 <= rightEdge; p2++) {
    if (arr[p2] < arr[leftEdge]) {
      swap(arr, p2, p1)
      p1++
    }
  }
  swap(arr, leftEdge, p1 - 1)
  return p1 - 1
}

/**
 * 交换两个数组项的值
 * @param {number} arr
 * @param {Point} i 1号索引
 * @param {Point} j 2号索引
 */
function swap(arr, i, j) {
  if (i !== j) {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
}
