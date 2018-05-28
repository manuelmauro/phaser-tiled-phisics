/**
 * @author
 * @copyright
 * @license
 */

import { C, direction } from './utils/tile/index';

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
     * @name Physics.Tiled.Body#prev
     * @type
     * @since 0.1.0
     */
    this.prev = new Phaser.Math.Vector2(gameObject.x, gameObject.y);

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#tile
     * @type
     * @since 0.1.0
     */
    this.tile = new Phaser.Math.Vector2(
      Math.floor(this.position.x / this.world.tilesize.x),
      Math.floor(this.position.y / this.world.tilesize.y)
    );

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
     * @name Physics.Tiled.Body#velocity
     * @type
     * @since 0.1.0
     */
    this.velocity = new Phaser.Math.Vector2();

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#newVelocity
     * @type
     * @since 0.1.0
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
     * @name Physics.Tiled.Body#facing
     * @type
     * @since 0.1.0
     */
    this.facing = C.DOWN;

    /**
     * [description]
     *
     * @name Phaser.Physics.Arcade.Body#immovable
     * @type {boolean}
     * @default false
     * @since 3.0.0
     */
    this.immovable = false;

    /**
     * [description]
     *
     * @name Phaser.Physics.Arcade.Body#moves
     * @type {boolean}
     * @default true
     * @since 3.0.0
     */
    this.moves = true;

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#dirty
     * @type {boolean}
     * @default false
     * @since 0.1.0
     */
    this.dirty = false;

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#isOnTile
     * @type
     * @since 0.1.0
     */
    this.isOnTile = true;

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#wasOnTile
     * @type
     * @since 0.1.0
     */
    this.wasOnTile = true;
  }

  /**
   * [description]
   *
   * @method Physics.Tiled.Body#update
   * @since 0.1.0
   *
   * @param {number} delta - [description]
   */
  update(delta) {
    this.dirty = true;

    this.isOnTile = false;

    if (this.moves) {
      this.velocity.x += this.acceleration.x * delta;
      this.velocity.y += this.acceleration.y * delta;

      this.newVelocity.x = this.velocity.x * delta;
      this.newVelocity.y = this.velocity.y * delta;

      const next = { };
      next.x = this.position.x + this.newVelocity.x;
      next.y = this.position.y + this.newVelocity.y;

      // make sure that the body goes through all the tiles along its path
      const twidth = this.world.tilesize.x;
      if (Math.floor(next.x / twidth) > Math.floor(this.position.x / twidth)) {
        // the body moved one tile right
        this.tile.x = Math.floor(next.x / twidth);
        this.position.x = this.tile.x * twidth;
        this.isOnTile = true;
      } else if (Math.ceil(next.x / twidth) < Math.ceil(this.position.x / twidth)) {
        // the body moved one tile left
        this.tile.x = Math.ceil(next.x / twidth);
        this.position.x = this.tile.x * twidth;
        this.isOnTile = true;
      } else {
        // the body is moving between two tiles
        this.position.x = next.x;
      }

      const theight = this.world.tilesize.x;
      if (Math.floor(next.y / theight) > Math.floor(this.position.y / theight)) {
        // the body moved one tile down
        this.tile.y = Math.floor(next.y / theight);
        this.position.y = this.tile.y * theight;
        this.isOnTile = true;
      } else if (Math.ceil(next.y / theight) < Math.ceil(this.position.y / theight)) {
        // the body moved one tile up
        this.tile.y = Math.ceil(next.y / theight);
        this.position.y = this.tile.y * theight;
        this.isOnTile = true;
      } else {
        // the body is moving between two tiles
        this.position.y = next.y;
      }

      // update facing direction
      if (this.velocity.x !== 0 || this.velocity.y !== 0) {
        this.facing = direction(this.velocity.x, this.velocity.y);
      }
    }
  }

  /**
   * [description]
   *
   * @method Physics.Tiled.Body#postUpdate
   * @since 0.1.0
   */
  postUpdate() {
    //  Only allow postUpdate to be called once per frame
    if (!this.enable || !this.dirty) {
      return;
    }

    this.dirty = false;

    this.gameObject.x = (this.position.x + (this.gameObject.width / 2)) - this.offset.x;
    this.gameObject.y = (this.position.y + (this.gameObject.height / 2)) - this.offset.y;

    this.prev.x = this.position.x;
    this.prev.y = this.position.y;
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @return
   */
  heading() {
    if (this.velocity.x !== 0 || this.velocity.y !== 0) {
      this.facing = direction(this.velocity.x, this.velocity.y);
    }
    return this.facing;
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
   * @return {Physics.Tiled.Body} This Body object.
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
   * @return {Physics.Tiled.Body} This Body object.
   */
  setSize(width, height) {
    this.width = width;
    this.height = height;
    return this;
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param {number} x - [description]
   * @param {number} y - [description]
   */
  reset(x, y) {
    this.stop();
    this.gameObject.setPosition(x, y);
    this.gameObject.getTopLeft(this.position);
    this.prev.copy(this.position);
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
    this.velocity.set(0, 0);
    this.acceleration.set(0, 0);
    return this;
  }

  /**
   * [description]
   *
   * @method Physics.Tiled.Body#deltaAbsX
   * @since 3.0.0
   *
   * @return {number} [description]
   */
  deltaAbsX() {
    return (this.deltaX() > 0) ? this.deltaX() : -this.deltaX();
  }

  /**
   * [description]
   *
   * @method Physics.Tiled.Body#deltaAbsY
   * @since 3.0.0
   *
   * @return {number} [description]
   */
  deltaAbsY() {
    return (this.deltaY() > 0) ? this.deltaY() : -this.deltaY();
  }

  /**
   * [description]
   *
   * @method Physics.Tiled.Body#deltaX
   * @since 3.0.0
   *
   * @return {number} [description]
   */
  deltaX() {
    return this.position.x - this.prev.x;
  }

  /**
   * [description]
   *
   * @method Physics.Tiled.Body#deltaY
   * @since 3.0.0
   *
   * @return {number} [description]
   */
  deltaY() {
    return this.position.y - this.prev.y;
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
   * @param {number} x - [description]
   * @param {number} y - [description]
   *
   * @return {Physics.Tiled.Body} This Body object.
   */
  setVelocity(x, y) {
    this.velocity.set(x, y);
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
   * @return {Physics.Tiled.Body} This Body object.
   */
  setVelocityX(value) {
    this.velocity.x = value;
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
   * @return {Physics.Tiled.Body} This Body object.
   */
  setVelocityY(value) {
    this.velocity.y = value;
    return this;
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
   * @return {Physics.Tiled.Body} This Body object.
   */
  setAcceleration(x, y) {
    this.acceleration.set(x, y);
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
   * @return {Physics.Tiled.Body} This Body object.
   */
  setAccelerationX(value) {
    this.acceleration.x = value;
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
   * @return {Physics.Tiled.Body} This Body object.
   */
  setAccelerationY(value) {
    this.acceleration.y = value;
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
   * @return {Physics.Tiled.Body} This Body object.
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
   * @return {Physics.Tiled.Body} This Body object.
   */
  lineUp() {
    this.tile.x = Math.floor(this.gameObject.x / this.world.tilesize.x);
    this.tile.y = Math.floor(this.gameObject.y / this.world.tilesize.y);
    this.position.x = this.world.tilesize.x * this.tile.x;
    this.position.y = this.world.tilesize.y * this.tile.y;
    return this;
  }
}

export default Body;
