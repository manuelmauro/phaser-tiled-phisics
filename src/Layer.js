/**
 * @author
 * @copyright
 * @license
 */

class Layer {
  constructor(tilemap) {
    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.tilemap = tilemap;

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.data = [];

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.tileset = new Phaser.Structs.Map();
  }
}

export default Layer;
