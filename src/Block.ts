import * as PIXI from 'pixi.js';
import { resources } from './lib/Resource';

const environmentColliders: PIXI.Sprite[] = [];

const loadColliders = () => {
  environmentColliders.push(new PIXI.Sprite(resources.box().texture));
};

const Block = (viewport: any) => {};

export { environmentColliders, loadColliders };
