/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function (deadends, target) {
  let roundCount = 0
  let visited = new Set(deadends)
  if (visited.has('0000') || target === "0000" || visited.has(target)) return -1
  let currentRound = ["0000"]
  let needNextRound = true
  while (needNextRound) {
    needNextRound = false
    roundCount += 1
    let nextRound = new Set()
    for (const currentValue of currentRound) {
      visited.add(currentValue)
      const nexts = getNexts(currentValue)
      for (const lockns of nexts) {
        if (lockns === target) {
          return roundCount
        } else if (!visited.has(lockns) && !nextRound.has(lockns)) {
          nextRound.add(lockns)
          needNextRound = true
        }
      }
    }
    currentRound = nextRound
  }
  return -1
}
function getNexts(cur) {
  const [n1, n2, n3, n4] = cur
  const nexts = [
    [(1 + +n1 + +10) % 10, n2, n3, n4].join(""),
    [n1, (1 + +n2 + 10) % 10, n3, n4].join(""),
    [n1, n2, (1 + +n3 + 10) % 10, n4].join(""),
    [n1, n2, n3, (1 + +n4 + 10) % 10].join(""),
    [(-1 + +n1 + +10) % 10, n2, n3, n4].join(""),
    [n1, (-1 + +n2 + 10) % 10, n3, n4].join(""),
    [n1, n2, (-1 + +n3 + 10) % 10, n4].join(""),
    [n1, n2, n3, (-1 + +n4 + 10) % 10].join(""),
  ]
  return nexts
}
var start = Date.now()
const result = openLock(["0000"], "8888")
var end = Date.now()
console.log(end - start)
result

const aa = new Set([4])
aa.add(4)
aa
