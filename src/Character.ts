import * as PIXI from 'pixi.js';
import * as Input from './Input';
import * as Math from './Math';
import { resources } from './lib/Resource';

const Character = async (app: PIXI.Application) => {
  // await Load(app);

  const characterSize = 0.5;

  // This creates a texture from a 'bunny.png' image
  const bunny = new PIXI.Sprite(resources.playerDown().texture);

  bunny.scale.set(characterSize, characterSize);

  console.log(bunny.width, bunny.height);

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
    //console.log(Input.getMousePosition(app.renderer));

    if (Input.getInputDown('w')) {
      bunny.y -= 5;
    }
    if (Input.getInputDown('s')) {
      bunny.y += 5;
    }
    if (Input.getInputDown('a')) {
      bunny.x -= 5;
    }
    if (Input.getInputDown('d')) {
      bunny.x += 5;
    }

    let angle = Math.getAngle(
      [bunny.x, bunny.y],
      Input.getMousePosition(app.renderer)
    );

    let dir = 0;

    let sec = 360 / 12;
    for (let a = 0; a < sec; a++) {
      let value = a * (360 / 12);
      if (angle > value && angle < (a + 1) * (360 / 12)) {
        dir = a;
      }
    }

    if (dir === 0) {
      bunny.scale.x = -characterSize;
      bunny.texture = resources.playerRight().texture;
    } else if (dir === 1) {
      bunny.scale.x = -characterSize;
      bunny.texture = resources.playerRightDown().texture;
    } else if (dir === 2) {
      bunny.scale.x = -characterSize;
      bunny.texture = resources.playerDownLeft().texture;
    } else if (dir === 3) {
      bunny.texture = resources.playerDown().texture;
      bunny.scale.x = -characterSize;
    } else if (dir === 4) {
      bunny.texture = resources.playerDownLeft().texture;
      bunny.scale.x = characterSize;
    } else if (dir === 5) {
      bunny.texture = resources.playerRightDown().texture;
      bunny.scale.x = characterSize;
    } else if (dir === 6) {
      bunny.texture = resources.playerRight().texture;
      bunny.scale.x = characterSize;
    } else if (dir === 7) {
      bunny.texture = resources.playerRightUp().texture;
      bunny.scale.x = characterSize;
    } else if (dir === 8) {
      bunny.texture = resources.playerUpLeft().texture;
      bunny.scale.x = characterSize;
    } else if (dir === 9) {
      bunny.texture = resources.playerUp().texture;
      bunny.scale.x = characterSize;
    } else if (dir === 10) {
      bunny.texture = resources.playerUpLeft().texture;
      bunny.scale.x = -characterSize;
    } else if (dir === 11) {
      bunny.texture = resources.playerRightUp().texture;
      bunny.scale.x = -characterSize;
    }
  });
};

export { Character };
