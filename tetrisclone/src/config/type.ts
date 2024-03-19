import TetrisBlockI from '../obj/tetrisblock/iblock';
import TetrisBlockJ from '../obj/tetrisblock/jblock';
import TetrisBlockL from '../obj/tetrisblock/lblock';
import TetrisBlockO from '../obj/tetrisblock/oblock';
import TetrisBlockS from '../obj/tetrisblock/sblock';
import TetrisBlockT from '../obj/tetrisblock/tblock';
import TetrisBlockZ from '../obj/tetrisblock/zblock';

export type BlockType =
  | TetrisBlockI
  | TetrisBlockJ
  | TetrisBlockL
  | TetrisBlockO
  | TetrisBlockS
  | TetrisBlockT
  | TetrisBlockZ;

export type BlockInfo = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  tiles: Tiles;
};

export type Tiles = number[][];
