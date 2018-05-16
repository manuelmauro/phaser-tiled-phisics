/**
 * @author
 * @copyright
 * @license
 */

/**
 * @typedef {object} Tile
 *
 * @property {boolean} [collide] - [description]
 *
 */
class SimpleCollision {
  constructor(tilemap) {
    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.tilemap = tilemap;
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param object - [description]
   * @param tileFrom - [description]
   * @param tileTo - [description]
   *
   */
  transition(object, tileFrom, tileTo) {
    if (tileTo.props && tileTo.props.collide) {
      object.velocity.x = 0;
      object.velocity.y = 0;
      object.tile.x = tileFrom.tx;
      object.tile.y = tileFrom.ty;
    }
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param object - [description]
   * @param tile - [description]
   *
   */
  on(object, tile) {
  }
}

export default SimpleCollision;
