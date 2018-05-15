/**
 * @author
 * @copyright
 * @license
 */

import Body from './Body';
import Tilemap from './tilemap/Tilemap';
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
    let layer = {};
    let fst = {};
    let props = {};
    let key = -1;

    switch (object.type) {
      case 'Sprite':
        // give a physical body to the sprite
        object.body = new Body(this, object);
        this.bodies.set(object.body);
        break;
      case 'StaticTilemapLayer':
        // layer data
        layer = [];
        for (let x = 0; x < object.layer.width; x += 1) {
          layer[x] = [];
          for (let y = 0; y < object.layer.height; y += 1) {
            layer[x][y] = object.layer.data[y][x].index;
          }
        }
        this.tilemap.layers.set(layer);

        // tiles' properties
        props = Object.keys(object.tileset.tileProperties);
        for (let p in props) {
          fst = object.tileset.firstgid;
          key = Number(props[p]) + Number(fst);
          this.tilemap.tilesets.set(key, object.tileset.tileProperties[props[p]]);
        }
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
    object.enable = false;
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
