/**
 * @author
 * @copyright
 * @license
 */

import { adjacent } from '../utils/tile/index';
// modifiers
import Collision from './modifiers/Collision';
import Force from './modifiers/Force';

class Tilemap {
  constructor(world) {
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
    this.layers = new Phaser.Structs.Set();

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.tilesets = new Phaser.Structs.Map();

    /**
     * [description]
     *
     * @name
     * @type
     * @since 0.1.0
     */
    this.modifiers = new Phaser.Structs.Set();
    this.modifiers.set(new Collision(this));
    this.modifiers.set(new Force(this));
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param object - [description]
   * @param tx - [description]
   * @param ty - [description]
   * @param dir - [description]
   *
   */
  transition(object, tx, ty, dir) {
    const tileFrom = { tx, ty };
    tileFrom.id = this.layers.entries[0][ty][tx];
    const tileTo = adjacent(tx, ty, dir);
    tileTo.id = this.layers.entries[0][tileTo.tx][tileTo.ty];
    tileTo.props = this.tilesets.get(tileTo.id) || {};

    this.modifiers.each((modifier) => { modifier.transition(object, tileFrom, tileTo); });
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param object - [description]
   * @param tx - [description]
   * @param ty - [description]
   *
   */
  on(object, tx, ty) {
    const tile = { tx, ty };
    tile.id = this.layers.entries[0][tile.tx][tile.ty];
    tile.props = this.tilesets.get(tile.id);

    this.modifiers.each((modifier) => { modifier.on(object, tile); });
  }
}
export default Tilemap;
