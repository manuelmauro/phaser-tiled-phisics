import 'phaser';

import makeAnimations from '../anims/makeAnimations';

class Game extends Phaser.Scene {
  constructor() {
    super({
      key: 'Game',
    });
  }

  preload() {
    this.load.image('basictiles', 'assets/images/basictiles.png');
    this.load.tilemapTiledJSON('map', 'assets/maps/demo.json');

    this.load.spritesheet(
      'hero',
      'assets/images/hero.png',
      { frameWidth: 16, frameHeight: 16, endFrame: 39 },
    );

    this.load.spritesheet(
      'slime',
      'assets/images/slime.png',
      { frameWidth: 16, frameHeight: 16, endFrame: 15 },
    );

    // first you need to load the plugin
    this.load.plugin('TiledPhysics', 'TiledPhysics.js');
  }

  create() {
    // and then install it
    this.sys.install('TiledPhysics');

    const map = this.make.tilemap({ key: 'map' });
    const tiles = map.addTilesetImage('basictiles', 'basictiles');

    const zero = map.createStaticLayer('zero', tiles, 0, 0);
    const one = map.createStaticLayer('one', tiles, 0, 0);
    makeAnimations(this);

    this.player = this.add.sprite(8, 8);
    this.player.play('hero_face_down');

    this.slime = this.add.sprite(72, 80);
    this.slime.play('slime_walk_down');

    const two = map.createStaticLayer('two', tiles, 0, 0);

    // enable layers
    const layerZero = this.physics.world.enable(zero);
    const layerOne = this.physics.world.enable(one);
    this.physics.world.enable(two);

    // enable bodies
    const player = this.physics.world.enable(this.player);
    this.player.body.setOffset(4, 8);

    const slime = this.physics.world.enable(this.slime);
    this.slime.body.setOffset(4, 8);

    // add modifiers
    this.physics.world.tilemap.addCollision(player, layerZero);
    this.physics.world.tilemap.addCollision(player, layerOne);
    this.physics.world.tilemap.addForce(player, layerZero);
    this.physics.world.tilemap.addForce(player, layerOne);
    this.physics.world.tilemap.addInertia(player, layerOne);

    this.physics.world.tilemap.addCollision(slime, layerZero);
    this.physics.world.tilemap.addCollision(slime, layerOne);
    this.physics.world.tilemap.addForce(slime, layerZero);
    this.physics.world.tilemap.addForce(slime, layerOne);

    this.slime.body.events.on('onTile', this.backAndForth, this);

    // camera
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.keys = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
    };
  }

  update(time, delta) {
    // bodies
    if (this.keys.down.isDown) {
      this.player.body.safeVelocity(0, 50);
    } else if (this.keys.left.isDown) {
      this.player.body.safeVelocity(-50, 0);
    } else if (this.keys.right.isDown) {
      this.player.body.safeVelocity(50, 0);
    } else if (this.keys.up.isDown) {
      this.player.body.safeVelocity(0, -50);
    }

    // animations
    let animDir = '';
    if (this.player.body.velocity.y > 0) {
      animDir = 'down';
    } else if (this.player.body.velocity.x < 0) {
      animDir = 'left';
    } else if (this.player.body.velocity.x > 0) {
      animDir = 'right';
    } else if (this.player.body.velocity.y < 0) {
      animDir = 'up';
    }
    let anim = `hero_walk_${animDir}`;
    if (anim !== this.player.anims.currentAnim.key) {
      this.player.play(anim);
    }

    animDir = '';
    if (this.slime.body.velocity.y > 0) {
      animDir = 'down';
    } else if (this.slime.body.velocity.x < 0) {
      animDir = 'left';
    } else if (this.slime.body.velocity.x > 0) {
      animDir = 'right';
    } else if (this.slime.body.velocity.y < 0) {
      animDir = 'up';
    } else {
      animDir = 'down';
    }
    anim = `slime_walk_${animDir}`;
    if (anim !== this.slime.anims.currentAnim.key) {
      this.slime.play(anim);
    }
  }

  backAndForth() {
    if (this.slime.body.tile.x < 10) {
      this.slime.body.velocity.set(50, 0);
    } else if (this.slime.body.tile.x > 12) {
      this.slime.body.velocity.set(-50, 0);
    }
  }
}

export default Game;
