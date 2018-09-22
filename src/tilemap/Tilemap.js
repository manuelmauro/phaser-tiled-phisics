/**
 * @author
 * @copyright
 * @license
 */

// modifiers
import Collision from '../modifiers/Collision';
import Force from '../modifiers/Force';
import Inertia from '../modifiers/Inertia';

/**
 * @classdesc
 * [description]
 *
 * @class Tilemap
 * @extends
 * @memberOf Physics.Tiled
 * @constructor
 * @since 0.1.0
 *
 * @param {Physics.Tiled.World} world - [description]
 */
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
   * @param
   *
   * @return
   */
  removeModifier(modifier) {
    this.modifiers.remove(modifier);
    return this;
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param body - [description]
   * @param layers - [description]
   */
  addCollision(body, layers) {
    this.modifiers.add(new Collision(body, layers));
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param body - [description]
   * @param layers - [description]
   */
  addForce(body, layers) {
    this.modifiers.add(new Force(body, layers));
    this.modify(body);
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param body - [description]
   * @param layers - [description]
   */
  addInertia(body, layers) {
    this.modifiers.add(new Inertia(body, layers));
    this.modify(body);
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param body - [description]
   */
  modify(body) {
    // compute modifiers
    this.modifiers.update().forEach((modifier) => {
      if (modifier.body === body) modifier.execute();
    });
  }
}

export default Tilemap;
