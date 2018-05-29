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

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.undefinedId = -1;

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.undefinedProps = {};
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param i - [description]
   * @param j - [description]
   */
  tileAt(i, j) {
    if (!this.data[i] || !this.data[i][j]) {
      return this.undefinedId;
    }
    return this.data[i][j];
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param i - [description]
   * @param j - [description]
   */
  propertiesOf(i, j) {
    return this.tileset.get(this.tileAt(i, j)) || this.undefinedProps;
  }
}

export default Layer;
