import * as PIXI from 'pixi.js';

let app: PIXI.Application;
let queue: any[] = [];

const Init = async (_app: PIXI.Application) => {
  app = _app;

  await Process();

  console.log('Init "Resource"');
};

const Load = (item: string, path: string) =>
  new Promise<{ res: any }>(resolve => {
    app.loader.add(item, path).load((_: any, res: any) => {
      return resolve({ res });
    });
  });

const Enqueue = (name: string, path: string) =>
  new Promise<{ res: any }>(resolve => {
    queue.push({ name, path, resolve });

    if (app && queue.length === 1) Process();
  });

const Process = async () => {
  if (queue.length > 0) {
    const item = queue.pop();

    const { res } = await Load(item.name, item.path);
    item.resolve({ res });

    await Process();
  }
};

const register = (path: string) => {
  let resource: any = null;
  let name = path.replace(/\//g, '').replace(/\./g, '');

  Enqueue(name, path).then(({ res }) => {
    console.log(`Loaded resource "${path}"`);
    resource = res[name];
  });

  return (): PIXI.LoaderResource => resource;
};

const resources = {
  playerDown: register('/playertest/01.png'),
  playerDownLeft: register('/playertest/02.png'),
  playerRightDown: register('/playertest/03.png'),
  playerRight: register('/playertest/04.png'),
  playerRightUp: register('/playertest/05.png'),
  playerUpLeft: register('/playertest/06.png'),
  playerUp: register('/playertest/07.png'),
  debugMap: register('map.png'),
  pallo: register('asdasdasd.png'),
  bullet: register('bullet.png'),
  box: register('test.png')
};

export { Init, resources };
