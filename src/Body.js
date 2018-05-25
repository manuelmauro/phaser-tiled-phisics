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
    this.position = new Phaser.Math.Vector2();

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
    this.size = new Phaser.Math.Vector2(this.world.tilesize.x, this.world.tilesize.y);

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
     * @name Physics.Tiled.Body#dirty
     * @type {boolean}
     * @default false
     * @since 0.1.0
     */
    this.dirty = false;

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#events
     * @type
     * @since 0.1.0
     */
    this.events = new Phaser.EventEmitter();

    /**
     * [description]
     *
     * @name Physics.Tiled.Body#onTile
     * @type
     * @since 0.1.0
     */
    this.onTile = true;

    // init
    this.lineUp();
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

    // compute the behavior of the body moving between two tiles
    this.events.emit('Transition');
    this.onTile = false;

    // on tile heart beat
    if (this.velocity.x === 0 && this.velocity.y === 0) {
      this.events.emit('Tile');
      this.onTile = true;
    }

    // Newton's laws of motion
    // velocity
    this.velocity.x = this.velocity.x
                    + (this.acceleration.x * (delta / 1000));
    this.velocity.y = this.velocity.y
                    + (this.acceleration.y * (delta / 1000));
    // space
    const next = { };
    next.x = this.position.x
           + (this.velocity.x * (delta / 1000))
           + ((1 / 2) * this.acceleration.x * ((delta / 1000) ** 2));
    next.y = this.position.y
           + (this.velocity.y * (delta / 1000))
           + ((1 / 2) * this.acceleration.y * ((delta / 1000) ** 2));

    // make sure that the body goes through all the tiles along its path
    // x axis
    const twidth = this.world.tilesize.x;
    if (Math.floor(next.x / twidth) > Math.floor(this.position.x / twidth)) {
      // the body moved one tile right
      // update body
      this.tile.x = Math.floor(next.x / twidth);
      this.position.x = this.tile.x * twidth;
      this.onTile = true;
      // emit events
      this.events.emit('Tile');
    } else if (Math.ceil(next.x / twidth) < Math.ceil(this.position.x / twidth)) {
      // the body moved one tile left
      // update body
      this.tile.x = Math.ceil(next.x / twidth);
      this.position.x = this.tile.x * twidth;
      this.onTile = true;
      // emit events
      this.events.emit('Tile');
    } else {
      // the body is moving between two tiles
      this.position.x = next.x;
    }

    // y axis
    const theight = this.world.tilesize.x;
    if (Math.floor(next.y / theight) > Math.floor(this.position.y / theight)) {
      // the body moved one tile down
      // update body
      this.tile.y = Math.floor(next.y / theight);
      this.position.y = this.tile.y * theight;
      this.onTile = true;
      // emit events
      this.events.emit('Tile');
    } else if (Math.ceil(next.y / theight) < Math.ceil(this.position.y / theight)) {
      // the body moved one tile up
      // update body
      this.tile.y = Math.ceil(next.y / theight);
      this.position.y = this.tile.y * theight;
      this.onTile = true;
      // emit events
      this.events.emit('Tile');
    } else {
      // the body is moving between two tiles
      this.position.y = next.y;
    }

    // update facing direction
    if (this.velocity.x !== 0 || this.velocity.y !== 0) {
      this.facing = direction(this.velocity.x, this.velocity.y);
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

    // apply changes to the graphical object
    this.gameObject.x = (this.position.x + (this.gameObject.width / 2)) - this.offset.x;
    this.gameObject.y = (this.position.y + (this.gameObject.height / 2)) - this.offset.y;
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
    this.size.set(width, height);
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
  stop() {
    this.velocity.set(0, 0);
    this.acceleration.set(0, 0);
    this.lineUp();
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
  safeVelocity(x, y) {
    if (this.onTile) {
      this.velocity.set(x, y);
    }
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
}

export default Body;
