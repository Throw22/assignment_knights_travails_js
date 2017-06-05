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

  buildTree(start, maxDepth) {
    let children = this.addMove(this.start);

    for (let i = 1; i < maxDepth; i++) {
      let currentChildren = [];
      children.forEach(child => {
        currentChildren = currentChildren.concat(this.addMove(child, i));
      });
      children = currentChildren;
    }
  }

  addMove(currentNode, i = 1) {
    currentNode.children = this.createMoves(currentNode);
    return currentNode.children;
  }

  validateMove(parent, x, y) {
    let newX = parent.x + x;
    let newY = parent.y + y;

    if (newX > 8 || newX < 1 || newY > 8 || newY < 1) {
      return false;
    }
    if (
      parent.parent !== null &&
      parent.parent.x === newX &&
      parent.parent.y === newY
    ) {
      // console.log("cyclical",parent.parent.x, newX, parent.parent.y,newY)
      return false;
    }
    return true;
  }

  createMoves(parent) {
    let moves = [];

    if (this.validateMove(parent, 1, 2)) {
      moves.push(
        new Move(parent.x + 1, parent.y + 2, parent.depth + 1, [], parent)
      );
      this.counter += 1;
    }
    if (this.validateMove(parent, -1, 2)) {
      moves.push(
        new Move(parent.x - 1, parent.y + 2, parent.depth + 1, [], parent)
      );
      this.counter += 1;
    }
    if (this.validateMove(parent, 2, 1)) {
      moves.push(
        new Move(parent.x + 2, parent.y + 1, parent.depth + 1, [], parent)
      );
      this.counter += 1;
    }
    if (this.validateMove(parent, 2, -1)) {
      moves.push(
        new Move(parent.x + 2, parent.y - 1, parent.depth + 1, [], parent)
      );
      this.counter += 1;
    }
    if (this.validateMove(parent, -2, 1)) {
      moves.push(
        new Move(parent.x - 2, parent.y + 1, parent.depth + 1, [], parent)
      );
      this.counter += 1;
    }
    if (this.validateMove(parent, -2, -1)) {
      moves.push(
        new Move(parent.x - 2, parent.y - 1, parent.depth + 1, [], parent)
      );
      this.counter += 1;
    }
    if (this.validateMove(parent, -2, 1)) {
      moves.push(
        new Move(parent.x - 2, parent.y + 1, parent.depth + 1, [], parent)
      );
      this.counter += 1;
    }
    if (this.validateMove(parent, -2, -1)) {
      moves.push(
        new Move(parent.x - 2, parent.y - 1, parent.depth + 1, [], parent)
      );
      this.counter += 1;
    }
    return moves;
  }

  inspect() {
    console.log('maxDepth', this.maxDepth, '# nodes', this.counter);
  }
}

class KnightSearcher {
  constructor(tree) {
    this.tree = tree;
  }

  bfsFor(tC) {
    let rootNode = this.tree.start;
    let queue = rootNode.children;
    while (queue.length > 0) {
      let child = queue.shift();
      if (child.x === tC[0] && child.y === tC[1]) {
        let pathArr = this.getPath(child);
        pathArr.unshift([rootNode.x, rootNode.y]);
        return { moves: pathArr.length - 1, coords: pathArr };
      }
      queue = queue.concat(child.children);
    }
    return console.log(
      'No possible move found for provided coordinates and tree'
    );
  }

  getPath(child) {
    let pathArr = [];
    let currentMove = child;
    while (currentMove.parent) {
      pathArr.unshift([currentMove.x, currentMove.y]);
      currentMove = currentMove.parent;
    }
    return pathArr;
  }

  dfsFor(tarCoord, currNode = this.tree.start) {
    let rootNode = this.tree.start;
    let solution;

    if (currNode.children.length) {
      for (let i = 0; i < currNode.children.length; i++) {
        if (
          currNode.children[i].x === tarCoord[0] &&
          currNode.children[i].y === tarCoord[1]
        ) {
          let pathArr = this.getPath(currNode.children[i]);
          pathArr.unshift([rootNode.x, rootNode.y]);

          solution = {
            moves: pathArr.length - 1,
            coords: pathArr
          };
          break;
        } else {
          solution = this.dfsFor(tarCoord, currNode.children[i]);
          if (solution) {
            return solution;
          }
        }
      }
    }
    return solution;
  }

  benchmark() {}
}

let MT = new MoveTree([4, 4], 6);
MT.inspect();

const KS = new KnightSearcher(MT);

// console.log(KS.bfsFor([8, 4]))
//4 4
// 6 5
// 8 4

//console.log(KS.bfsFor([4, 6]));

console.log(KS.dfsFor([4, 6]));

//4 4
// 2 5
// 4 6

const ms = () => {
  let d = new Date();
  let m = d.getMilliseconds();
  return m;
};

const benchDfs = () => {
  let start = ms();
  for (let i = 0; i < 6000; i++) {
    KS.dfsFor([8, 4]);
  }
  let end = ms();
  return `${end - start} ms`;
};

const benchBfs = () => {
  let start = ms();
  for (let i = 0; i < 3; i++) {
    KS.bfsFor([8, 4]);
  }
  let end = ms();
  return `${end - start} ms`;
};

// console.log(benchDfs());
// console.log(benchBfs());
