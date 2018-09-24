# Tiled Physics for Phaser
A simple physics for a tiled world. Bodies move discreetely from tile to tile, 
collide with other bodies, and are subject to tile modifiers like: collision,
force, inertia, and many more to come.

# Setup
You’ll need to install a few things before you have a working copy of the project.

## 1. Clone this repo:

Navigate into your workspace directory.

Run:

```git clone git@gitlab.com:gedl/phaser-tiled-physics.git```

## 2. Install node.js and npm:

https://nodejs.org/en/


## 3. Install dependencies (optionally you could install [yarn](https://yarnpkg.com/)):

Navigate to the cloned repo’s directory.

Run:

```npm install```

or if you choose yarn, just run ```yarn```

## 4. Run the development server:

Run:

```npm run dev```

This will run a server so you can run the demo game in a browser.

Open your browser and enter localhost:3000 into the address bar.

Also this will start a watch process, so you can change the source and the process will recompile and refresh the browser


## Build for deployment:

Run:

```npm run build```

This will build the plugin.

# Thanks to
- The Phaser team @photonstorm, @mikewesthad and @pavle-goloskokovic for building Phaser 3
- @nkholski https://github.com/nkholski/phaser3-es6-webpack
