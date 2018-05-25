/**
 * @author
 * @copyright
 * @license
 */

import Body from './Body';
import Tilemap from './Tilemap';
import Layer from './Layer';
import NonElastic from './colliders/NonElastic';

import CONST from './const';
import { adjacent } from './utils/tile/index';

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
   * @method
   * @since 0.1.0
   *
   * @param
   * @param
   */
  update(time, delta) {
    if (this.bodies.size === 0) { return; }

    this.bodies.each((body) => {
      if (!body.enable) { return; }
      this.tilemap.transition(body);
      this.transition(body);
      body.update(delta);
      if (body.onTile) this.tilemap.on(body);
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

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param collider - [description]
   */
  addCollider(collider) {
    this.colliders.add(collider);
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
   * @param body - [description]
   * @param layer - [description]
   */
  addNonElastic(body1, body2) {
    this.colliders.add(new NonElastic(body1, body2));
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param body - [description]
   */
  transition(body) {
    const tileFrom = { tx: body.tile.x, ty: body.tile.y };
    const tileTo = adjacent(body.tile.x, body.tile.y, body.facing);
    // compute colliders
    this.colliders.update().forEach((collider) => {
      if (collider.body1 === body) collider.transition(tileFrom, tileTo);
    });
  }
}
