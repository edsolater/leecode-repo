// IDEA 我觉得这个实现不好，没有利用原生arry就已有的能力，比如：何必可以制造不可变长度的队列呢？

class MyCircularQueue {
  headIndex: number
  tailIndex: number
  queue: any[]
  constructor(k) {
    this.headIndex = -1
    this.tailIndex = -1
    this.queue = Array.from({ length: k }, () => undefined)
  }
  enQueue(value) {
    const newTailIndex = (this.tailIndex + 1) % this.queue.length
    if (this.queue[newTailIndex] === undefined) {
      // 下一个坑位空缺
      if (this.headIndex === -1) this.headIndex = 0
      this.tailIndex = newTailIndex
      this.queue[newTailIndex] = value
      return true
    } else {
      // 下一个坑位有值
      return false
    }
  }
  deQueue() {
    if (this.queue[this.headIndex] === undefined) return false
    else {
      this.queue[this.headIndex] = undefined
      this.headIndex = (this.headIndex + 1) % this.queue.length
      return true
    }
  }
  Front() {
    const result = this.queue[this.headIndex]
    if (result === undefined) {
        return -1
    } else {
        return result
    }
  }
  Rear() {
    const result = this.queue[this.tailIndex]
    if (result === undefined) {
        return -1
    } else {
        return result
    }
  }
  isEmpty() {
    return this.queue.every((value) => value === undefined)
  }
  isFull() {
    return this.queue.every((value) => value !== undefined)
  }
}