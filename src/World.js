/**
 * @author
 * @copyright
 * @license
 */

import Body from './Body';
import Tilemap from './Tilemap';
import Layer from './Layer';
import Collider from './Collider';

import CONST from './const';
import { adjacent } from './utils/tile/index';

/**
 * @classdesc
 * [description]
 *
 * @class World
 * @extends
 * @memberOf Physics.Tiled
 * @constructor
 * @since 0.1.0
 *
 * @param {Phaser.Scene} scene - [description]
 * @param {WorldConfig} config - [description]
 */
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
     * @name Phaser.Physics.Arcade.World#isPaused
     * @type {boolean}
     * @default false
     * @since 0.1.0
     */
    this.isPaused = false;
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param {Phaser.GameObjects.GameObject} object - [description]
   */
  enable(object) {
    const layer = new Layer(this.tilemap);
    let fst = {};
    let props = {};
    let key = -1;

    switch (object.type) {
      case 'Sprite':
        // give a physical body to the sprite
        object.body = new Body(this, object);
        this.bodies.set(object.body);
        return object.body;
      case 'StaticTilemapLayer':
        // layer data
        layer.data = [];
        for (let x = 0; x < object.layer.width; x += 1) {
          layer.data[x] = [];
          for (let y = 0; y < object.layer.height; y += 1) {
            layer.data[x][y] = object.layer.data[y][x].index;
          }
        }
        // tiles' properties
        props = Object.keys(object.tileset.tileProperties);
        for (let p in props) {
          fst = object.tileset.firstgid;
          key = Number(props[p]) + Number(fst);
          layer.tileset.set(key, object.tileset.tileProperties[props[p]]);
        }
        this.tilemap.layers.set(layer);
        return layer;
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
   */
  disable(object) {
    object.enable = false;
  }

  /**
   * [description]
   *
   * @method Physics.Tiled.World#pause
   * @since 0.1.0
   *
   * @return {Physics.Tiled.World} This World object.
   */
  pause() {
    this.isPaused = true;
    return this;
  }

  /**
   * [description]
   *
   * @method Physics.Tiled.World#resume
   * @since 0.1.0
   *
   * @return {Physics.Tiled.World} This World object.
   */
  resume() {
    this.isPaused = false;
    return this;
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param collider - [description]
   *
   * @return
   */
  addCollider(body1, body2) {
    const collider = new Collider(this, body1, body2);
    this.colliders.add(collider);
    return collider;
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
   */
  update(time, delta) {
    if (this.isPaused || this.bodies.size === 0) {
      return;
    }

    this.delta = delta / 1000;

    this.bodies.each((body) => {
      if (!body.enable) { return; }
      this.tilemap.modify(body);
      body.update(this.delta);
    });

    this.colliders.update().forEach((collider) => {
      if (collider.active) collider.update();
    });
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   */
  postUpdate() {
    this.bodies.each((body) => { if (body.enable) body.postUpdate(); });
  }
}
