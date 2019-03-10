export function isLight(color) {
  // https://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black#12043228
  const c = color.substring(1);
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >>  8) & 0xff;
  const b = (rgb >>  0) & 0xff;
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luma > 40 ? true : false;
}