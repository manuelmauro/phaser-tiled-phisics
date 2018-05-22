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
  * @return c - the 'compass' direction the vector is pointing.
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
  } else if (x < 0 && y > 0) {
    return C.DOWN_LEFT;
  } else if (x > 0 && y > 0) {
    return C.DOWN_RIGHT;
  } else if (x < 0 && y < 0) {
    return C.UP_LEFT;
  } else if (x > 0 && y < 0) {
    return C.UP_RIGHT;
  }
  return -1;
}

export default direction;
