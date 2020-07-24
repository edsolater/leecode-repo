class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
  }
}

function treeify(nodeList = [3, 9, 20, null, null, 15, 7]) {
  if (!nodeList.length) return null
  return attachNode(new TreeNode(nodeList[0]), 0, nodeList)
}

function attachNode(parentNode, parentIndex, nodeList) {
  const left = nodeList[2 * parentIndex + 1]
  const right = nodeList[2 * parentIndex + 2]
  if (left !== undefined && left !== null) {
    parentNode.left = new TreeNode(left)
    attachNode(parentNode.left, 2 * parentIndex + 1, nodeList)
  }
  if (right !== undefined && right !== null) {
    parentNode.right = new TreeNode(right)
    attachNode(parentNode.right, 2 * parentIndex + 2, nodeList)
  }
  return parentNode
}



console.log(treeify([]))
