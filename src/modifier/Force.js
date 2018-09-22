/**
 * @author
 * @copyright
 * @license
 */

import { C } from '../utils/tile/index';

/**
 * @typedef {object} Tile
 *
 * @property {float} [forceX] - [description]
 * @property {float} [forceY] - [description]
 */

/**
 * @classdesc
 * [description]
 *
 * @class Force
 * @extends
 * @memberOf Physics.Tiled.Modifiers
 * @constructor
 * @since 0.1.0
 *
 * @param {Physics.Tiled.Body} body - [description]
 * @param {Phaser.Tiled.Layer} layers - [description]
 */
class Force {
  constructor(body, layers) {
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
    this.layers = layers;
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   */
  execute() {
    if (this.body.isOnTile) {
      const tile = { tx: this.body.tile.x, ty: this.body.tile.y };
      let forceX = 0;
      let forceY = 0;

      this.layers.forEach((layer) => {
        const props = layer.propertiesOf(tile.tx, tile.ty);
        if (props) {
          forceX += (props.forceX) ? props.forceX : 0;
          forceY += (props.forceY) ? props.forceY : 0;
        }
      });

      this.body.acceleration.x = forceX;
      this.body.acceleration.y = forceY;
    }
  }
}

export default Force;
