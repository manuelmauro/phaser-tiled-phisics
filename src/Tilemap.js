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
    this.tilesets = new Phaser.Structs.Set();
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
    let tileFrom = this.layers.entries[0][ty][tx];
    let tileTo;
    switch (dir) {
      case CONST.DOWN:
        tileTo = this.layers.entries[0][ty][tx - 1];
        break;
      case CONST.LEFT:
        tileTo = this.layers.entries[0][ty - 1][tx - 2];
        break;
      case CONST.RIGHT:
        tileTo = this.layers.entries[0][ty - 1][tx];
        break;
      case CONST.UP:
        tileTo = this.layers.entries[0][ty - 2][tx - 1];
        break;
      default:
    }

    const curTileset = this.tilesets.entries[0];
    if (curTileset[tileTo.index - 1]) {
      if (curTileset[tileTo.index - 1].collide) {
        object.velocity.x = 0;
        object.velocity.y = 0;
      }
    }
  }
}
export default Tilemap;
