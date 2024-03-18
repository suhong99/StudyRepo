import Phaser from 'phaser';
import GameBoard from '../obj/gameBoard';
import GameConfig from '../config/gameconfig';

export default class MainScene extends Phaser.Scene {
  private gameBoard: GameBoard;

  constructor() {
    super('MainScene');
    this.gameBoard = new GameBoard(this);
  }

  preload() {
    this.load.spritesheet(
      GameConfig.MainScene.RENDER_TILE_SPRITE_SHEET_KEY,
      'image/block.png',
      {
        //이미지를 64*64으로 쪼갬
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    this.load.spritesheet(
      GameConfig.MainScene.BACKGROUND_TILE_SPRITE_SHEET_KEY,
      'image/back.png',
      {
        //이미지를 64*64으로 쪼갬
        frameWidth: GameConfig.MainScene.RENDER_TILE_SPRITE_ORIGIN_SIZE,
        frameHeight: GameConfig.MainScene.RENDER_TILE_SPRITE_ORIGIN_SIZE,
      }
    );
  }
  create(): void {
    // // 영상과 다르게 fill 대신 color옵션(fill해도 적용은 됨)
    // this.add.text(100, 100, 'Hello World', { color: '#0f0' });
    // this.add.image(200, 200, 'block', 0);
    // this.add.image(200, 300, 'block', 1);

    // this.add.image(300, 300, 'back', 0);

    this.gameBoard.init();
    this.gameBoard.spawnRandomBlock(5, 0);
    this.gameBoard.render();
  }

  update(): void {}
}
