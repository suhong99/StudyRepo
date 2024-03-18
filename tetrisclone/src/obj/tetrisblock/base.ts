import GameConfig from '../../config/gameconfig';

export default class TetrisBlock {
  private tiles: number[][][];
  private currentTile: number[][];
  private width: number;
  private height: number;
  private x?: number;
  private y?: number;

  constructor(tiles: number[][][]) {
    this.tiles = tiles;
    this.currentTile = tiles[0];
    this.width = this.currentTile[0].length;
    this.height = this.currentTile.length;
  }

  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
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
