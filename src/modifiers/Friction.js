/**
 * @author
 * @copyright
 * @license
 */

/**
 * @typedef {object} Tile
 *
 * @property {float} [friction] - [description]
 *
 */
class Friction {
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
    this.body.sliding = false;

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
    const id = this.layer.data[tile.tx][tile.ty];
    const props = this.layer.tileset.get(id) || {};

    if (!props.friction) { props.friction = 0; }
    this.body.velocity.x = props.friction * this.body.velocity.x;
    this.body.velocity.y = props.friction * this.body.velocity.y;
    this.body.acceleration.x = props.friction * this.body.acceleration.x;
    this.body.acceleration.y = props.friction * this.body.acceleration.y;

    this.body.sliding = props.friction > 0;
  }
}

export default Friction;
