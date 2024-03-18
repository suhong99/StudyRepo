import TetrisBlock from './base';
import TETRIS_BLOCK_SHAPE from './shape';

export default class TetrisBlockL extends TetrisBlock {
  constructor() {
    super(TETRIS_BLOCK_SHAPE.L);
  }
}
