#!/usr/bin/node

import Node from "./Node.js";
import { prettyPrint } from "./prettyPrint.js";

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const removeDupes = (array) => {
      return array.filter((value, index) => array.indexOf(value) === index);
    };

    const sortedArray = removeDupes(array).sort((a, b) => a - b);

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
}

const array = [2, 5, 3, 7, 4, 1, 1, 6, 10, 8, 11];
const tree = new Tree(array);
prettyPrint(tree.root);
