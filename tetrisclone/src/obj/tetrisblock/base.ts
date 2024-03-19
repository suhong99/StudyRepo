import GameConfig from '../../config/gameconfig';
import { BlockInfo } from '../../config/type';

export default class TetrisBlock {
  private tiles: number[][][];
  private currentTile: number[][];
  private width: number;
  private height: number;
  private x: number = 0;
  private y: number = 0;
  private rotateIdx: number = 0;
  private rotateSize: number = 1;
  constructor(tiles: number[][][]) {
    this.tiles = tiles;
    this.currentTile = tiles[0];
    this.width = this.currentTile[0].length;
    this.height = this.currentTile.length;
    this.rotateSize = tiles.length;
  }

  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  move(offsetX: number, offsetY: number) {
    this.x += offsetX;
    this.y += offsetY;
  }

  rotate() {
    this.rotateIdx = (this.rotateIdx + 1) % this.rotateSize;
    this.currentTile = this.tiles[this.rotateIdx];
  }

  getNextMoveInfo(offsetX: number, offsetY: number): BlockInfo {
    const nextX = this.x + offsetX;
    const nextY = this.y + offsetY;

    const startX = nextX - Math.floor(this.width / 2);
    const startY = nextY;

    const endX = startX + this.width;
    const endY = startY + this.height;

    return {
      tiles: this.currentTile,
      startX,
      startY,
      endX,
      endY,
    };
  }

  getNextRotateInfo(): BlockInfo {
    const nextRotateIdx = (this.rotateIdx + 1) % this.rotateSize;
    const nextTile = this.tiles[nextRotateIdx];

    const nextblockWidth = nextTile[0].length;
    const nextBlockHeigth = nextTile.length;
    const startX = this.x - Math.floor(nextblockWidth / 2);
    const startY = this.y;

    const endX = startX + nextblockWidth;
    const endY = startY + nextBlockHeigth;

    return {
      tiles: nextTile,
      startX,
      startY,
      endX,
      endY,
    };
  }

  getRenderInfo() {
    const startX =
      this.x !== undefined ? this.x - Math.floor(this.width / 2) : 0;
    const startY = this.y !== undefined ? this.y : 0;

    const endX =
      startX + this.width > GameConfig.MainScene.GAME_BOARD_WIDTH_CNT
        ? GameConfig.MainScene.GAME_BOARD_WIDTH_CNT
        : startX + this.width;

    const endY =
      startY + this.height > GameConfig.MainScene.GAME_BOARD_HEIGHT_CNT
        ? GameConfig.MainScene.GAME_BOARD_HEIGHT_CNT
        : startY + this.height;

    return { tiles: this.currentTile, startX, startY, endX, endY };
  }
}
