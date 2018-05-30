/**
 * @author
 * @copyright
 * @license
 */

import { getOverlapX } from './index';

/**
 * [description]
 *
 * @function Physics.Tiled.separateX
 * @since 3.0.0
 *
 * @param {Physics.Tiled.Body} body1 - [description]
 * @param {Physics.Tiled.Body} body2 - [description]
 * @param {boolean} overlapOnly - [description]
 * @param {number} bias - [description]
 *
 * @return {boolean} [description]
 */
export default function separateX(body1, body2, overlapOnly, bias) {
  let overlap = getOverlapX(body1, body2, overlapOnly, bias);

  //  Can't separate two immovable bodies, or a body with its own custom separation logic
  if (overlapOnly || overlap === 0 || (body1.immovable && body2.immovable)) {
    //  return true if there was some overlap, otherwise false
    return (overlap !== 0);
  }

  //  Adjust their positions and velocities accordingly (if there was any overlap)
  const v1 = body1.velocity.x;
  const v2 = body2.velocity.x;

  if (!body1.immovable && !body2.immovable) {
    overlap *= 0.5;

    body1.x -= overlap;
    body2.x += overlap;

    let nv1 = Math.sqrt((v2 * v2 * body2.mass) / body1.mass) * ((v2 > 0) ? 1 : -1);
    let nv2 = Math.sqrt((v1 * v1 * body1.mass) / body2.mass) * ((v1 > 0) ? 1 : -1);
    const avg = (nv1 + nv2) * 0.5;

    nv1 -= avg;
    nv2 -= avg;

    body1.velocity.x = avg + nv1 * body1.bounce.x;
    body2.velocity.x = avg + nv2 * body2.bounce.x;
  } else if (!body1.immovable) {
    body1.x -= overlap;
    body1.velocity.x = v2 - v1 * body1.bounce.x;

    //  This is special case code that handles things like vertically moving platforms you can ride
    if (body2.moves) {
      body1.y += (body2.y - body2.prev.y) * body2.friction.y;
    }
  } else {
    body2.x += overlap;
    body2.velocity.x = v1 - v2 * body2.bounce.x;

    //  This is special case code that handles things like vertically moving platforms you can ride
    if (body1.moves) {
      body2.y += (body1.y - body1.prev.y) * body1.friction.y;
    }
  }

  //  If we got this far then there WAS overlap, and separation is complete, so return true
  return true;
}
