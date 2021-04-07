class Node {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
    this.mid = null;
  }
}

class TrinaryTree {
  constructor() {
    this.root = null;
    this.length = 0;
  }

  insertHelper(node, newNode) {
    if (node.mid) {
      this.insertHelper(node.mid, newNode);
    } else {
      node.mid = newNode;
    }
  }

  insert(value) {
    let newNode = new Node(value);
    this.length++;
    if (this.root == null) {
      this.root = newNode;
      return this;
    } else {
      var current = this.root;
      while (true) {
        if (value === current.value) {
          this.insertHelper(current, newNode);
          return this;
        } else {
          if (value < current.value) {
            if (current.left === null) {
              current.left = newNode;
              return this;
            } else {
              current = current.left;
            }
          } else {
            if (current.right === null) {
              current.right = newNode;
              return this;
            } else {
              current = current.right;
            }
          }
        }
      }
    }
  }

  delete(val) {
    if (this.length == 0) return new Error("Tree EMPTY");
    if (this.length == 1) {
      this.root = null;
      this.length--;
    }
    let deletedNode = this.findValue(val);
    if (!deletedNode.obtainValue) return Error("Node not found");
    if (deletedNode.obtainValue && deletedNode.parentNode) {
      if (
        !deletedNode.mainNode.mid &&
        !deletedNode.mainNode.left &&
        !deletedNode.mainNode.right
      ) {
        console.log("Single nodes with or without mid", deletedNode);
        if (deletedNode.mainNode.value == deletedNode.parentNode.value) {
          deletedNode.parentNode.mid = null;
        } else {
          if (deletedNode.mainNode.value < deletedNode.parentNode.value) {
            deletedNode.parentNode.left = null;
          } else {
            deletedNode.parentNode.right = null;
          }
        }
        deletedNode.mainNode = null;
        this.length--;
      }

      //both nodes
      else if (deletedNode.mainNode.left && deletedNode.mainNode.right) {
        const replacementNode = this.findMinimumNode(
          deletedNode.mainNode.right
        );
        deletedNode.mainNode.value = replacementNode.node.value;
        replacementNode.parent.left = null;
        if (replacementNode.node.mid) {
          deletedNode.mainNode.mid = replacementNode.node.mid;
        }
        this.length--;
      }

      //either of one node
      else if (!!deletedNode.mainNode.left || !!deletedNode.mainNode.right) {
        if (deletedNode.parentNode.value > val) {
          deletedNode.parentNode.left =
            deletedNode.mainNode[deletedNode.mainNode.left ? "left" : "right"];
        } else {
          deletedNode.parentNode.right =
            deletedNode.mainNode[deletedNode.mainNode.left ? "left" : "right"];
        }
        this.length--;
      }
    }

    //root
    else if (deletedNode.obtainValue && deletedNode.parentNode == null) {
      if (!deletedNode.mainNode.right) {
        this.root = deletedNode.mainNode.left;
        deletedNode.mainNode.left = null;
      } else {
        const replacementNode = this.findMinimumNode(
          deletedNode.mainNode.right
        );
        deletedNode.mainNode.value = replacementNode.node.value;
        deletedNode.mainNode.mid = replacementNode.node.mid;
        if (replacementNode.node.right) {
          replacementNode.parent.left = replacementNode.node.right;
        } else {
          replacementNode.parent.left = null;
        }

        this.length--;
      }
    }
    //nothing
    else {
      return new Error("Node not found.");
    }
  }

  lookerFunction(node, parentNode, findValResponse, val) {
    if (node.value === val) {
      if (node.mid) {
        this.lookerFunction(node.mid, node, findValResponse, val);
      } else {
        findValResponse.obtainValue = true;
        findValResponse.mainNode = node;
        findValResponse.parentNode = parentNode;
        return findValResponse;
      }
    } else if (node.left && node.value > val) {
      this.lookerFunction(node.left, node, findValResponse, val);
    } else if (node.right && node.value < val) {
      this.lookerFunction(node.right, node, findValResponse, val);
    }
  }

  findMinimumNode(node) {
    let parent = new Node(null);
    while (node.left) {
      parent = node;
      node = node.left;
    }
    return { node, parent };
  }

  findValue(val) {
    let findValResponse = {
      obtainValue: false,
      mainNode: null,
      parentNode: null,
    };
    let x = this.lookerFunction(this.root, null, findValResponse, val);
    return findValResponse;
  }
}

let tree = new TrinaryTree();

tree.insert(10);
tree.insert(15);
tree.insert(15);
tree.insert(15);
tree.insert(13);
tree.insert(14);
tree.insert(11);
tree.insert(12);
tree.insert(12);
tree.insert(12);
tree.insert(18);
tree.insert(17);
tree.insert(19);
tree.insert(16);
tree.insert(5);
tree.insert(8);
tree.insert(9);
tree.insert(7);
tree.insert(7);
tree.insert(7);
tree.insert(6);
tree.insert(6);
tree.insert(6);
tree.insert(3);
tree.insert(4);
tree.insert(2);
tree.insert(1);

console.log(tree);
