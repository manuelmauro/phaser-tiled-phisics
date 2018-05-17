/**
 * @author
 * @copyright
 * @license
 */

/**
 * @typedef {object} Tile
 *
 * @property {int} [forceDirection] - [description]
 * @property {float} [forceIntensity] - [description]
 *
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
    if (tile.props) {
      switch (tile.props.forceDirection) {
        case 0:
          object.acceleration.y = tile.props.forceIntensity;
          break;
        case 1:
          object.acceleration.x = -tile.props.forceIntensity;
          break;
        case 2:
          object.acceleration.x = tile.props.forceIntensity;
          break;
        case 3:
          object.acceleration.y = -tile.props.forceIntensity;
          break;
        default:
      }
    }
  }
}

export default Force;
