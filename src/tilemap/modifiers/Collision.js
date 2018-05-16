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
    if (!tileFrom.props) { tileFrom.props = {}; };
    if (!tileTo.props) { tileTo.props = {}; };

    if (tileFrom.ty === tileTo.ty - 1) {
      // move down
      if (tileFrom.props.inCollideDown || tileTo.props.outCollideUp) {
        object.velocity.x = 0;
        object.velocity.y = 0;
      }
    } else if (tileFrom.tx === tileTo.tx + 1) {
      // move left
      if (tileFrom.props.inCollideLeft || tileTo.props.outCollideRight) {
        object.velocity.x = 0;
        object.velocity.y = 0;
      }
    } else if (tileFrom.tx === tileTo.tx - 1) {
      // move right
      if (tileFrom.props.inCollideRight || tileTo.props.outCollideLeft) {
        object.velocity.x = 0;
        object.velocity.y = 0;
      }
    } else if (tileFrom.ty === tileTo.ty + 1) {
      // move up
      if (tileFrom.props.inCollideUp || tileTo.props.outCollideDown) {
        object.velocity.x = 0;
        object.velocity.y = 0;
      }
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

export default Collision;