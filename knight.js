class Move {
  constructor(x, y, depth = 0, children = null, parent = null) {
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
  }

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
