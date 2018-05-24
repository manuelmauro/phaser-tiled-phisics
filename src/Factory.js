/**
 * @author
 * @copyright
 * @license
 */

class Factory {
  constructor(world) {
    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.world = world;

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.tilemap = world.tilemap;
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param modifier - [description]
   */
  modifier(modifier) {
    this.tilemap.addModifier(modifier);
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param body - [description]
   * @param layer - [description]
   */
  collision(body, layer) {
    this.tilemap.addCollision(body, layer);
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param body - [description]
   * @param layer - [description]
   */
  force(body, layer) {
    this.tilemap.addForce(body, layer);
    this.tilemap.on(body);
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param body - [description]
   * @param layer - [description]
   */
  inertia(body, layer) {
    this.tilemap.addInertia(body, layer);
    this.tilemap.on(body);
  }
}

export default Factory;
