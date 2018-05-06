/**
 * @author
 * @copyright
 * @license
 */

import CONST from './const';

class Body {
  constructor(world, gameObject) {
    /**
     * [description]
     *
     * @name Physics.Tiled.Body#world
     * @type {Physics.Tiled.World}
     * @since 0.1.0
     */
    this.world = world;

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#gameObject
     * @type
     * @since 0.1.0
     */
    this.gameObject = gameObject;

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#enable
     * @type
     * @since 0.1.0
     */
    this.enable = true;

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#offset
     * @type
     * @since 0.1.0
     */
    this.offset = new Phaser.Math.Vector2();

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#position
     * @type
     * @since 0.1.0
     */
    this.position = new Phaser.Math.Vector2(gameObject.x, gameObject.y);

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#tile
     * @type
     * @since 0.1.0
     */
    this.tile = new Phaser.Math.Vector2();

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#velocity
     * @type
     * @since 0.1.0
     */
    this.velocity = new Phaser.Math.Vector2();

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#width
     * @type
     * @since 0.1.0
     */
    this.width = CONST.TILE_WIDTH;

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#height
     * @type
     * @since 0.1.0
     */
    this.height = CONST.TILE_HEIGHT;

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#mass
     * @type
     * @since 0.1.0
     */
    this.mass = 1;

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#strength
     * @type
     * @since 0.1.0
     */
    this.strength = -1;

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#facing
     * @type
     * @since 0.1.0
     */
    this.facing = CONST.FACING_NONE;

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#immovable
     * @type
     * @since 0.1.0
     */
    this.immovable = false;

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#collide
     * @type
     * @since 0.1.0
     */
    this.collidable = true;

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#locked
     * @type
     * @since 0.1.0
     */
    this.locked = new Phaser.Math.Vector2();

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#collideWorldBounds
     * @type
     * @since 0.1.0
     */
    this.collideWorldBounds = false;
  }

  /**
   * [description]
   *
   * @method Physics.Tiled.Body#update
   * @since 0.1.0
   *
   * @param {number} time - [description]
   * @param {number} delta - [description]
   *
   */
  update(delta) {
    const next = { };

    // x axis
    next.x = this.position.x + (this.velocity.x * (delta / 1000));
    const twidth = this.world.tilesize.x;

    if (Math.floor(next.x / twidth) > Math.floor(this.position.x / twidth)) {
      // the body moved one tile right
      this.position.x = Math.floor(next.x / twidth) * twidth;
      this.velocity.x = 0;
    } else if (Math.ceil(next.x / twidth) < Math.ceil(this.position.x / twidth)) {
      // the body moved one tile left
      this.position.x = Math.ceil(next.x / twidth) * twidth;
      this.velocity.x = 0;
    } else {
      // the body is moving between two tiles
      this.position.x = next.x;
    }

    // y axis
    next.y = this.position.y + (this.velocity.y * (delta / 1000));
    const theight = this.world.tilesize.x;

    if (Math.floor(next.y / theight) > Math.floor(this.position.y / theight)) {
      // the body moved one tile down
      this.position.y = Math.floor(next.y / theight) * theight;
      this.velocity.y = 0;
    } else if (Math.ceil(next.y / theight) < Math.ceil(this.position.y / theight)) {
      // the body moved one tile up
      this.position.y = Math.ceil(next.y / theight) * theight;
      this.velocity.y = 0;
    } else {
      // the body is moving between two tiles
      this.position.y = next.y;
    }
  }

  /**
   * [description]
   *
   * @method Physics.Tiled.Body#postUpdate
   * @since 0.1.0
   *
   */
  postUpdate() {
    this.gameObject.x = this.position.x - this.offset.x;
    this.gameObject.y = this.position.y - this.offset.y;
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param {number} x - [description]
   * @param {number} y - [description]
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
   * @param {number} width - [description]
   * @param {number} height - [description]
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
   * @return {Physics.Tiled.Body} This Body object.
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
    this.tile = {
      x: Math.round(this.gameObject.x / CONST.TILE_WIDTH),
      y: Math.round(this.gameObject.y / CONST.TILE_HEIGHT),
    };
    this.gameObject.x = CONST.TILE_WIDTH * this.tile.x;
    this.gameObject.y = CONST.TILE_HEIGHT * this.tile.y;
  }
}

export default Body;
