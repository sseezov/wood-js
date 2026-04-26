import { initListeners } from "./handlers"
import { render } from "./render"
import { mountRoute, setErrorComponent, setRoutes } from "./router"

export function initWood(App, routes, errorComponent) {
  render('#app', App())

  if (routes) {
    setRoutes(routes)
    mountRoute()
  }
  
  if (errorComponent) {
    setErrorComponent(errorComponent)
  }

  initListeners()
}