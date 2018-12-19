**Mirror for:** https://gitlab.com/gedl/phaser-tiled-physics.

# Tiled Physics for Phaser
A simple physics for a tiled world. Bodies move discreetely from tile to tile,
collide with other bodies, and are subject to tile modifiers like: collision,
force, inertia, and many more to come. 
You can try a demo [here](https://gedl.gitlab.io/phaser-tiled-physics/)!

**Warning:** the project is under development, many features or interfaces may 
change before v1.0.0 is released.

## Installation
In order to use the plugin, add the file `/dist/TiledPhysics.js` or its minified
version to your assets (for instance inside `assets/plugins/` folder).

Add the following lines to your Phaser config object:

```js
const config = {
  ...
  physics: {
    tiled: {
      tileHeight: 8,
      tileWidth: 8,
      debug: false,
    }
  },
};
```

Finally you can install it to a specific scene adding to the ```preload()```
function the following lines:
```js
this.load.scenePlugin({
  key: 'TiledPhysics',
  url: 'assets/plugins/TiledPhysics.js',
});
```

## Thanks to
- The Phaser team @photonstorm, @mikewesthad and @pavle-goloskokovic for building 
  Phaser 3, this project is deeply based on their Arcade physics
- @nkholski for https://github.com/nkholski/phaser3-es6-webpack and his inspiring 
  project https://github.com/nkholski/phaser-grid-physics
