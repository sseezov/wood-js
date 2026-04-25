# 🌲 wood-js

**760 bytes** (minified + brotlied) — JSX library with built-in router.

## Features

- ⚡ **Super small and dead simple** - read all the source code in a few minutes
- 🎨 **JSX syntax** (fragments, children components support)
- 🧭 **Client-side router** — SPA out of the box
- 🖱️ **Event handlers** — onClick, onSubmit
- 📦 **No virtual DOM, no hooks** — intentional choice for simplicity
- 🔧 **Zero runtime dependencies** -  works with Vite

## How to start project?

1. Install Vite, setup vite.config as shown below
2. Create index.html file, with source script (for example "index.js")
3. Write in index.js:

```javascript
import { initWood } from '@sseezov/wood-js'
import App from './src/App'
import MainPage from './src/pages/Main/MainPage'
import CatalogPage from './src/pages/Catalog/CatalogPage'
import Error from './src/pages/Error'

const routes = [
  { path: '/', component: MainPage, parentSelector: '#main' },
  { path: '/catalog', component: CatalogPage, parentSelector: '#main' },
]

initWood(App, routes, Error)
```

**Example**
E-commerce web-site: https://github.com/sseezov/n-store/tree/main/front-public

## Vite Setup

```js
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxInject: `import { h, Fragment } from '@sseezov/wood-js'`,
    jsxFragment: 'Fragment'
  }
})
```

## NPM

<https://www.npmjs.com/package/@sseezov/wood-js>
