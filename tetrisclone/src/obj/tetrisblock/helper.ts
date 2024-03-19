import { BlockInfo, Tiles } from '../../config/type';

export const checkBlockCollision = (blockInfo: BlockInfo, board: Tiles) => {
  const { startX, startY, endX, endY, tiles } = blockInfo;
  for (let y = startY, y2 = 0; y < endY; y++, y2++) {
    for (let x = startX, x2 = 0; x < endX; x++, x2++) {
      if (y < 0 || x < 0) continue;
      if (tiles[y2][x2] !== 0 && board[y][x] !== 0) return true;
    }
  }
  return false;
};

export const checkBlockWithInArea = (blockInfo: BlockInfo, board: Tiles) => {
  const { startX, startY, endX, endY, tiles } = blockInfo;
  const blockHeight = tiles.length;
  const blockWidth = tiles[0].length;
  const boardHeight = board.length;
  const boardWidth = board[0].length;

  // 범위 왼쪽 벗어나면
  if (startX < 0) {
    for (let y = 0; y < blockHeight; y++) {
      for (let x = 0; x < 0 - startX; x++) {
        if (tiles[y][x] !== 0) {
          return false;
        }
      }
    }
  }

  // 오른쪽으로 넘어서면
  if (endX > boardWidth) {
    for (let y = 0; y < blockHeight; y++) {
      for (let x = blockWidth - (endX - boardWidth); x < blockWidth; x++) {
        if (tiles[y][x] !== 0) {
          return false;
        }
      }
    }
  }

  //위아래로 벗어나면
  if (endY > boardHeight) {
    for (let y = blockHeight - (endY - boardHeight); y < blockHeight; y++) {
      for (let x = 0; x < blockWidth; x++) {
        if (tiles[y][x] !== 0) {
          return false;
        }
      }
    }
  }

  return true;
};
