/**
 * @author
 * @copyright
 * @license
 */

import Layer from './Layer';
import Body from './Body';

/**
 * @classdesc
 * [description]
 *
 * @class Factory
 * @extends
 * @memberOf Physics.Tiled
 * @constructor
 * @since 0.1.0
 *
 * @param {Physics.Tiled.World} world - [description]
 */
class Factory {
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
    this.tilemap = world.tilemap;
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param modifier - [description]
   */
  modifier(modifier) {
    this.tilemap.addModifier(modifier);
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param object1 - [description]
   * @param object2 - [description]
   */
  collider(object1, object2) {
    const object1isArray = Array.isArray(object1);
    const object2isArray = Array.isArray(object2);

    if (!object1isArray && !object2isArray) {
      if (object1 instanceof Body) {
        if (object2 instanceof Layer) {
          this.tilemap.addCollision(object1, object2);
        } else if (object2 instanceof Body) {
          this.world.addCollider(object1, object2);
        }
      }
    } else if (!object1isArray && object2isArray) {
      for (let i = 0; i < object2.length; i++) {
        if (object1 instanceof Body) {
          if (object2[i] instanceof Layer) {
            this.tilemap.addCollision(object1, object2[i]);
          } else if (object2[i] instanceof Body) {
            this.world.addCollider(object1, object2[i]);
          }
        }
      }
    } else if (object1isArray && !object2isArray) {
      for (let i = 0; i < object1.length; i++) {
        if (object2 instanceof Body) {
          if (object1[i] instanceof Layer) {
            this.tilemap.addCollision(object2, object1[i]);
          } else if (object1[i] instanceof Body) {
            this.world.addCollider(object1[i], object2);
          }
        }
      }
    } else {
      for (let i = 0; i < object1.length; i++) {
        for (let j = 0; j < object2.length; j++) {
          if (object1[i] instanceof Body) {
            if (object2[j] instanceof Layer) {
              this.tilemap.addCollision(object1[i], object2[j]);
            } else if (object2[j] instanceof Body) {
              this.world.addCollider(object1[i], object2[j]);
            }
          }
        }
      }
    }
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param object1 - [description]
   * @param object2 - [description]
   */
  force(object1, object2) {
    const object1isArray = Array.isArray(object1);
    const object2isArray = Array.isArray(object2);

    if (!object1isArray && !object2isArray) {
      if (object1 instanceof Body && object2 instanceof Layer) {
        this.tilemap.addForce(object1, [object2]);
        this.tilemap.on(object1);
      }
    } else if (!object1isArray && object2isArray) {
      if (object1 instanceof Body) {
        this.tilemap.addForce(object1, object2);
        this.tilemap.on(object1);
      }
    } else if (object1isArray && !object2isArray) {
      for (let i = 0; i < object1.length; i++) {
        if (object1[i] instanceof Body && object2 instanceof Layer) {
          this.tilemap.addForce(object1[i], [object2]);
          this.tilemap.on(object1[i]);
        }
      }
    } else {
      for (let i = 0; i < object1.length; i++) {
        if (object1[i] instanceof Body) {
          this.tilemap.addForce(object1[i], object2);
          this.tilemap.on(object1[i]);
        }
      }
    }
  }

  /**
   * [description]
   *
   * @method
   * @since 0.1.0
   *
   * @param object1 - [description]
   * @param object2 - [description]
   */
  inertia(object1, object2) {
    const object1isArray = Array.isArray(object1);
    const object2isArray = Array.isArray(object2);

    if (!object1isArray && !object2isArray) {
      if (object1 instanceof Body && object2 instanceof Layer) {
        this.tilemap.addInertia(object1, object2);
        this.tilemap.on(object1);
      }
    } else if (!object1isArray && object2isArray) {
      for (let i = 0; i < object2.length; i++) {
        if (object1 instanceof Body && object2[i] instanceof Layer) {
          this.tilemap.addInertia(object1, object2[i]);
          this.tilemap.on(object1);
        }
      }
    } else if (object1isArray && !object2isArray) {
      for (let i = 0; i < object1.length; i++) {
        if (object1[i] instanceof Body && object2 instanceof Layer) {
          this.tilemap.addInertia(object1[i], object2);
          this.tilemap.on(object1[i]);
        }
      }
    } else {
      for (let i = 0; i < object1.length; i++) {
        for (let j = 0; j < object2.length; j++) {
          if (object1[i] instanceof Body && object2[j] instanceof Layer) {
            this.tilemap.addInertia(object1[i], object2[j]);
            this.tilemap.on(object1[i]);
          }
        }
      }
    }
  }
}

export default Factory;
