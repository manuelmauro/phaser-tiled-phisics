/**
 * @author
 * @copyright
 * @license
 */

/**
 * [description]
 *
 * @function Physics.Tiled.getOverlapY
 * @since 3.0.0
 *
 * @param {Physics.Tiled.Body} body1 - [description]
 * @param {Physics.Tiled.Body} body2 - [description]
 * @param {boolean} overlapOnly - [description]
 * @param {number} bias - [description]
 *
 * @return {number} [description]
 */
export default function getOverlapY(body1, body2, overlapOnly, bias) {
  let overlap = 0;
  const maxOverlap = body1.deltaAbsY() + body2.deltaAbsY() + bias;

  if (body1.deltaY() === 0 && body2.deltaY() === 0) {
    //  They overlap but neither of them are moving
  } else if (body1.deltaY() > body2.deltaY()) {
    //  Body1 is moving down and/or Body2 is moving up
    overlap = body1.bottom - body2.y;

    if ((overlap > maxOverlap && !overlapOnly)) {
      overlap = 0;
    }
  } else if (body1.deltaY() < body2.deltaY()) {
    //  Body1 is moving up and/or Body2 is moving down
    overlap = body1.y - body2.bottom;

    if ((-overlap > maxOverlap && !overlapOnly)) {
      overlap = 0;
    }
  }

  return overlap;
}
