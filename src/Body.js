/**
 * @author
 * @copyright
 * @license
 */

import CONST from './const';

class Body {
  constructor(world, gameObject) {
    const width = (gameObject.width) ? gameObject.width : 8;
    const height = (gameObject.height) ? gameObject.height : 8;

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
    this.gameObject = gameObject;

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.enable = true;

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.offset = new Vector2();

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.position = new Vector2(gameObject.x, gameObject.y);

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.width = width;

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.height = height;

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.mass = 1;

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.strength = -1;

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.facing = CONST.FACING_NONE;

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.immovable = false;

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.collidable = true;

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.collideWorldBounds = false;
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param
   * @param
   *
   */
  update(time, delta) {

  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   */
  postUpdate() {

  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param x - [description]
   * @param y - [description]
   *
   * @return
   *
   */
  setOffset(x, y) {
    if (y === undefined) { y = x; }

    this.offset.set(x, y);

    return this;
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param width - [description]
   * @param height - [description]
   *
   * @return
   *
   */
  setSize(width, height) {
    return this;
  }

  /**
   * Resets this Body to the given coordinates. Also positions its parent Game Object to the same coordinates.
   * If the body had any velocity or acceleration it is lost as a result of calling this.
   *
   * @method
   * @since 0.1.0
   *
   * @param {number} x - The horizontal position to place the Game Object and Body.
   * @param {number} y - The vertical position to place the Game Object and Body.
   */
  reset(x, y) {
    this.stop();
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @return {Phaser.Physics.Arcade.Body} This Body object.
   */
  stop() {
    return this;
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   */
  destroy() {
    this.enable = false;

    this.world.pendingDestroy.set(this);
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param {number} value - [description]
   *
   * @return This Body object.
   */
  setVelocityX(value) {
    this.velocity.x = value;
    this.velocity.y = 0;

    return this;
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param {number} value - [description]
   *
   * @return This Body object.
   */
  setVelocityY(value) {
    this.velocity.x = 0;
    this.velocity.y = value;

    return this;
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param {number} value - [description]
   *
   * @return This Body object.
   */
  setMass(value) {
    this.mass = value;

    return this;
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param {boolean} value - [description]
   *
   * @return This Body object.
   */
  setImmovable(value) {
    this.immovable = value;

    return this;
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   */
  snapToGrid() {
    this.position = {
      x: Math.round(this.gameObject.x / CONST.TILE_WIDTH),
      y: Math.round(this.gameObject.y / CONST.TILE_HEIGHT),
    };
    this.gameObject.x = CONST.TILE_WIDTH * this.position.x;
    this.gameObject.y = CONST.TILE_HEIGHT * this.position.y;
  }
}

export default Body;
