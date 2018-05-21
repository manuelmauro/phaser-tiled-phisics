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

    const two = map.createStaticLayer('two', tiles, 0, 0);

    // enable layers
    const layerZero = this.physics.world.enable(zero);
    const layerOne = this.physics.world.enable(one);
    this.physics.world.enable(two);

    // enable bodies
    const player = this.physics.world.enable(this.player);
    this.player.body.setOffset(4, 8);

    // add modifiers
    this.physics.world.tilemap.addCollision(player, layerZero);
    this.physics.world.tilemap.addCollision(player, layerOne);
    this.physics.world.tilemap.addForce(player, layerZero);
    this.physics.world.tilemap.addForce(player, layerOne);

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
    if (this.keys.down.isDown) {
      this.player.body.setVelocityY(50);
    } else if (this.keys.left.isDown) {
      this.player.body.setVelocityX(-50);
    } else if (this.keys.right.isDown) {
      this.player.body.setVelocityX(50);
    } else if (this.keys.up.isDown) {
      this.player.body.setVelocityY(-50);
    }

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
    const anim = `hero_walk_${animDir}`;
    if (anim !== this.player.anims.currentAnim.key) {
      this.player.play(anim);
    }
  }
}

export default Game;
