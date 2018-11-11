export function isWindowUndefined() {
  return typeof window === 'undefined';
}
export function getWindow() {
  return isWindowUndefined() ? {} : window;
}
