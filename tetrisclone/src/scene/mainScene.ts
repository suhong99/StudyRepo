import Phaser from 'phaser';
import GameBoard from '../obj/gameBoard';
import GameConfig from '../config/gameconfig';
import TimerManager from '../manager/timermanager';

export default class MainScene extends Phaser.Scene {
  private gameBoard: GameBoard;
  private timerManager: TimerManager; // timeManager 속성 선언

  constructor() {
    super('MainScene');
    this.gameBoard = new GameBoard(this);
    // this.timeManager = new TimerManager(); // timeManager 인스턴스 생성
    //private라 인스턴스로 생성
    this.timerManager = TimerManager.getInstance();
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

  update(time: number, delta: number): void {
    this.timerManager.update(delta);
    this.gameBoard.update(time, delta);
    this.gameBoard.render();
  }
}
