/**
 * @author
 * @copyright
 * @license
 */

class Force {
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
    if (tile.props && tile.props.force) {
      object.velocity.x = 200;
      object.velocity.y = 0;
    }
  }
}

export default Force;
