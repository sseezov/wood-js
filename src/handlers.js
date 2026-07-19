export const handlers = {
  _id: 0,
  click: {},
  submit: {},
  change: {},
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

export const registerChange = (handler) => {
  const id = handlers.getId();
  handlers.change[id] = handler;
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
    const element = document.querySelector(`[data-onclick="${id}"]`);
    if (!element) delete handlers.click[id];
  }
  for (const id in handlers.submit) {
    const element = document.querySelector(`[data-onsubmit="${id}"]`);
    if (!element) delete handlers.submit[id];
  }
  for (const id in handlers.change) {
    const element = document.querySelector(`[data-onchange="${id}"]`);
    if (!element) delete handlers.change[id];
  }
  for (const id in handlers.mouseenter) {
    const element = document.querySelector(`[data-onmouseenter="${id}"]`);
    if (!element) delete handlers.mouseenter[id];
  }
  for (const id in handlers.mouseleave) {
    const element = document.querySelector(`[data-onmouseleave="${id}"]`);
    if (!element) delete handlers.mouseleave[id];
  }
  for (const id in handlers.contextmenu) {
    const element = document.querySelector(`[data-oncontextmenu="${id}"]`);
    if (!element) delete handlers.contextmenu[id];
  }
}

export const initListeners = () => {
  const handleClick = (e) => {
    const { onclick } = e.target.closest('[data-onclick]')
      ? e.target.closest('[data-onclick]').dataset
      : { handler: null };
    if (handlers.click[onclick]) {
      handlers.click[onclick](e);
    }
  };

  const handleSubmit = (e) => {
    const { onsubmit } = e.target.dataset;
    e.preventDefault();
    if (handlers.submit[onsubmit]) {
      handlers.submit[onsubmit](e);
    }
  };

  const handleChange = (e) => {
    const { onchange } = e.target.dataset;
    if (handlers.change[onchange]) {
      handlers.change[onchange](e);
    }
  };

  const handleMouseEnter = (e) => {
    if (e.target.dataset) {
      const { onmouseenter } = e.target.dataset;
      if (handlers.mouseenter[onmouseenter]) {
        handlers.mouseenter[onmouseenter](e);
      }
    }
  };

  const handleMouseLeave = (e) => {
    if (e.target.dataset) {
      const { onmouseleave } = e.target.dataset;
      if (handlers.mouseleave[onmouseleave]) {
        handlers.mouseleave[onmouseleave](e);
      }
    }
  };

  const handleContextMenu = (e) => {
    const { oncontextmenu } = e.target.closest('[data-contextmenu]')
      ? e.target.closest('[data-contextmenu]').dataset
      : { handler: null };

    if (handlers.contextmenu[oncontextmenu]) {
      e.preventDefault();
      handlers.contextmenu[oncontextmenu](e);
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('submit', handleSubmit);
  document.addEventListener('change', handleChange);
  document.addEventListener('mouseenter', handleMouseEnter, true);
  document.addEventListener('mouseleave', handleMouseLeave, true);
  document.addEventListener('contextmenu', handleContextMenu);
};
