import Phaser from 'phaser';
import GameConfig from '../config/gameconfig';
import { BlockType } from '../config/type';
import TetrisBlockFactory from './tetrisblockfactory';
import {
  checkBlockCollision,
  checkBlockWithInArea,
} from './tetrisblock/helper';

export default class GameBoard {
  private scene: Phaser.Scene;
  private board: number[][];
  private renderBoard: number[][];
  private currentTetrisBlock: BlockType | undefined; // 현재 블록의 타입을 추가
  private tetrisBlockFactory: TetrisBlockFactory; // 테트리스 블록 팩토리의 타입 추가
  cursors: (() => Phaser.Types.Input.Keyboard.CursorKeys) | undefined;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.board = [];
    this.renderBoard = [];
    this.currentTetrisBlock = undefined;
    this.tetrisBlockFactory = TetrisBlockFactory.getInstance(); // 테트리스 블록 팩토리의 인스턴스 생성
  }

  init(): void {
    this._initBoard(this.board, 0);
    this._initBoard(this.renderBoard, 0);

    this.cursors = this.scene.input.keyboard?.createCursorKeys;
    this.scene.input.keyboard?.on('keydown', this.handleKeyUp.bind(this));
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

  handleKeyUp(event: { keyCode: number }) {
    if (
      event.keyCode === Phaser.Input.Keyboard.KeyCodes.LEFT &&
      this.canMoveBlock(-1, 0)
    ) {
      this.currentTetrisBlock?.move(-1, 0);
    } else if (
      event.keyCode === Phaser.Input.Keyboard.KeyCodes.RIGHT &&
      this.canMoveBlock(1, 0)
    ) {
      this.currentTetrisBlock?.move(1, 0);
    } else if (
      event.keyCode === Phaser.Input.Keyboard.KeyCodes.DOWN &&
      this.canMoveBlock(0, 1)
    ) {
      this.currentTetrisBlock?.move(0, 1);
    } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.UP) {
      this.currentTetrisBlock?.rotate();
    }
  }

  canMoveBlock(offsetX: number, offsetY: number) {
    if (this.currentTetrisBlock === undefined) return;
    const blockInfo = this.currentTetrisBlock.getNextMoveInfo(offsetX, offsetY);

    if (!checkBlockWithInArea(blockInfo, this.board)) return false;
    if (checkBlockCollision(blockInfo, this.board)) return false;
    return true;
  }

  canRotateBlock() {
    if (this.currentTetrisBlock === undefined) return;
    const blockInfo = this.currentTetrisBlock.getNextRotateInfo();

    if (!checkBlockWithInArea(blockInfo, this.board)) return false;
    if (checkBlockCollision(blockInfo, this.board)) return false;
  }

  _boardToRenderBoard() {
    for (let y = 0; y < GameConfig.MainScene.GAME_BOARD_HEIGHT_CNT; y++) {
      for (let x = 0; x < GameConfig.MainScene.GAME_BOARD_WIDTH_CNT; x++) {
        this.renderBoard[y][x] = this.board[y][x];
      }
    }
  }
  _currentBlockToRendorBoard() {
    if (this.currentTetrisBlock === undefined) return;
    const renderInfo = this.currentTetrisBlock.getRenderInfo();

    for (let y = renderInfo.startY; y < renderInfo.endY; y++) {
      for (let x = renderInfo.startX; x < renderInfo.endX; x++) {
        if (
          renderInfo.tiles[y - renderInfo.startY][x - renderInfo.startX] !== 0
        ) {
          this.renderBoard[y][x] =
            renderInfo.tiles[y - renderInfo.startY][x - renderInfo.startX];
        }
      }
    }
  }

  render(): void {
    // 기존에 그려진 이미지 지움
    this.scene.children.removeAll();
    // 보드판을 랜더판에 보여줌
    this._boardToRenderBoard();
    // 현재 움직이는 블록을 랜더판에 보여줌
    this._currentBlockToRendorBoard();
    this.renderBackgroundGameBoard();
  }

  private renderBackgroundGameBoard(): void {
    for (let i = 0; i < GameConfig.MainScene.GAME_BOARD_HEIGHT_CNT; i++) {
      for (let j = 0; j < GameConfig.MainScene.GAME_BOARD_WIDTH_CNT; j++) {
        if (this.renderBoard[i][j] === 0) {
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
              this.board[i][j]
              // this.board[i][j] - 1
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