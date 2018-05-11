/**
 * @typedef {object} Tile
 *
 * @property {number} [id] - [description]
 * @property {boolean} [inCollideDown] - [description]
 * @property {boolean} [inCollideLeft] - [description]
 * @property {boolean} [inCollideRight] - [description]
 * @property {boolean} [inCollideUp] - [description]
 * @property {boolean} [outCollideDown] - [description]
 * @property {boolean} [outCollideLeft] - [description]
 * @property {boolean} [outCollideRight] - [description]
 * @property {boolean} [outCollideUp] - [description]
 *
 */

import CONST from './const';
import { adjacent } from './utils/tile/index';

class Tilemap {
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
    this.layers = new Phaser.Structs.Set();

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.tilesets = new Phaser.Structs.Map();
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param object - [description]
   * @param tx - [description]
   * @param ty - [description]
   * @param dir - [description]
   *
   */
  transition(object, tx, ty, dir) {
    const tileFromId = this.layers.entries[0][ty][tx];
    const tileTo = adjacent(tx, ty, dir);
    const tileToId = this.layers.entries[0][tileTo.tx][tileTo.ty];
    const tileToProps = this.tilesets.get(tileToId);
    if (tileToProps && tileToProps.collide) {
      object.velocity.x = 0;
      object.velocity.y = 0;
    }
  }
}
export default Tilemap;
