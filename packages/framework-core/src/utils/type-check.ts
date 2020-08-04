export function isObject (obj: any) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
