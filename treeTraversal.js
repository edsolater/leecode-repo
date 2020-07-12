function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

/**前序遍历 */
function preorderTraversal(root) {
  if (!root) return []
  const stack = [root]
  const result = []
  while (stack.length) {
    const node = stack.pop()
    result.push(node.val)
    if (node.right) stack.push(node.right)
    if (node.left) stack.push(node.left)
  }
  return result
}
function preorderTraversal(root) {
  return root
    ? [
        root.val,
        ...preorderTraversal(root.left),
        ...preorderTraversal(root.right),
      ]
    : []
}
// 后序遍历，相当于遍历顺序倒过来、先右后左的正序遍历
function postorderTraversal(root) {
  if (!root) return []
  const stack = [root]
  const result = []
  while (stack.length) {
    const node = stack.pop()
    result.push(node.val)
    if (node.left) stack.push(node.left)
    if (node.right) stack.push(node.right)
  }
  result.reverse()
  return result
}
function postorderTraversal(root) {
  return root
    ? [
        ...postorderTraversal(root.left),
        ...postorderTraversal(root.right),
        root.val,
      ]
    : []
}

/**中序遍历 */
function inorderTraversal(root) {
  let cur = root
  const result = []
  const stack = []
  while (cur || stack.length) {
    // 贪婪地寻求节点的左树
    while (cur) {
      stack.push(cur)
      cur = cur.left
    }
    cur = stack.pop()
    result.push(cur.val)
    cur = cur.right
  }
  return result
}
function inorderTraversal(root) {
  return root
    ? [
        ...inorderTraversal(root.left),
        root.val,
        ...inorderTraversal(root.right),
      ]
    : []
}
/**层序遍历 */
function levelOrder(root) {
  if (!root) return []
  let queue = [root]
  const result = []
  while (queue.length) {
    let curVals = []
    let nextQueue = []
    for (const node of queue) {
      curVals.push(node.val)
      if (node.left) nextQueue.push(node.left)
      if (node.right) nextQueue.push(node.right)
    }
    result.push(curVals)
    queue = nextQueue
  }
  return result
}

/**
 * 是否是二叉搜索树（会破坏原有结构，不好）
 */
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (root === null) return true
  if (root.val <= min || root.val >= max) return false
  return (
    isValidBST(root.left, min, root.val) &&
    isValidBST(root.right, root.val, max)
  )
}

/**
 * 一次返回最小值的二叉树
 */
class BSTIterator {
  /**
   * @param {TreeNode} root
   */
  constructor(root) {
    this.cur = root
    this.root = root
    this.orderList = []
    this.stack = []
  }
  /**
   * @return {number}
   */
  next() {
    if (this.hasNext()) {
      // 贪婪地寻求节点的左树
      while (this.cur) {
        this.stack.push(this.cur)
        this.cur = this.cur.left
      }
      this.cur = this.stack.pop()
      this.orderList.push(this.cur)
      const value = this.cur.val
      this.cur = this.cur.right
      return value
    }
  }
  /**
   * @return {boolean}
   */
  hasNext() {
    return Boolean(this.cur) || Boolean(this.stack.length)
  }
}

/**
 * 搜索搜索树
 */
function searchBST(root, val) {
  if (!root) {
    return null
  }
  if (root.val === val) {
    return root
  } else {
    return val < root.val
      ? searchBST(root.left, val)
      : searchBST(root.right, val)
  }
}

/**插入搜索树节点 */
function insertIntoBST(root, val) {
  if (!root) {
    return new TreeNode(val)
  }
  if (val < root.val) {
    root.left = insertIntoBST(root.left, val)
  } else if (val > root.val) {
    root.right = insertIntoBST(root.right, val)
  }
  return root
}

/**删除搜索树节点 */
function deleteNode(root, key) {
  if (!root) {
    return null
  }
  if (key < root.val) {
    root.left = deleteNode(root.left, key)
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key)
  } else if (root.val === key) {
    if (!root.left && !root.right) {
      //如果是叶子节点
      root = null
    } else if (root.right) {
      // 1。让右边继任者等于当前值，再从右子树中递归删除继任者
      root.val = successor(root).val
      root.right = deleteNode(root.right, root.val)
    } else if (root.left) {
      //1. 从左子树中找到前任predecessor,为当前值，并从左子树删除
      root.val = predecessor(root).val
      root.left = deleteNode(root.left, root.val)
    }
  }
  return root
}

/**
 * 取后继节点（即比当前节点大的最小节点）
 * 利用搜索树节点排列性质
 * @param {TreeNode} root
 */
function successor(root) {
  root = root.right
  while (root.left) {
    root = root.left
  }
  return root
}
/**
 * 取前驱节点（即比当前节点小的最大节点）
 * 利用搜索树节点排列性质
 * @param {TreeNode} root
 */
function predecessor(root) {
  root = root.left
  while (root.right) {
    root = root.right
  }
  return root
}
