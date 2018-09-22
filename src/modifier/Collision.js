/**
 * @author
 * @copyright
 * @license
 */

import { adjacent } from '../utils/tile/index';

/**
 * @typedef {object} Tile
 *
 * @property {boolean} [inCollideDown] - [description]
 * @property {boolean} [inCollideLeft] - [description]
 * @property {boolean} [inCollideRight] - [description]
 * @property {boolean} [inCollideUp] - [description]
 * @property {boolean} [outCollideDown] - [description]
 * @property {boolean} [outCollideLeft] - [description]
 * @property {boolean} [outCollideRight] - [description]
 * @property {boolean} [outCollideUp] - [description]
 * @property {boolean} [collide] - [description]
 */

/**
 * @classdesc
 * [description]
 *
 * @class Collision
 * @extends
 * @memberOf Physics.Tiled.Modifiers
 * @constructor
 * @since 0.1.0
 *
 * @param {Physics.Tiled.Body} body - [description]
 * @param {Phaser.Tiled.Layer} layers - [description]
 */
class Collision {
  constructor(body, layers) {
    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.body = body;

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.layers = layers;
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   */
  execute() {
    const tileFrom = { tx: this.body.tile.x, ty: this.body.tile.y };
    const tileTo = adjacent(this.body.tile.x, this.body.tile.y, this.body.heading());

    for (let i = 0; i < this.layers.length; i++) {
      const tileFromProps = this.layers[i].propertiesOf(tileFrom.tx, tileFrom.ty);
      const tileToProps = this.layers[i].propertiesOf(tileTo.tx, tileTo.ty);

      if (tileFrom.ty === tileTo.ty - 1) {
        // move down
        if (tileFromProps.inCollideDown || tileToProps.outCollideUp || tileToProps.collide) {
          if (this.body.velocity.y > 0) { this.body.velocity.y = 0; }
          if (this.body.acceleration.y > 0) { this.body.acceleration.y = 0; }
          this.body.lineUp();
        }
      } else if (tileFrom.ty === tileTo.ty + 1) {
        // move up
        if (tileFromProps.inCollideUp || tileToProps.outCollideDown || tileToProps.collide) {
          if (this.body.velocity.y < 0) { this.body.velocity.y = 0; }
          if (this.body.acceleration.y < 0) { this.body.acceleration.y = 0; }
          this.body.lineUp();
        }
      }

      if (tileFrom.tx === tileTo.tx + 1) {
        // move left
        if (tileFromProps.inCollideLeft || tileToProps.outCollideRight || tileToProps.collide) {
          if (this.body.velocity.x < 0) { this.body.velocity.x = 0; }
          if (this.body.acceleration.x < 0) { this.body.acceleration.x = 0; }
          this.body.lineUp();
        }
      } else if (tileFrom.tx === tileTo.tx - 1) {
        // move right
        if (tileFromProps.inCollideRight || tileToProps.outCollideLeft || tileToProps.collide) {
          if (this.body.velocity.x > 0) { this.body.velocity.x = 0; }
          if (this.body.acceleration.x > 0) { this.body.acceleration.x = 0; }
          this.body.lineUp();
        }
      }
    }
  }
}

export default Collision;
