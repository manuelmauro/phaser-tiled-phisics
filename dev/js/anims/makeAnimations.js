export default function makeAnimations(scene) {
  /**
   * hero - face a direction
   */
  scene.anims.create({
    key: 'hero_face_down',
    frames: scene.anims.generateFrameNumbers('hero', { start: 1, end: 1, first: 1 }),
    frameRate: 10,
    repeat: 0,
  });

  scene.anims.create({
    key: 'hero_face_left',
    frames: scene.anims.generateFrameNumbers('hero', { start: 4, end: 4, first: 4 }),
    frameRate: 10,
    repeat: 0,
  });

  scene.anims.create({
    key: 'hero_face_right',
    frames: scene.anims.generateFrameNumbers('hero', { start: 7, end: 7, first: 7 }),
    frameRate: 10,
    repeat: 0,
  });

  scene.anims.create({
    key: 'hero_face_up',
    frames: scene.anims.generateFrameNumbers('hero', { start: 10, end: 10, first: 10 }),
    frameRate: 10,
    repeat: 0,
  });

  /**
   * hero - movement
   */
  scene.anims.create({
    key: 'hero_walk_down',
    frames: scene.anims.generateFrameNumbers('hero', { start: 0, end: 2, first: 0 }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'hero_walk_left',
    frames: scene.anims.generateFrameNumbers('hero', { start: 3, end: 5, first: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'hero_walk_right',
    frames: scene.anims.generateFrameNumbers('hero', { start: 6, end: 8, first: 6 }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'hero_walk_up',
    frames: scene.anims.generateFrameNumbers('hero', { start: 9, end: 11, first: 9 }),
    frameRate: 10,
    repeat: -1,
  });

  /**
   * hero - hitting with a sword
   */
  scene.anims.create({
    key: 'hero_hit_down',
    frames: scene.anims.generateFrameNumbers('hero', { start: 12, end: 14, first: 12 }),
    frameRate: 60,
    repeat: 0,
  });

  scene.anims.create({
    key: 'hero_hit_left',
    frames: scene.anims.generateFrameNumbers('hero', { start: 15, end: 17, first: 15 }),
    frameRate: 60,
    repeat: 0,
  });

  scene.anims.create({
    key: 'hero_hit_right',
    frames: scene.anims.generateFrameNumbers('hero', { start: 18, end: 20, first: 18 }),
    frameRate: 60,
    repeat: 0,
  });

  scene.anims.create({
    key: 'hero_hit_up',
    frames: scene.anims.generateFrameNumbers('hero', { start: 21, end: 23, first: 21 }),
    frameRate: 60,
    repeat: 0,
  });

  /**
   * hero - casting a spell
   */
  scene.anims.create({
    key: 'hero_cast',
    frames: scene.anims.generateFrameNumbers('hero', { start: 24, end: 26, first: 24 }),
    frameRate: 10,
    repeat: -1,
  });

  /**
   * hero - dead
   */
  scene.anims.create({
    key: 'hero_dead',
    frames: scene.anims.generateFrameNumbers('hero', { start: 36, end: 36, first: 37 }),
    frameRate: 3,
    repeat: 0,
  });

  /**
   * slime - movement
   */
  scene.anims.create({
    key: 'slime_walk_down',
    frames: scene.anims.generateFrameNumbers('slime', { start: 0, end: 2, first: 0 }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'slime_walk_left',
    frames: scene.anims.generateFrameNumbers('slime', { start: 3, end: 5, first: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'slime_walk_right',
    frames: scene.anims.generateFrameNumbers('slime', { start: 6, end: 8, first: 6 }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'slime_walk_up',
    frames: scene.anims.generateFrameNumbers('slime', { start: 9, end: 11, first: 9 }),
    frameRate: 10,
    repeat: -1,
  });
}
