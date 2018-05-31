/**
 * @author
 * @copyright
 * @license
 */

import { intersects, separateX, separateY } from './utils/index';

class Collider {
  constructor(world, body1, body2) {
    /**
     * [description]
     *
     * @name
     * @type
     * @since 3.0.0
     */
    this.world = world;

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.body1 = body1;

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.body2 = body2;

    /**
     * [description]
     *
     * @name
     * @type {boolean}
     * @default true
     * @since 0.1.0
     */
    this.active = true;
  }

  update() {
    if (this.body1.deltaX() !== 0) {
      if (intersects(this.body1, this.body2)) {
        separateX(this.body1, this.body2, false, this.OVERLAP_BIAS);

        //  Are they still intersecting? Let's do the other axis then
        if (intersects(this.body1, this.body2)) {
          separateY(this.body1, this.body2, false, this.OVERLAP_BIAS);
        }
      }
    } else if (intersects(this.body1, this.body2)) {
      separateY(this.body1, this.body2, false, this.OVERLAP_BIAS);

      //  Are they still intersecting? Let's do the other axis then
      if (intersects(this.body1, this.body2)) {
        separateX(this.body1, this.body2, false, this.OVERLAP_BIAS);
      }
    }
  }

  /**
   * [description]
   *
   * @method Phaser.Physics.Arcade.Collider#destroy
   * @since 3.0.0
   */
  destroy() {
    this.world.removeCollider(this);

    this.active = false;

    this.world = null;

    this.object1 = null;
    this.object2 = null;
  }
}

export default Collider;
