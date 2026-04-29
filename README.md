# wood-js

**760 bytes** (minified + brotlied) — JSX library with built-in router.

## Features

- ⚡ **Super small and dead simple** - read all the source code in a few minutes
- 🎨 **JSX syntax** (fragments, children components support)
- 🧭 **Client-side router** — SPA out of the box
- 🖱️ **Event handlers** — onClick, onSubmit
- 📦 **No virtual DOM, no hooks** — intentional choice for simplicity
- 🔧 **Zero runtime dependencies** — works with Vite
- 🔄 **Transparent data flow, no magic** — explicit updates, full control

## Philosophy

Wood.js gives you **full control** over DOM updates. No automatic re-renders, no virtual DOM diffing — just explicit, manual updates when you need them.

- 🎯 **Manual renders** — call `render(querySelector, component)` exactly when state changes
- 🔍 **Direct DOM access** — full vanilla DOM API available (`querySelector`, `addEventListener`, `classList`, etc.)
- 🧩 **Low-level friendly** — mix JSX with vanilla JS without fighting the framework
- 📦 **No hidden magic** — what you see is what happens

## Example: Manual Update

```jsx
import { render } from '@sseezov/wood-js'

export default function Counter() {
  let count = 0
  
  const increment = () => {
    count++
    render('#counter', count) // manual update
  }
  
  return (
    <>
      <div id="counter">{count}</div>
      <button onClick={increment}>+</button>
    </>
  )
}
```

## How to start project?

1. Install Vite, setup vite.config as shown below
2. Create index.html file, with source script (for example "index.js")
3. Write in index.html:

```html
<body>
  <div id="app"></div>
  <script type="module" src="./index.js"></script>
</body>
```

4. Write in index.js:

```javascript
import { initWood } from '@sseezov/wood-js'
import App from './src/App' // import your main component
import MainPage from './src/pages/Main/MainPage' // import your pages
import CatalogPage from './src/pages/Catalog/CatalogPage' // import your pages
import Error from './src/pages/Error' // import Error component if needed

const routes = [
  { path: '/', component: MainPage, parentSelector: '#main' },
  { path: '/catalog', component: CatalogPage, parentSelector: '#main' },
] // define routes with path, component and parent selector in each route

const ErrorRoute = { component: Error, parentSelector: '#main' } // set where to render error

initWood(App, routes, ErrorRoute) // init app with main component, routes (optional), and error (optional)
```

**Template**
<https://github.com/sseezov/wood-js-template>

## Vite Setup

```js
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // ... your config here
  esbuild: {
    jsxFactory: 'h',
    jsxInject: `import { h, Fragment } from '@sseezov/wood-js'`,
    jsxFragment: 'Fragment',
    jsx: 'transform',
    jsxDev: false 
  }
})
```

## NPM

<https://www.npmjs.com/package/@sseezov/wood-js>
