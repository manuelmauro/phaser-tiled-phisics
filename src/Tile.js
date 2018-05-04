class Tile {
  constructor(config) {
    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.world = world;

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.id = 0;

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.position = new Vector2(gameObject.x, gameObject.y);

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.collidable = true;

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.inCollision = {
      up: false,
      down: false,
      left: false,
      right: false,
    };

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.outCollision = {
      up: false,
      down: false,
      left: false,
      right: false,
    };

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.friction = 1;
  }
}

export default Tile;
