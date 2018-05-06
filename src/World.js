/**
 * @author
 * @copyright
 * @license
 */

import Body from './Body';
import Tilemap from './Tilemap';
import CONST from './const';

export default class World {
  constructor(scene, config) {
    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.scene = scene;

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.bodies = new Phaser.Structs.Set();

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.tilemap = new Tilemap(this);

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.tilesize = new Phaser.Math.Vector2(CONST.TILE_WIDTH, CONST.TILE_HEIGHT);

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.pendingDestroy = new Phaser.Structs.Set();

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.colliders = new Phaser.Structs.ProcessQueue();

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.checkCollision = {
      up: true,
      down: true,
      left: true,
      right: true,
    };
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param {Phaser.GameObjects.GameObject} object - [description]
   *
   */
  enable(object) {
    switch (object.type) {
      case 'Sprite':
        object.body = new Body(this, object);
        this.bodies.set(object.body);
        break;
      case 'StaticTilemapLayer':
        this.tilemap.layers.set(object.layer.data);
        this.tilemap.tilesets.set(object.tileset.tileProperties);
        break;
      default:
    }
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param {Phaser.GameObjects.GameObject} object - [description]
   *
   */
  disable(object) {

  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param
   * @param
   * @param
   * @param
   * @param
   * @param
   * @param
   * @param
   *
   * @return
   *
   */
  setBounds(x, y, width, height, checkLeft, checkRight, checkUp, checkDown) {
    this.bounds.setTo(x, y, width, height);

    if (checkLeft !== undefined) {
      this.setBoundsCollision(checkLeft, checkRight, checkUp, checkDown);
    }

    return this;
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param
   * @param
   * @param
   * @param
   *
   * @return
   *
   */
  setBoundsCollision(left, right, up, down) {
    if (left === undefined) { left = true; }
    if (right === undefined) { right = true; }
    if (up === undefined) { up = true; }
    if (down === undefined) { down = true; }

    this.checkCollision.left = left;
    this.checkCollision.right = right;
    this.checkCollision.up = up;
    this.checkCollision.down = down;

    return this;
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param
   * @param
   * @param
   * @param
   * @param
   *
   */
  addCollider(object1, object2, collideCallback, processCallback, callbackContext) {

  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param
   *
   * @return
   *
   */
  removeCollider(collider) {
    this.colliders.remove(collider);

    return this;
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param
   * @param
   *
   */
  update(time, delta) {
    this.bodies.each((body) => { if (body.enable) body.update(delta); });
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   */
  postUpdate() {
    this.bodies.each((body) => { if (body.enable) body.postUpdate(); });
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param
   * @param
   * @param
   * @param
   *
   */
  collideHandler(object1, object2, collideCallback, callbackContext) {

  }
}
