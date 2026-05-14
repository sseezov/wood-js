import { render } from './render.js';
import { cleanDeadHandlers } from './handlers.js';

let routes = [];
let errorComponent = {};

export const setRoutes = (routesList) => {
  routes = routesList;
};
export const setErrorComponent = (Error) => {
  errorComponent = Error;
  console.log(errorComponent);
};

const navigate = pathname => routes
  .find((route) => {
    const pattern = route.path.replace(/:[^/]+/g, '([^/]+)') + '/?$';
    const regex = new RegExp('^' + pattern);
    return regex.test(pathname);
  }) || errorComponent;

export const mountRoute = async () => {
  const href = (window.location.href).replace(/\/+$/, '');
  if (window.location.href.at(-1) === '/') history.replaceState({}, '', href);
  const { pathname } = new URL(href);
  const { component, parentSelector } = navigate(pathname);
  await render(parentSelector, component());
  cleanDeadHandlers();
};

export const navigateBack = () => {
  history.back();
};

export const redirect = (route) => {
  history.pushState({}, '', `${route}`);
  mountRoute();
};

export const refreshPage = () => {
  const currentUrl = window.location.href;
  history.replaceState({}, '', currentUrl);
  mountRoute();
};

window.addEventListener('popstate', () => mountRoute());
