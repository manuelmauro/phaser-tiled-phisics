import 'phaser';
import Game from './scenes/Game';

const config = {
  type: Phaser.WEBGL,
  parent: 'content',
  width: 320,
  height: 240,
  scaleMode: 0, // Phaser.ScaleManager.EXACT_FIT,
  pixelArt: true,
  zoom: 4,
  antialias: false,
  physics: {
    tiled: {
      tileHeight: 8,
      tileWidth: 8,
      debug: true,
    }
  },
  scene: [
    Game,
  ],
};

const game = new Phaser.Game(config);
