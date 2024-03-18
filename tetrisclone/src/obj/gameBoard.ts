import Phaser from 'phaser';
import GameConfig from '../config/gameconfig';
import { BlockType } from '../config/type';
import TetrisBlockFactory from './tetrisblockfactory';

export default class GameBoard {
  private scene: Phaser.Scene;
  private board: number[][];
  private currentTetrisBlock: BlockType | undefined; // 현재 블록의 타입을 추가
  private tetrisBlockFactory: TetrisBlockFactory; // 테트리스 블록 팩토리의 타입 추가

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.board = [];
    this.currentTetrisBlock = undefined;
    this.tetrisBlockFactory = TetrisBlockFactory.getInstance(); // 테트리스 블록 팩토리의 인스턴스 생성
  }

  init(): void {
    this._initBoard(this.board, 0);
  }

  private _initBoard(tiles: number[][], value: number): void {
    for (let i = 0; i < GameConfig.MainScene.GAME_BOARD_HEIGHT_CNT; i++) {
      let tempArr: number[] = [];
      for (let j = 0; j < GameConfig.MainScene.GAME_BOARD_WIDTH_CNT; j++) {
        tempArr.push(value);
      }
      tiles[i] = tempArr;
    }
  }

  spawnRandomBlock(x: number, y: number) {
    const block = this.tetrisBlockFactory.createRandomBlock();
    block.setPosition(x, y);
    this.currentTetrisBlock = block;
  }

  moveBlock(offsetX: number, offsetY: number) {
    if (this.currentTetrisBlock === undefined) return;
    this.currentTetrisBlock.move(offsetX, offsetY);
  }

  _currentBlockToBoard() {
    if (this.currentTetrisBlock === undefined) return;
    const renderInfo = this.currentTetrisBlock.getRenderInfo();

    for (let y = renderInfo.startY; y < renderInfo.endY; y++) {
      for (let x = renderInfo.startX; x < renderInfo.endX; x++) {
        if (
          renderInfo.tiles[y - renderInfo.startY][x - renderInfo.startX] !== 0
        ) {
          this.board[y][x] =
            renderInfo.tiles[y - renderInfo.startY][x - renderInfo.startX];
        }
      }
    }
  }

  render(): void {
    this._currentBlockToBoard();
    this.renderBackgroundGameBoard();
  }

  private renderBackgroundGameBoard(): void {
    for (let i = 0; i < GameConfig.MainScene.GAME_BOARD_HEIGHT_CNT; i++) {
      for (let j = 0; j < GameConfig.MainScene.GAME_BOARD_WIDTH_CNT; j++) {
        if (this.board[i][j] === 0) {
          this.scene.add
            .image(
              j * GameConfig.MainScene.RENDER_TILE_SIZE,
              i * GameConfig.MainScene.RENDER_TILE_SIZE,
              GameConfig.MainScene.BACKGROUND_TILE_SPRITE_SHEET_KEY,
              0
            )
            .setScale(
              GameConfig.MainScene.RENDER_TILE_SIZE /
                GameConfig.MainScene.RENDER_TILE_SPRITE_ORIGIN_SIZE
            )
            .setOrigin(0.0);
        } else {
          this.scene.add
            .image(
              j * GameConfig.MainScene.RENDER_TILE_SIZE,
              i * GameConfig.MainScene.RENDER_TILE_SIZE,
              GameConfig.MainScene.RENDER_TILE_SPRITE_SHEET_KEY,
              this.board[i][j] - 1
            )
            .setScale(
              GameConfig.MainScene.RENDER_TILE_SIZE /
                GameConfig.MainScene.RENDER_TILE_SPRITE_ORIGIN_SIZE
            )
            .setOrigin(0.0);
        }
      }
    }
  }
}
