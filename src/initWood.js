import { initListeners } from './handlers.js';
import { render } from './render.js';
import { mountRoute, routes } from './router.js';

export async function initWood(App, selector) {
  await render(selector, App());
  if (routes.length > 0) {
    mountRoute();
  }
  initListeners();
}
