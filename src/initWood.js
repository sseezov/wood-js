import { initListeners } from "./handlers"
import { render } from "./render"
import { mountRoute, setErrorComponent, setRoutes } from "./router"

export function initWood(App, routes, errorComponent = { component: () => 'error', parentSelector: '#app' }) {
  setRoutes(routes)
  setErrorComponent(errorComponent)
  render('#app', App())
  initListeners()
  mountRoute()
}