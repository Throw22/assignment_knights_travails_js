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

let MT = new MoveTree([4, 4], 3);
MT.inspect();

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
        return console.log(pathArr.length - 1, 'Moves:', pathArr);
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

  dfsFor(tC, cN = this.tree.start, foundSolution = false) {
    let rootNode = this.tree.start;

    if (cN.children.length && !foundSolution) {
      for (let i = 0; i < cN.children.length; i++) {
        if (cN.children[i].x === tC[0] && cN.children[i].y === tC[1]) {
          let pathArr = this.getPath(cN.children[i]);
          pathArr.unshift([rootNode.x, rootNode.y]);
          foundSolution = true;
          return console.log(
            'DepthFirst:',
            pathArr.length - 1,
            'Moves:',
            pathArr
          );
        } else if (!foundSolution) {
          this.dfsFor(tC, cN.children[i], foundSolution);
        }
      }
    }
  }

  benchmark() {}
}

const KS = new KnightSearcher(MT);

//KS.bfsFor([8, 4]);
//4 4
// 6 5
// 8 4

//KS.bfsFor([4, 6]);
//4 4
// 2 5
// 4 6

KS.dfsFor([8, 4]);
