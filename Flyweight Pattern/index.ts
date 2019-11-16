class Mesh {
  public constructor() {}
}

class Position {
  public constructor() {}
}

class Leaves {
  public constructor() {}
}

class Bark {
  public constructor() {}
}

class TreeModel {
  public leaves: Leaves;
  public bark: Bark;
  public mesh: Mesh;
  public constructor() {
    this.leaves = new Leaves();
    this.bark = new Bark();
    this.mesh = new Mesh();
  }
}

class Tree {
  private _treeModel: TreeModel;
  private _positioon: Position;
  private _height: number;
  private _tickness: number;
  constructor(
    position: Position,
    height: number,
    tickness: number,
    treeModel: TreeModel
  ) {
    this._treeModel = treeModel;
    this._positioon = position;
    this._height = height;
    this._tickness = tickness;
  }
}

class TreeFactory {
  private static _sharedTreeModel = new TreeModel();
  public static createTree(
    positioon: Position,
    height: number,
    tickness: number
  ): Tree {
    const tree = new Tree(
      positioon,
      height,
      tickness,
      TreeFactory._sharedTreeModel
    );
    return tree;
  }
}
