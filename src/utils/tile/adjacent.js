/**
 * @author
 * @copyright
 * @license
 */

import { C, down, left, right, up } from './index';

/**
  * Returns the coordinates of the tile next to the one in input, in the direction specified.
  *
  * @method
  * @since 0.1.0
  *
  * @param tx - horizontal coordinate of the tile.
  * @param ty - vertical coordinate of the tile.
  * @param dir - direction of the desired tile.
  *
  * @return { x, y } - the coordinates of the tile adjacent in the specified direction or an empty
  *                    item in the case of a wrong direction parameter.
  */
function adjacent(tx, ty, dir) {
  switch (dir) {
    case C.DOWN:
      return down(tx, ty);
    case C.LEFT:
      return left(tx, ty);
    case C.RIGHT:
      return right(tx, ty);
    case C.UP:
      return up(tx, ty);
    default:
      return {};
  }
}

export default adjacent;
