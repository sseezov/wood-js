import { render } from './render.js'
import { handlers } from './handlers.js'

let routes = []
let errorComponent = {}

export const setRoutes = (routesList) => {
  routes = routesList
  console.log('routerList', routesList);
  console.log('routes ', routes);
}
export const setErrorComponent = (Error) => {
  errorComponent = Error
}

const navigate = pathname => routes
  .find((route) => {
    const pattern = route.path.replace(/:[^/]+/g, '([^/]+)') + '/?$'
    const regex = new RegExp('^' + pattern)
    return regex.test(pathname)
  }) || errorComponent

export const mountRoute = async () => {
  const href = (window.location.href).replace(/\/+$/, '')
  if (window.location.href.at(-1) === '/') history.replaceState({}, '', href)
  const { pathname } = new URL(href)
  const { component, parentSelector } = navigate(pathname)
  handlers.clean()
  render(parentSelector, component())
}

document.addEventListener('click', async (event) => {
  const link = event.target.closest('a')
  if (link) {
    const href = link.getAttribute('href')
    event.preventDefault()
    const handlerElement = link.closest('[data-handler]')
    if (handlerElement) {
      // Имитируем клик для срабатывания обработчика, если он в родителе ссылки
      handlerElement.click()
    }

    if (href === 'back') {
      history.back()
      return
    }
    history.pushState({}, '', `${href}`)
    mountRoute()
  }
})

export const redirect = (route) => {
  history.pushState({}, '', `${route}`)
  mountRoute()
}

window.addEventListener('popstate', () => mountRoute())