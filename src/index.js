import { initListeners } from './handlers.js'
import { mountRoute, setRoutes, setErrorComponent } from './router.js'
import render from './render.js'

export function initWood(
  App,
  routes,
  errorComponent = { component: () => 'error', parentSelector: '#app' },
) {
  setRoutes(routes)
  setErrorComponent(errorComponent)
  render('#app', App())
  initListeners()
  mountRoute()
}