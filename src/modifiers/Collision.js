/**
 * @author
 * @copyright
 * @license
 */


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
 *
 */
class Collision {
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
    const tileFromId = this.layer.data[tileFrom.tx][tileFrom.ty];
    const tileFromProps = this.layer.tileset.get(tileFromId) || {};

    const tileToId = this.layer.data[tileTo.tx][tileTo.ty];
    const tileToProps = this.layer.tileset.get(tileToId) || {};

    if (tileFrom.ty === tileTo.ty - 1) {
      // move down
      if (tileFromProps.inCollideDown || tileToProps.outCollideUp) {
        this.body.velocity.set(0, 0);
      }
    } else if (tileFrom.tx === tileTo.tx + 1) {
      // move left
      if (tileFromProps.inCollideLeft || tileToProps.outCollideRight) {
        this.body.velocity.set(0, 0);
      }
    } else if (tileFrom.tx === tileTo.tx - 1) {
      // move right
      if (tileFromProps.inCollideRight || tileToProps.outCollideLeft) {
        this.body.velocity.set(0, 0);
      }
    } else if (tileFrom.ty === tileTo.ty + 1) {
      // move up
      if (tileFromProps.inCollideUp || tileToProps.outCollideDown) {
        this.body.velocity.set(0, 0);
      }
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

export default Collision;
