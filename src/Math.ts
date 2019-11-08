const clamp = (number: number, min: number, max: number) => {
  return Math.min(Math.max(number, min), max);
};

const getAngle = (from: any, to: any) => {
  const distY = from[1] - to[1];
  const distX = from[0] - to[0];
  const angle = (Math.atan2(distY, distX) / Math.PI) * 180 + 180;

  return angle;
};

export { getAngle };
