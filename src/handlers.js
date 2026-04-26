export const handlers = {
  _id: 0,
  click: {},
  submit: {},
  clean: function () {
    this.click = {}
    this.submit = {}
  },
  addCustomHandler: function(name, handler){
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