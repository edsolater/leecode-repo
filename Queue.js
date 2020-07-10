class MyCircularQueue {
  constructor(k) {
    this.maxLength = k
    this.queue = []
  }
  enQueue(value) {
    if (this.isFull()) {
      return false
    } else {
      this.queue.push(value)
      return true
    }
  }
  deQueue() {
    if (this.isEmpty()) {
      return false
    } else {
      this.queue.shift()
      return true
    }
  }
  Front() {
    const result = this.queue[0]
    return result === undefined ? -1 : result
  }
  Rear() {
    const result = this.queue[this.queue.length - 1]
    return result === undefined ? -1 : result
  }
  isEmpty() {
    return this.queue.length === 0
  }
  isFull() {
    return this.queue.length === this.maxLength
  }
}