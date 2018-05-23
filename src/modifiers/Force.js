/**
 * @author
 * @copyright
 * @license
 */

import { C } from '../utils/tile/index';

/**
 * @typedef {object} Tile
 *
 * @property {int} [forceDirection] - [description]
 * @property {float} [forceIntensity] - [description]
 *
 */
class Force {
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

    if (props) {
      switch (props.forceDirection) {
        case C.DOWN:
          this.body.acceleration.y = props.forceIntensity;
          break;
        case C.LEFT:
          this.body.acceleration.x = -props.forceIntensity;
          break;
        case C.RIGHT:
          this.body.acceleration.x = props.forceIntensity;
          break;
        case C.UP:
          this.body.acceleration.y = -props.forceIntensity;
          break;
        default:
      }
    }
  }
}

export default Force;
