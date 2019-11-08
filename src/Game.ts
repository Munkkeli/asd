import * as PIXI from 'pixi.js';

import { Init } from './lib/Resource';

import * as Input from './Input';
import { Character } from './Character';
import { resources } from './lib/Resource';
import { viewport } from './Viewport';



// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application();

const resize = () => {
  app.renderer.resize(window.innerWidth, window.innerHeight);
};

window.addEventListener('resize', resize);

resize();

(async () => {
  await Init(app);



  app.stage.addChild(viewport)

  viewport
    .drag()
    .pinch()
    .wheel()
    .decelerate()

  const background = new PIXI.Sprite(resources.debugMap().texture);
  viewport.addChild(background);
  // Setup character
  Character(app);
})();

// load the texture we need
/*
app.loader.add('bunny', 'test.png').load((loader, resources) => {
  // This creates a texture from a 'bunny.png' image
  const bunny = new PIXI.Sprite(resources.bunny!.texture);

  bunny.width = 100;
  bunny.height = 100;

  // Setup the position of the bunny
  bunny.x = app.renderer.width / 2;
  bunny.y = app.renderer.height / 2;

  // Rotate around the center
  bunny.anchor.x = 0.5;
  bunny.anchor.y = 0.5;

  // Add the bunny to the scene we are building
  app.stage.addChild(bunny);

  // Listen for frame updates
  app.ticker.add(() => {
    // each frame we spin the bunny around a bit

    if (Input.getInputDown('w')) {
      bunny.position.x += 10;
      bunny.rotation += 0.01;
    }
  });
});
*/

export default app;
