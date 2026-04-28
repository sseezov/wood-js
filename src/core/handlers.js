export const handlers = {
  _id: 0,
  click: {},
  submit: {},
  addCustomHandler: function (name, handler) {
    this[name] = handler
  },
  getId: function () { return ++this._id },
}

export const registerClick = (handler) => {
  const id = handlers.getId()
  handlers.click[id] = handler
  return id
}

export const registerSubmit = (handler) => {
  const id = handlers.getId()
  handlers.submit[id] = handler
  return id
}

export function cleanDeadHandlers() {
  for (const id in handlers.click) {
    const element = document.querySelector(`[data-handler="${id}"]`)
    if (!element) delete handlers.click[id]
  }
  for (const id in handlers.submit) {
    const element = document.querySelector(`[data-handler="${id}"]`)
    if (!element) delete handlers.submit[id]
  }
}

export const initListeners = () => {
  const handleClick = (e) => {
    const { handler } = e.target.dataset
    if (handlers.click[handler]) {
      handlers.click[handler](e)
    }
  }

  const handleSubmit = (e) => {
    const { handler } = e.target.dataset
    e.preventDefault()
    if (handlers.submit[handler]) {
      handlers.submit[handler](e)
    }
  }

  document.addEventListener('click', handleClick)
  document.addEventListener('submit', handleSubmit)
}