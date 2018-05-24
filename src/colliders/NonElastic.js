/**
 * @author
 * @copyright
 * @license
 */

class NonElastic {
  constructor(body1, body2) {
    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.body1 = body1;

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.body2 = body2;
  }

  transition(tileFrom, tileTo) {
    if (this.body2.tile.x === tileTo.tx && this.body2.tile.y === tileTo.ty) {
      if (tileFrom.ty === tileTo.ty - 1) {
      // move down
        if (this.body1.velocity.y > 0) { this.body1.velocity.y = 0; }
        if (this.body1.acceleration.y > 0) { this.body1.acceleration.y = 0; }
        this.body1.lineUp();
      } else if (tileFrom.ty === tileTo.ty + 1) {
      // move up
        if (this.body1.velocity.y < 0) { this.body1.velocity.y = 0; }
        if (this.body1.acceleration.y < 0) { this.body1.acceleration.y = 0; }
        this.body1.lineUp();
      }

      if (tileFrom.tx === tileTo.tx + 1) {
      // move left
        if (this.body1.velocity.x < 0) { this.body1.velocity.x = 0; }
        if (this.body1.acceleration.x < 0) { this.body1.acceleration.x = 0; }
        this.body1.lineUp();
      } else if (tileFrom.tx === tileTo.tx - 1) {
      // move right
        if (this.body1.velocity.x > 0) { this.body1.velocity.x = 0; }
        if (this.body1.acceleration.x > 0) { this.body1.acceleration.x = 0; }
        this.body1.lineUp();
      }
    }
  }
}

export default NonElastic;
