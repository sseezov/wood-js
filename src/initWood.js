import { initListeners } from './handlers.js';
import { render } from './render.js';
import { mountRoute, setErrorComponent, setRoutes } from './router.js';

export function initWood(App, routes, errorComponent) {
  if (errorComponent) {
    setErrorComponent(errorComponent);
  }

  if (routes) {
    setRoutes(routes);
    mountRoute();
  }

  render('#app', App());

  initListeners();
}
