// IDEA 我觉得有必要抽象一个足够好用的grid数据结构，用于处理坐标问题
function numIslands(
  grid = [
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "0"],
  ]
) {
  let landNumber = 0
  grid.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === "1") {
        landNumber += 1
        grid[y][x] = "2"
        let relativeUnits = [[x, y]]
        let needNextRound = true
        while (needNextRound) {
          needNextRound = false
          let nextRound = []
          for (const [curX, curY] of relativeUnits) {
            const fourDirections = [
              [curX, curY - 1],
              [curX, curY + 1],
              [curX - 1, curY],
              [curX + 1, curY],
            ]
            fourDirections.forEach(([x, y]) => {
              if (grid[y] && grid[y][x] === value) {
                nextRound.push([x, y])
                grid[y][x] = "2"
                needNextRound = true
              }
            })
          }
          relativeUnits = [...nextRound]
        }
      }
    })
  })
  return landNumber
}
console.log(
  "numIslands: ",
  numIslands([
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "0"],
  ])
)
