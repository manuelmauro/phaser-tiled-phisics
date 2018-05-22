/**
 * @author
 * @copyright
 * @license
 */

import { direction } from './utils/tile/index';
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
    this.position = new Phaser.Math.Vector2();

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#tile
     * @type
     * @since 0.1.0
     */
    this.tile = new Phaser.Math.Vector2();
    this.snapToGrid();

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
     * @name Phaser.Physics.Arcade.Body#newVelocity
     * @type {Phaser.Math.Vector2}
     * @since 3.0.0
     */
    this.newVelocity = new Phaser.Math.Vector2();

    /**
     * [description]
     *
     * @name Phaser.Physics.Arcade.Body#acceleration
     * @type {Phaser.Math.Vector2}
     * @since 3.0.0
     */
    this.acceleration = new Phaser.Math.Vector2();

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#width
     * @type
     * @since 0.1.0
     */
    this.width = this.world.tilesize.x;

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#height
     * @type
     * @since 0.1.0
     */
    this.height = this.world.tilesize.y;

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#facing
     * @type
     * @since 0.1.0
     */
    this.facing = CONST.DOWN;

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#dirty
     * @type {boolean}
     * @default false
     * @since 0.1.0
     */
    this.dirty = false;
  }

  /**
   * [description]
   *
   * @method Physics.Tiled.Body#update
   * @since 0.1.0
   *
   * @param {number} delta - [description]
   *
   */
  update(delta) {
    this.dirty = true;

    // facing direction
    if (this.velocity.x !== 0 || this.velocity.y !== 0) {
      this.facing = direction(this.velocity.x, this.velocity.y);
    }

    // compute the behavior of the body moving between two tiles
    this.world.tilemap.transition(this, this.tile.x, this.tile.y, this.facing);

    this.velocity.x = this.velocity.x + (this.acceleration.x * (delta / 1000));
    this.velocity.y = this.velocity.y + (this.acceleration.y * (delta / 1000));

    const next = { };
    next.x = this.position.x
           + (this.velocity.x * (delta / 1000))
           + ((1 / 2) * this.acceleration.x * ((delta / 1000) ** 2));
    next.y = this.position.y
           + (this.velocity.y * (delta / 1000))
           + ((1 / 2) * this.acceleration.y * ((delta / 1000) ** 2));

    // x axis
    const twidth = this.world.tilesize.x;
    if (Math.floor(next.x / twidth) > Math.floor(this.position.x / twidth)) {
      // the body moved one tile right
      this.tile.x = Math.floor(next.x / twidth);
      this.position.x = this.tile.x * twidth;
      //
      this.world.tilemap.on(this, this.tile.x, this.tile.y);
    } else if (Math.ceil(next.x / twidth) < Math.ceil(this.position.x / twidth)) {
      // the body moved one tile left
      this.tile.x = Math.ceil(next.x / twidth);
      this.position.x = this.tile.x * twidth;
      //
      this.world.tilemap.on(this, this.tile.x, this.tile.y);
    } else {
      // the body is moving between two tiles
      this.position.x = next.x;
    }

    // y axis
    const theight = this.world.tilesize.x;
    if (Math.floor(next.y / theight) > Math.floor(this.position.y / theight)) {
      // the body moved one tile down
      this.tile.y = Math.floor(next.y / theight);
      this.position.y = this.tile.y * theight;
      //
      this.world.tilemap.on(this, this.tile.x, this.tile.y);
    } else if (Math.ceil(next.y / theight) < Math.ceil(this.position.y / theight)) {
      // the body moved one tile up
      this.tile.y = Math.ceil(next.y / theight);
      this.position.y = this.tile.y * theight;
      //
      this.world.tilemap.on(this, this.tile.x, this.tile.y);
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
    //  Only allow postUpdate to be called once per frame
    if (!this.enable || !this.dirty) {
      return;
    }

    this.dirty = false;

    this.gameObject.x = (this.position.x + (this.gameObject.width / 2)) - this.offset.x;
    this.gameObject.y = (this.position.y + (this.gameObject.height / 2)) - this.offset.y;
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
    this.width = width;
    this.height = height;
    return this;
  }

  /**
   * Resets this Body to the given coordinates. Also positions its parent
   * Game Object to the same coordinates.
   * If the body had any velocity or acceleration it is lost as a result
   * of calling this.
   *
   * @method
   * @since 0.1.0
   *
   * @param {number} x - The horizontal position to place the Game Object and Body.
   * @param {number} y - The vertical position to place the Game Object and Body.
   */
  reset(x, y) {
    this.position.x = x;
    this.position.y = y;
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
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.snapToGrid();
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
    if (this.velocity.y !== 0) {
      return this;
    }

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
    if (this.velocity.x !== 0) {
      return this;
    }

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
   */
  snapToGrid() {
    this.tile.x = Math.floor(this.gameObject.x / this.world.tilesize.x);
    this.tile.y = Math.floor(this.gameObject.y / this.world.tilesize.y);
    this.position.x = this.world.tilesize.x * this.tile.x;
    this.position.y = this.world.tilesize.y * this.tile.y;
  }
}

export default Body;
