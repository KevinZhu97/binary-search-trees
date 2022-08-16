let testArray = [1, 2, 3, 4, 5];

class Node {
    constructor(data) {
        this.data = data;
        this.leftTree = null;
        this.rightTree = null;
    }
}

class Tree {
    constructor(array) {
        //make sure to sort and remove duplicates from the array
        this.array = this.removeDuplicates(this.mergeSort(array))
        this.root = this.buildTree(this.array, 0, this.array.length - 1)
    }

    buildTree(array, start, end) {
        if (start > end) return null; //base recursion, it will reach a stopping point since "mid - 1" and mid + 1

        let mid = parseInt((start + end)/2);
        let root = new Node(array[mid]);

        root.leftTree = this.buildTree(array, start, mid - 1); // mid + 1 and mid - 1 to not include the root node, returns null when it is in the wrong tree
        root.rightTree = this.buildTree(array, mid + 1, end);

        return root;
    }

    insert(value, root = this.root) { //When inserting a node, it is always going to become a leaf node
        if (root == null) {
            return (root = new Node(value));
        }

        if (value > root.data) {
            root.rightTree = this.insert(value, root.rightTree)
        } else {
            root.leftTree = this.insert(value, root.leftTree)
        }

        return root;
    };

    delete(value, root = this.root) {
        //base recursion 
        if (root == null) {
            return root; 
        };

        //go down the tree, searching
        if (value > root.data) {
            root.rightTree = this.delete(value, root.rightTree) 
        } else if (value < root.data) {
            root.leftTree = this.delete(value, root.leftTree)
        } else { //if value equals to root 
            if (root.leftTree == null) { //if root has no left child or one child
                return root.rightTree; //this will replace the previos root.subtree if it is the child left or return null if not
            } else if (root.rightTree == null) { //alternate to above scenario
                return root.leftTree; 
            } 
            // we are not actually deleting it, just replacing it with another node or setting to null

            root.data = minValue(root); //if it has two child, we want to get smallest of right subtree
            root.rightTree = this.delete(root.rightTree, root.data) //root.rightTree now treated as value and root.data as root, we are deleting it while simultaneously setting it as equal to the original root.rightTree
        }

        return root;
        //delete a leaf in a tree, structure of tree will not change *setting that node to equal null
        //delete a node with one child, replace deleted node with child, setting deceased's parent node rightTree/leftTree = child
        //delete a node with two child, 1) the smallest (farthest left) of the right subtree 2) replace deleted node with it, if it has child, it should connect to parent of previous parent node
    };

    find(value, root = this.root) {
        if (root === null) return false;

        if (root.data === value) return root;

        if (value > root.data) {
            return this.find(value, root.rightTree)
        } else {
            return this.find(value, root.leftTree)
        }
        
        //return root;
    }

    traverse(root, array) {
        if (array !== undefined) array.push(root.data);
        if (root.leftPart !== null) {
          this.traverse(root.leftTree, array);
        }
    
        if (root.rightPart !== null) {
          this.traverse(root.rightTree, array);
        }
        return array;
      }

    levelOrder(root) {
        const queue = [];
        const result = [];

        if (root === null) return;

        queue.push(root);

        while (queue.length > 0) {
            let current = queue.shift()

            if (current.rightTree != null) queue.push(current.rightTree);
            if (current.leftTree != null) queue.push(current.leftTree);
        }

        return result;
    }

    preorder(root) {
        if (root == null) return;
    
        if (root.data !== undefined) {
          this.preorderData.push(root.data);
        }
    
        if (root.leftPart !== null) {
          this.preorder(root.leftTree);
        }
    
        if (root.rightPart !== null) {
          this.preorder(root.rightTree);
        }
      }
    
    inorder(root) {
    if (root == null) return;

    if (root.leftPart !== null) {
        this.inorder(root.leftTree);
    }

    if (root.data !== undefined) {
        this.inorderData.push(root.data);
    }

    if (root.rightPart !== null) {
        this.inorder(root.rightTree);
    }
    }
    
    postorder(root) {
    if (root == null) return;

    if (root.leftPart !== null) {
        this.postorder(root.leftTree);
    }

    if (root.rightPart !== null) {
        this.postorder(root.rightTree);
    }

    if (root.data !== undefined) this.postorderData.push(root.data);
    }
    

    removeDuplicates(array) {
        return [...new Set(array)];
    }

    merge(leftHalf, rightHalf) {
        let final = []
    
        while (leftHalf.length > 0 && rightHalf.length > 0) {
            let arrayWithLowest = (leftHalf[0] > rightHalf[0]) ? rightHalf : leftHalf;
            let lowestCurrentNumber = arrayWithLowest.shift();
            final.push(lowestCurrentNumber);
        };
    
        // console.log(`This is ${final}`)
        return final.concat(leftHalf, rightHalf)
    }
    
    mergeSort(array) {
        if (array.length < 2) return array;
    
        let arrayMidpoint = Math.floor(array.length / 2);
        let leftHalf = this.mergeSort(array.slice(0, arrayMidpoint));
        let rightHalf = this.mergeSort(array.slice(arrayMidpoint));
        return this.merge(leftHalf, rightHalf)
    }

    height(root) {
        if (root == null) {
          return -1;
        } else {
          let left = this.height(root.leftTree);
          let right = this.height(root.rightTree);
    
          return Math.max(left, right) + 1;
        }
      }

    depth(node, root = this.root) {
    let depth = -1;

    if (node == null) return depth;

    if (
        root == node ||
        (depth = this.depth(node, root.leftPart)) >= 0 ||
        (depth = this.depth(node, root.rightPart) >= 0)
    ) {
        return depth + 1;
    }

    return depth;
    }

    isBalanced(root) {
    if (root == null) return false;

    let leftHalf = root.leftPart;
    let rightHalf = root.rightPart;

    if (Math.abs(this.height(leftHalf) - this.height(rightHalf)) > 1) {
        return false;
    } else {
        return true;
    }
    }

    rebalance() {
    if (this.isBalanced(this.root)) return this.root;

    let rebalancedNewTreeArray = [];
    rebalancedNewTreeArray = this.traverse(this.root, rebalancedNewTreeArray);

    let balancedTree = new Tree(rebalancedNewTreeArray);

    return balancedTree.root;
    }
}

function minValue(root) {
    let min = root.data;
    while (root != null) {
      min = root.data;
      root = root.leftPart;
    }
    return min;
}

let tree = new Tree(testArray);
tree.insert(7)
tree.delete(1)
console.log(tree.find(1))
console.log(tree.isBalanced())
