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
 * @property {boolean} [collide] - [description]
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
   */
  transition(tileFrom, tileTo) {
    const tileFromProps = this.layer.propertiesOf(tileFrom.tx, tileFrom.ty);
    const tileToProps = this.layer.propertiesOf(tileTo.tx, tileTo.ty);

    if (tileFrom.ty === tileTo.ty - 1) {
      // move down
      if (tileFromProps.inCollideDown || tileToProps.outCollideUp || tileToProps.collide) {
        if (this.body.velocity.y > 0) { this.body.velocity.y = 0; }
        if (this.body.acceleration.y > 0) { this.body.acceleration.y = 0; }
        this.body.lineUp();
      }
    } else if (tileFrom.ty === tileTo.ty + 1) {
      // move up
      if (tileFromProps.inCollideUp || tileToProps.outCollideDown || tileToProps.collide) {
        if (this.body.velocity.y < 0) { this.body.velocity.y = 0; }
        if (this.body.acceleration.y < 0) { this.body.acceleration.y = 0; }
        this.body.lineUp();
      }
    }

    if (tileFrom.tx === tileTo.tx + 1) {
      // move left
      if (tileFromProps.inCollideLeft || tileToProps.outCollideRight || tileToProps.collide) {
        if (this.body.velocity.x < 0) { this.body.velocity.x = 0; }
        if (this.body.acceleration.x < 0) { this.body.acceleration.x = 0; }
        this.body.lineUp();
      }
    } else if (tileFrom.tx === tileTo.tx - 1) {
      // move right
      if (tileFromProps.inCollideRight || tileToProps.outCollideLeft || tileToProps.collide) {
        if (this.body.velocity.x > 0) { this.body.velocity.x = 0; }
        if (this.body.acceleration.x > 0) { this.body.acceleration.x = 0; }
        this.body.lineUp();
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
   */
  on(tile) {
  }
}

export default Collision;
