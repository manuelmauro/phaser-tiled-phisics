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
    this.layers = [];

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.tilesets = [];
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param tx - [description]
   * @param ty - [description]
   *
   */
  collide(object, tx, ty) {

  }
}
export default Tilemap;
