const keyState: any = {};
const mouseState: any = {};

const onMouseDown = (key: any) => {
  mouseState[key] = true;
};

const onMouseUp = (key: any) => {
  mouseState[key] = false;
};

const onKeyDown = (key: any) => {
  if (!keyState[key.key]) console.log(key.key, 'down');
  keyState[key.key] = true;
};

const onKeyUp = (key: any) => {
  if (keyState[key.key]) console.log(key.key, 'up');
  keyState[key.key] = false;
};

window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

const getMouseDown = (key: string) => {
  return mouseState[key];
};

const getKeyDown = (key: string) => {
  return keyState[key];
};

const getMousePosition = (renderer: any) => {
  const x = renderer.plugins.interaction.mouse.global.x;
  const y = renderer.plugins.interaction.mouse.global.y;

  return [x, y];
};

export {
  onKeyDown,
  onMouseUp,
  onMouseDown,
  onKeyUp,
  getKeyDown,
  getMouseDown,
  getMousePosition
};
