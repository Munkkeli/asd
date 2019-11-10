import * as PIXI from 'pixi.js';
import * as Input from './Input';
import * as Mathf from './Math';
import Vector from 'victor';
import { resources } from './lib/Resource';
import { viewport } from './Viewport';
// @ts-ignore
import Bump from 'bump.js';
import { environmentColliders } from './Block';
const b = new Bump(PIXI);

let cooldown = 0;

let delta = 0;
const characterSize = 0.5;

let cameraFollowPlayer = true;

let bulletList: PIXI.Sprite[] = [];

function rotate(cx: number, cy: number, x: number, y: number, angle: number) {
  var radians = (Math.PI / 180) * angle;
  const cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = cos * (x - cx) + sin * (y - cy) + cx,
    ny = cos * (y - cy) - sin * (x - cx) + cy;
  return [nx, ny];
}

const Character = async (app: PIXI.Application) => {
  // await Load(app);

  const pallo = new PIXI.Sprite(resources.pallo().texture);
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
  viewport.addChild(bunny);
  viewport.addChild(pallo);

  // Listen for frame updates
  let lastTime = Date.now();
  app.ticker.add(() => {
    if (cameraFollowPlayer) {
      viewport.left = bunny.x - viewport.screenWidth / 2 / viewport.scale.x;
      viewport.top = bunny.y - viewport.screenHeight / 2 / viewport.scale.y;
    }

    const now = Date.now();
    delta = (now - lastTime) / 1000;
    lastTime = now;

    //console.log(Input.getMousePosition(app.renderer));

    const viewportVector = [viewport.left, viewport.top];

    const lastX = bunny.x;
    const lastY = bunny.y;

    if (Input.getKeyDown('w')) {
      bunny.y -= 5;
    }
    if (Input.getKeyDown('s')) {
      bunny.y += 5;
    }

    environmentColliders.forEach(worldCollider => {
      if (b.hitTestRectangle(bunny, worldCollider)) {
        bunny.y = lastY;
      }
    });

    if (Input.getKeyDown('a')) {
      bunny.x -= 5;
    }
    if (Input.getKeyDown('d')) {
      bunny.x += 5;
    }

    environmentColliders.forEach(worldCollider => {
      if (b.hitTestRectangle(bunny, worldCollider)) {
        bunny.x = lastX;
      }
    });

    const mousePosition = Input.getMousePosition(app.renderer);

    mousePosition[0] /= viewport.scale.x;
    mousePosition[1] /= viewport.scale.y;

    mousePosition[0] += viewportVector[0];
    mousePosition[1] += viewportVector[1];

    pallo.x = mousePosition[0];
    pallo.y = mousePosition[1];

    let angle = Mathf.getAngle([bunny.x, bunny.y], mousePosition);

    let dir = 0;

    let sec = 360 / 12;
    let ta = (angle + 22.5 / 2) % 360;
    for (let a = 0; a < sec; a++) {
      let value = a * sec;
      if (ta > value && ta < (a + 1) * sec) {
        dir = a;
      }
    }

    //pallo.x = nx;
    //pallo.y = ny;

    if (Input.getMouseDown('Mouse1') && cooldown == 0) {
      cooldown = 0.05;

      const bullet = new PIXI.Sprite(resources.bullet().texture);

      let position = new Vector(40, 0)
        // TODO: Fix bullet sprite position
        // .add(new Vector(bullet.width / 2, bullet.height / 2))
        .rotate(angle / (180 / Math.PI))
        .add(new Vector(bunny.x, bunny.y - 60));

      const angleCorrection = Mathf.getAngle(position.toArray(), mousePosition);

      pallo.x = position.x;
      pallo.y = position.y;

      bullet.x = position.x;
      bullet.y = position.y;

      bullet.scale.set(3, 3);
      bullet.angle = angleCorrection;
      bulletList.push(bullet);
      viewport.addChild(bullet);
    }

    if (cooldown > 0) {
      cooldown = Math.max(0, cooldown - delta);
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

    for (let bullet of bulletList) {
      const [nx, ny] = rotate(
        bullet.x,
        bullet.y,
        bullet.x + 1000 * delta,
        bullet.y,
        bullet.angle
      );

      const x = nx - bullet.x;
      const y = ny - bullet.y;

      bullet.x += x;
      bullet.y -= y;
    }
  });
};

export { Character };
