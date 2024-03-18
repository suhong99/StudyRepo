import TetrisBlock from './base';
import TETRIS_BLOCK_SHAPE from './shape';

export default class TetrisBlockI extends TetrisBlock {
  constructor() {
    super(TETRIS_BLOCK_SHAPE.I);
  }
}
