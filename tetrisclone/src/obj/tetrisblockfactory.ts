import { BlockType } from '../config/type';
import TetrisBlockI from './tetrisblock/iblock';
import TetrisBlockJ from './tetrisblock/jblock';
import TetrisBlockL from './tetrisblock/lblock';
import TetrisBlockO from './tetrisblock/oblock';
import TetrisBlockS from './tetrisblock/sblock';
import TetrisBlockT from './tetrisblock/tblock';
import TetrisBlockZ from './tetrisblock/zblock';

export default class TetrisBlockFactory {
  private static instance: TetrisBlockFactory;

  private _blocks: BlockType[] = [];

  private constructor() {
    if (!TetrisBlockFactory.instance) {
      TetrisBlockFactory.instance = this;

      this._blocks = [
        new TetrisBlockI(),
        new TetrisBlockJ(),
        new TetrisBlockL(),
        new TetrisBlockO(),
        new TetrisBlockS(),
        new TetrisBlockT(),
        new TetrisBlockZ(),
      ];
    }

    return TetrisBlockFactory.instance;
  }

  public static getInstance(): TetrisBlockFactory {
    // getInstance 메서드를 통해 인스턴스에 접근
    return TetrisBlockFactory.instance || new TetrisBlockFactory();
  }

  public createRandomBlock(): BlockType {
    return this._blocks[Math.floor(Math.random() * this._blocks.length)];
  }
}
