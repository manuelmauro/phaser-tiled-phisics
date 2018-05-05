import 'phaser';

import makeAnimations from '../anims/makeAnimations';

class Game extends Phaser.Scene {
  constructor() {
    super({
      key: 'Game',
    });
  }

  preload() {
    this.load.spritesheet(
      'hero',
      'assets/images/hero.png',
      { frameWidth: 16, frameHeight: 16, endFrame: 39 },
    );
    this.load.plugin('TiledPhysics', 'TiledPhysics.js');
  }

  create() {
    this.sys.install('TiledPhysics');

    makeAnimations(this);

    this.player = this.add.sprite(48, 48);
    this.player.play('hero_face_down');

    this.physics.world.enable(this.player);
    this.player.body.setVelocityX(1);

    this.keys = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
    };
  }

  update(time, delta) {
    let animDir = '';
    if (this.keys.down.isDown) {
      animDir = 'down';
      this.player.body.setVelocityY(50);
    } else if (this.keys.left.isDown) {
      animDir = 'left';
      this.player.body.setVelocityX(-50);
    } else if (this.keys.right.isDown) {
      animDir = 'right';
      this.player.body.setVelocityX(50);
    } else if (this.keys.up.isDown) {
      animDir = 'up';
      this.player.body.setVelocityY(-50);
    }
    const anim = `hero_walk_${animDir}`;
    if (anim !== this.player.anims.currentAnim.key) {
      this.player.play(anim);
    }
  }
}

export default Game;
