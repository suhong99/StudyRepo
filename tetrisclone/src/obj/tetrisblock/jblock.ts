import TetrisBlock from './base';
import TETRIS_BLOCK_SHAPE from './shape';

export default class TetrisBlockJ extends TetrisBlock {
  constructor() {
    super(TETRIS_BLOCK_SHAPE.J);
  }
}
