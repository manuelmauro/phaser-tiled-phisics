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
  constructor(body, layer) {
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
    this.layer = layer;
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param tileFrom - [description]
   * @param tileTo - [description]
   *
   */
  transition(tileFrom, tileTo) {
    const id = this.layer.data[tileTo.tx][tileTo.ty];
    const props = this.layer.tileset.get(id) || {};

    if (props.collide) {
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
      this.body.tile.x = tileFrom.tx;
      this.body.tile.y = tileFrom.ty;
    }
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param tile - [description]
   *
   */
  on(tile) {
  }
}

export default SimpleCollision;
