/**
 * @author
 * @copyright
 * @license
 */

import { adjacent } from './utils/tile/index';
// modifiers
import Collision from './modifiers/Collision';
import Force from './modifiers/Force';
import Friction from './modifiers/Friction';

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
    this.on(body, { tx: body.tile.x, ty: body.tile.y });
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
  addFriction(body, layer) {
    this.modifiers.add(new Friction(body, layer));
    this.on(body, { tx: body.tile.x, ty: body.tile.y });
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param object - [description]
   * @param tileFrom - [description]
   * @param tileTo - [description]
   *
   */
  transition(object, tileFrom, tileTo) {
    // compute modifiers
    this.modifiers.update().forEach((modifier) => {
      if (modifier.body === object) modifier.transition(tileFrom, tileTo);
    });
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param object - [description]
   * @param tile - [description]
   *
   */
  on(object, tile) {
    // compute modifiers
    this.modifiers.update().forEach((modifier) => {
      if (modifier.body === object) modifier.on(tile);
    });
  }
}
export default Tilemap;
