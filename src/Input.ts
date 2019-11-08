const keyState: any = {};

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

const getInputDown = (key: string) => {
  return keyState[key];
};

const getMousePosition = (renderer: any) => {
  const x = renderer.plugins.interaction.mouse.global.x;
  const y = renderer.plugins.interaction.mouse.global.y;

  return [x, y];
};

export { onKeyDown, onKeyUp, getInputDown, getMousePosition };
