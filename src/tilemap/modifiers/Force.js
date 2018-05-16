/**
 * @author
 * @copyright
 * @license
 */

/**
 * @typedef {object} Tile
 *
 * @property {boolean} [forceDirection] - [description]
 * @property {boolean} [forceIntensity] - [description]
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
          object.setVelocityY(tile.props.forceIntensity);
          break;
        case 1:
          object.setVelocityX(-tile.props.forceIntensity);
          break;
        case 2:
          object.setVelocityX(tile.props.forceIntensity);
          break;
        case 3:
          object.setVelocityY(-tile.props.forceIntensity);
          break;
        default:
      }
    }
  }
}

export default Force;