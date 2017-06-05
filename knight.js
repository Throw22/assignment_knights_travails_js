class Move {
  constructor(x, y, depth = 0, children = [], parent = null) {
    this.x = x;
    this.y = y;
    this.depth = depth;
    this.children = children;
    this.parent = parent;
  }
}

class MoveTree {
  constructor(start, maxDepth) {
    this.start = new Move(start[0], start[1]);
    this.maxDepth = maxDepth;
    this.counter = 0;
    this.buildTree(start, maxDepth);
  }

  // Given starting location and depth
  // Add 8 moves to node based off given location
  //

  buildTree(start, maxDepth) {
    let currentNode = this.start;

    if (!currentNode.children.length) {
      // for (let i = 1; i <= maxDepth; i++) {
      //this.counter += 8;
      currentNode.children.push(
        new Move(currentNode.x + 2, currentNode.y + 1, i, [], currentNode),
        new Move(currentNode.x + 2, currentNode.y - 1, i, [], currentNode),
        new Move(currentNode.x + 1, currentNode.y + 2, i, [], currentNode),
        new Move(currentNode.x - 1, currentNode.y + 2, i, [], currentNode),
        new Move(currentNode.x - 2, currentNode.y + 1, i, [], currentNode),
        new Move(currentNode.x - 2, currentNode.y - 1, i, [], currentNode),
        new Move(currentNode.x + 1, currentNode.y - 2, i, [], currentNode),
        new Move(currentNode.x - 1, currentNode.y - 2, i, [], currentNode)
      );
      //  currentNode =
      //  }
      //For each of the children,

      currentNode.children.forEach(child => {});
    }
  }

  // addMove() {
  //
  // }

  inspect() {
    console.log('maxDepth', this.maxDepth, '# nodes', this.counter);
  }
}

// class KnightSearcher {
//   constructor(tree) {
//     this.tree = tree
//   }
//
//   bfsFor(targetCoords) {
//     let cursor = this.tree
//     if(cursor.children)
//   }
// }
