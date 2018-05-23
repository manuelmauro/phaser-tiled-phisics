/**
 * @author
 * @copyright
 * @license
 */

import World from './World';
import Factory from './Factory';

class TiledPhysics {
  constructor(scene) {
    /**
     * [description]
     *
     * @name Physics.Tiled.TiledPhysics#
     * @type
     * @since 0.1.0
     */
    Phaser.Physics.TiledPhysics = this;

    /**
     * [description]
     *
     * @name Physics.Tiled.TiledPhysics#scene
     * @type {Phaser.Scene}
     * @since 0.1.0
     */
    this.scene = scene;
    scene.physics = this;

    /**
     * [description]
     *
     * @name Physics.Tiled.TiledPhysics#world
     * @type
     * @since 0.1.0
     */
    this.world = undefined;

    /**
     * [description]
     *
     * @name .Physics.Tiled.TiledPhysics#world
     * @type
     * @since 0.1.0
     */
    this.add = undefined;

    /**
     * [description]
     *
     * @name Physics.Tiled.TiledPhysics#systems
     * @type
     * @since 0.1.0
     */
    this.systems = scene.sys;

    scene.sys.events.once('boot', this.boot, this);
  }

  /**
   * This method is called automatically, only once, when the Scene is first created.
   * Do not invoke it directly.
   *
   * @method Phaser.Physics.Tiled.TiledPhysics#boot
   * @private
   * @since 0.1.0
   */
  boot() {
    if (!this.world) {
      this.world = new World(this.scene, this.config);
      this.add = new Factory(this.world);
    }

    const eventEmitter = this.systems.events;

    eventEmitter.on('update', this.world.update, this.world);
    eventEmitter.on('postupdate', this.world.postUpdate, this.world);
    eventEmitter.once('shutdown', this.shutdown, this);
    eventEmitter.once('destroy', this.destroy, this);
  }

  /**
   *
   * @method Phaser.Physics.Tiled.TiledPhysics#shutdown
   * @private
   * @since 0.1.0
   */
  shutdown() {

  }

  /**
   *
   * @method Phaser.Physics.Tiled.TiledPhysics#destroy
   * @private
   * @since 0.1.0
   */
  destroy() {
    this.shutdown();
    this.scene.sys.events.off('start', this.start, this);
    this.scene = undefined;
  }
}

/**
 * Static function called by the PluginFile Loader.
 *
 * @method
 * @private
 * @since 0.1.0
 */
TiledPhysics.register = function (PluginManager) {
  PluginManager.register('TiledPhysics', TiledPhysics, 'TiledPhysics');
};

module.exports = TiledPhysics;
