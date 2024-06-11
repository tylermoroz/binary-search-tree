#!/usr/bin/node

import Node from "./Node.js";
import { prettyPrint } from "./prettyPrint.js";

class Tree {
  constructor(array) {
    this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
  }

  buildTree(sortedArray) {
    const build = (start, end) => {
      if (start > end) return null;

      let mid = Math.floor((start + end) / 2);
      const node = new Node(sortedArray[mid]);

      node.left = build(start, mid - 1);
      node.right = build(mid + 1, end);

      return node;
    };

    return build(0, sortedArray.length - 1);
  }

  insert(value) {
    const insertRecursively = (node, value) => {
      if (!node) {
        return new Node(value);
      }
      if (node.data > value) {
        node.left = insertRecursively(node.left, value);
      } else if (node.data < value) {
        node.right = insertRecursively(node.right, value);
      }
      return node;
    };

    this.root = insertRecursively(this.root, value);
  }

  deleteItem(value) {
    const deleteRecursively = (node, value) => {
      if (!node) {
        return node;
      }

      if (value < node.data) {
        node.left = deleteRecursively(node.left, value);
      } else if (value > node.data) {
        node.right = deleteRecursively(node.right, value);
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          return node.right;
        } else if (!node.right) {
          return node.left;
        }

        let successor = this.findMinimum(node.right);
        node.data = successor.data;
        node.right = deleteRecursively(node.right, successor.data);
      }
      return node;
    };
    this.root = deleteRecursively(this.root, value);
  }

  findMinimum(node) {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  find(value) {
    const findValue = (node, value) => {
      if (node === null) {
        return undefined;
      }

      if (node.data === value) {
        return node;
      }

      if (node.data > value) {
        return findValue(node.left, value);
      } else if (node.data < value) {
        return findValue(node.right, value);
      }
      return node;
    };

    return findValue(this.root, value);
  }
}

const array = [2, 5, 3, 7, 4, 1, 1, 9, 6, 10, 8, 11];
const tree = new Tree(array);
tree.insert(13);
tree.insert(14);
tree.insert(12);
tree.insert(0);
tree.deleteItem(11);
prettyPrint(tree.root);
console.log(tree.find(4));
