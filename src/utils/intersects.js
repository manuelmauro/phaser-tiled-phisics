/**
 * @author
 * @copyright
 * @license
 */

/**
 * [description]
 *
 * @function Physics.Tiled.intersects
 * @since 3.0.0
 *
 * @param {Physics.Tiled.Body} body1 - [description]
 * @param {Physics.Tiled.Body} body2 - [description]
 *
 * @return {boolean} [description]
 */
export default function intersects(body1, body2) {
  //  Rect vs. Rect
  if (body1.right <= body2.position.x) {
    return false;
  }

  if (body1.bottom <= body2.position.y) {
    return false;
  }

  if (body1.position.x >= body2.right) {
    return false;
  }

  if (body1.position.y >= body2.bottom) {
    return false;
  }

  return true;
}
