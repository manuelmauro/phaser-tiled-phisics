/**
 * @author
 * @copyright
 * @license
 */

import Body from './Body';

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
    this.bodies = new Set();

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.pendingDestroy = new Set();

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.colliders = new ProcessQueue();

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.checkCollision = {
      up: GetValue(config, 'checkCollision.up', true),
      down: GetValue(config, 'checkCollision.down', true),
      left: GetValue(config, 'checkCollision.left', true),
      right: GetValue(config, 'checkCollision.right', true),
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

  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   */
  postUpdate() {

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
