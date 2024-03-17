export default class GameBoard {
  constructor(scene: any) {
    this.scene = scene;
    this.board = [];
  }

  init() {
    this._initBoard(this.board, 0);
  }

  initBoard(tiles, value) {
    for (let i = 0; i < 20; i++) {
      let tempArr = [];
      for (let j = 0; j < 10; j++) {
        tempArr.push(value);
      }

      tiles[i] = tempArr;
    }
  }

  render() {
    this._renderBackgroundGameBoard();
  }

  _renderBackgroundGameBoard() {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j] === 0) {
          this.scene.add.image(j * 40, i * 40, 'back', 0);
        }
      }
    }
  }
}
