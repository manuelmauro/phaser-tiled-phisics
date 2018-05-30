/**
 * @author
 * @copyright
 * @license
 */

/**
 * [description]
 *
 * @function Physics.Tiled.getOverlapX
 * @since 3.0.0
 *
 * @param {Physics.Tiled.Body} body1 - [description]
 * @param {Physics.Tiled.Body} body2 - [description]
 * @param {boolean} overlapOnly - [description]
 * @param {number} bias - [description]
 *
 * @return {number} [description]
 */
export default function getOverlapX(body1, body2, overlapOnly, bias) {
  let overlap = 0;
  const maxOverlap = body1.deltaAbsX() + body2.deltaAbsX() + bias;

  if (body1.deltaX() === 0 && body2.deltaX() === 0) {
    //  They overlap but neither of them are moving
  } else if (body1.deltaX() > body2.deltaX()) {
    //  Body1 is moving right and / or Body2 is moving left
    overlap = body1.right - body2.x;

    if ((overlap > maxOverlap && !overlapOnly)) {
      overlap = 0;
    }
  } else if (body1.deltaX() < body2.deltaX()) {
    //  Body1 is moving left and/or Body2 is moving right
    overlap = body1.x - body2.width - body2.x;

    if ((-overlap > maxOverlap && !overlapOnly)) {
      overlap = 0;
    }
  }

  return overlap;
}
