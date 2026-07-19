import {
  registerChange,
  registerClick,
  registerContextMenu,
  registerMouseEnter,
  registerMouseLeave,
  registerSubmit,
} from './handlers';

const escape = (str) => String(str).replace(/[&<>"]/g, (char) => `&#${char.charCodeAt(0)};`);

const setProps = (element, props) => {
  const listeners = {
    onClick: registerClick,
    onSubmit: registerSubmit,
    onChange: registerChange,
    onMouseEnter: registerMouseEnter,
    onMouseLeave: registerMouseLeave,
    onContextMenu: registerContextMenu,
  };

  Object.entries(props).forEach(([key, value]) => {
    if (listeners[key]) { // сетаем обработчик
      const handlerId = listeners[key](value);
      element.setAttribute(`data-${key}`, handlerId);
    }
    else { // сетаем аттрибут
      element.setAttribute(key, escape(value));
    }
  });
};

const isSvg = (tag) => [
  'svg', 'path', 'circle', 'rect', 'line', 'g', 'defs',
  'use', 'text', 'tspan', 'ellipse', 'polygon', 'polyline',
].includes(tag);

const toTextNode = (child) => (
  child instanceof Node
    ? child
    : document.createTextNode(String(child))
);

export function h(tag, props, ...children) {
  const flatChildren = children.flat();

  if (tag === 'Fragment') {
    const fragment = document.createDocumentFragment();
    flatChildren.forEach((child) => fragment.append(toTextNode(child)));
    return fragment;
  }

  if (typeof tag === 'function') {
    return tag({ ...props, children: flatChildren });
  }

  const element = isSvg(tag)
    ? document.createElementNS('http://www.w3.org/2000/svg', tag)
    : document.createElement(tag);

  if (props) {
    setProps(element, props);
  }

  flatChildren.forEach((child) => element.appendChild(toTextNode(child)));

  return element;
}

export const Fragment = 'Fragment';
