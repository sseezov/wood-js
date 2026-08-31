# woodjsx

**1.6KB** (minified + brotlied) — JSX library with built-in router.

## Features

- **Super small and dead simple** - read all the source code in a few minutes
- **Full JSX syntax support** (fragments, children components, JS expressions)
- **Client-side router** — SPA out of the box
- **Event handlers** — onClick, onSubmit, onChange, etc
- **No virtual DOM, no hooks** — intentional choice for simplicity
- **Zero runtime dependencies** — works with Vite
- **Async components** — no special hooks, just write `async / await` anywhere you need
- **Transparent data flow, no magic** — explicit updates, full control

## Philosophy

Wood.js gives you **full control** over DOM updates. No automatic re-renders, no virtual DOM diffing — just explicit, manual updates when you need them.

- **Manual renders** — call `render(querySelector, component)` when you need to render component, for example on data fetch
- **Direct DOM access** — full vanilla DOM API available (`querySelector`, `addEventListener`, `classList`, etc.) because you have full control over app rendering
- **Low-level friendly** — mix JSX with vanilla JS without fighting the framework
- **No hidden magic** — what you see is what happens

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

## How to start a project?

1. Install Vite, setup vite.config as shown below
2. Create an index.html file, with source script (e.g. "index.js")
3. Write in index.html:

```html
<body>
  <div id="app"></div>
  <script type="module" src="./index.js"></script>
</body>
```

4. Write in index.js:

```javascript
import { initWood } from './src/core/initWood.js';
import App from './src/App.jsx';

initWood(App, '#app');
```

Use routes if you need, similar to React Router:

```jsx
// App.jsx
import { Route, Routes } from "./core/router";
import Layout from "./shared/Layout.jsx";
import PageA from "./pages/A.jsx";
import PageB from "./pages/B.jsx";

export default async function App() {
  return (
    <Layout>
      <Routes mountTo="#main">
        <Route path="/:appId/a" component={PageA} />
        <Route path="/:appId/b" component={PageB} />
        <Route path="*" component={Error} />
      </Routes>
    </Layout>
  )
}
```

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

<https://www.npmjs.com/package/@sseezov/woodjsx>
