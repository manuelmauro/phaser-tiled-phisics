/**
 * @author
 * @copyright
 * @license
 */

import { adjacent } from './utils/tile/index';
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
   * @param modifier - [description]
   *
   */
  addSimpleCollision(body, layer) {
    this.modifiers.add(new SimpleCollision(body, layer));
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
  addCollision(body, layer) {
    this.modifiers.add(new Collision(body, layer));
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
  addForce(body, layer) {
    this.modifiers.add(new Force(body, layer));
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
    const tileTo = adjacent(tx, ty, dir);

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
   * @param tx - [description]
   * @param ty - [description]
   *
   */
  on(object, tx, ty) {
    const tile = { tx, ty };

    // compute modifiers
    this.modifiers.update().forEach((modifier) => {
      if (modifier.body === object) modifier.on(tile);
    });
  }
}
export default Tilemap;
