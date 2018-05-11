/**
 * @author
 * @copyright
 * @license
 */

import { C } from './index';

/**
  * Returns the normal direction in which the vector is pointing.
  *
  * @method
  * @since 0.1.0
  *
  * @param x - horizontal direction.
  * @param y - vertical direction.
  *
  * @return c - the normal direction the vector is pointing, -1 if it is diagonal.
  *
  */
function direction(x, y) {
  if (y > 0 && x === 0) {
    return C.DOWN;
  } else if (x < 0 && y === 0) {
    return C.LEFT;
  } else if (x > 0 && y === 0) {
    return C.RIGHT;
  } else if (y < 0 && x === 0) {
    return C.UP;
  }
  return -1;
}

export default direction;
