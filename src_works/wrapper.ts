export async function getLazyLib() {
  const module = await import(/* webpackChunkName: "lazy" */ "./lazy");
  return module.lazyLib;
}
