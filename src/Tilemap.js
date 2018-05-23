/**
 * @author
 * @copyright
 * @license
 */

import { adjacent } from './utils/tile/index';
// modifiers
import Collision from './modifiers/Collision';
import Force from './modifiers/Force';
import Inertia from './modifiers/Inertia';

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
    this.modifiers = new Phaser.Structs.ProcessQueue();
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param modifier - [description]
   *
   */
  addModifier(modifier) {
    this.modifiers.add(modifier);
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param body - [description]
   * @param layer - [description]
   *
   */
  addCollision(body, layer) {
    this.modifiers.add(new Collision(body, layer));
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param body - [description]
   * @param layer - [description]
   *
   */
  addForce(body, layer) {
    this.modifiers.add(new Force(body, layer));
    this.on(body);
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param body - [description]
   * @param layer - [description]
   *
   */
  addInertia(body, layer) {
    this.modifiers.add(new Inertia(body, layer));
    this.on(body);
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param body - [description]
   * @param tileFrom - [description]
   * @param tileTo - [description]
   *
   */
  transition(body) {
    const tileFrom = { tx: body.tile.x, ty: body.tile.y };
    const tileTo = adjacent(body.tile.x, body.tile.y, body.facing);
    // compute modifiers
    this.modifiers.update().forEach((modifier) => {
      if (modifier.body === body) modifier.transition(tileFrom, tileTo);
    });
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param body - [description]
   * @param tile - [description]
   *
   */
  on(body) {
    const tile = { tx: body.tile.x, ty: body.tile.y };
    // compute modifiers
    this.modifiers.update().forEach((modifier) => {
      if (modifier.body === body) modifier.on(tile);
    });
  }
}
export default Tilemap;
