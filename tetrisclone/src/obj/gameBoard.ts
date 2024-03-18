import Phaser from 'phaser';

export default class GameBoard {
  private scene: Phaser.Scene;
  private board: number[][];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.board = [];
  }

  init(): void {
    this.initBoard(this.board, 0);
  }

  private initBoard(tiles: number[][], value: number): void {
    for (let i = 0; i < 20; i++) {
      let tempArr: number[] = [];
      for (let j = 0; j < 10; j++) {
        tempArr.push(value);
      }
      tiles[i] = tempArr;
    }
  }

  render(): void {
    this.renderBackgroundGameBoard();
  }

  private renderBackgroundGameBoard(): void {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j] === 0) {
          this.scene.add
            .image(j * 40, i * 40, 'back', 0)
            .setScale(40 / 64)
            .setOrigin(0.0);
        }
      }
    }
  }
}
