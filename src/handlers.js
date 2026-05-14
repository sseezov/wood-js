export const handlers = {
  _id: 0,
  click: {},
  submit: {},
  mouseenter: {},
  mouseleave: {},
  contextmenu: {},
  getId: function () { return ++this._id; },
};

export const registerClick = (handler) => {
  const id = handlers.getId();
  handlers.click[id] = handler;
  return id;
};

export const registerSubmit = (handler) => {
  const id = handlers.getId();
  handlers.submit[id] = handler;
  return id;
};

export const registerMouseEnter = (handler) => {
  const id = handlers.getId();
  handlers.mouseenter[id] = handler;
  return id;
};

export const registerMouseLeave = (handler) => {
  const id = handlers.getId();
  handlers.mouseleave[id] = handler;
  return id;
};

export const registerContextMenu = (handler) => {
  const id = handlers.getId();
  handlers.contextmenu[id] = handler;
  return id;
};

export function cleanDeadHandlers() {
  for (const id in handlers.click) {
    const element = document.querySelector(`[data-click="${id}"]`);
    if (!element) delete handlers.click[id];
  }
  for (const id in handlers.submit) {
    const element = document.querySelector(`[data-submit="${id}"]`);
    if (!element) delete handlers.submit[id];
  }
  for (const id in handlers.mouseenter) {
    const element = document.querySelector(`[data-mouseenter="${id}"]`);
    if (!element) delete handlers.mouseenter[id];
  }
  for (const id in handlers.mouseleave) {
    const element = document.querySelector(`[data-mouseleave="${id}"]`);
    if (!element) delete handlers.mouseleave[id];
  }
  for (const id in handlers.contextmenu) {
    const element = document.querySelector(`[data-contextmenu="${id}"]`);
    if (!element) delete handlers.contextmenu[id];
  }
}

export const initListeners = () => {
  const handleClick = (e) => {
    const { click } = e.target.closest('[data-click]')
      ? e.target.closest('[data-click]').dataset
      : { handler: null };
    if (handlers.click[click]) {
      handlers.click[click](e);
    }
  };

  const handleSubmit = (e) => {
    const { submit } = e.target.dataset;
    e.preventDefault();
    if (handlers.submit[submit]) {
      handlers.submit[submit](e);
    }
  };

  const handleMouseEnter = (e) => {
    if (e.target.dataset) {
      const { mouseenter } = e.target.dataset;
      if (handlers.mouseenter[mouseenter]) {
        handlers.mouseenter[mouseenter](e);
      }
    }
  };

  const handleMouseLeave = (e) => {
    if (e.target.dataset) {
      const { mouseleave } = e.target.dataset;
      if (handlers.mouseleave[mouseleave]) {
        handlers.mouseleave[mouseleave](e);
      }
    }
  };

  const handleContextMenu = (e) => {
    const { contextmenu } = e.target.closest('[data-contextmenu]')
      ? e.target.closest('[data-contextmenu]').dataset
      : { handler: null };

    if (handlers.contextmenu[contextmenu]) {
      e.preventDefault();
      handlers.contextmenu[contextmenu](e);
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('submit', handleSubmit);
  document.addEventListener('mouseenter', handleMouseEnter, true);
  document.addEventListener('mouseleave', handleMouseLeave, true);
  document.addEventListener('contextmenu', handleContextMenu);
};
