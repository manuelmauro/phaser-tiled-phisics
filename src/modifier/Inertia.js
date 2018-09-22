/**
 * @author
 * @copyright
 * @license
 */

/**
 * @typedef {object} Tile
 *
 * @property {float} [inertia] - [description]
 */

/**
 * @classdesc
 * [description]
 *
 * @class Inertia
 * @extends
 * @memberOf Physics.Tiled.Modifiers
 * @constructor
 * @since 0.1.0
 *
 * @param {Physics.Tiled.Body} body - [description]
 * @param {Phaser.Tiled.Layer} layers - [description]
 */
class Inertia {
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
      for (let i = 0; i < this.layers.length; i++) {
        const tile = { tx: this.body.tile.x, ty: this.body.tile.y };
        const props = this.layers[i].propertiesOf(tile.tx, tile.ty);

        if (!props.inertia) { props.inertia = 0; }
        this.body.velocity.x = props.inertia * this.body.velocity.x;
        this.body.velocity.y = props.inertia * this.body.velocity.y;
        this.body.acceleration.x = props.inertia * this.body.acceleration.x;
        this.body.acceleration.y = props.inertia * this.body.acceleration.y;

        this.body.sliding = props.friction > 0;
      }
    }
  }
}

export default Inertia;
