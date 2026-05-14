import { registerClick, registerContextMenu, registerMouseEnter, registerMouseLeave, registerSubmit } from './handlers';

export function h(tag, props, ...children) {
  if (tag === 'Fragment') {
    return children.flat().join('');
  }

  if (props) {
    if (props['onClick']) {
      const handlerId = registerClick(props['onClick']);
      props['data-click'] = handlerId;
      delete props['onClick'];
    }

    if (props['onSubmit']) {
      const handlerId = registerSubmit(props['onSubmit']);
      props['data-submit'] = handlerId;
      delete props['onSubmit'];
    }

    if (props['onMouseEnter']) {
      const handlerId = registerMouseEnter(props['onMouseEnter']);
      props['data-mouseenter'] = handlerId;
      delete props['onMouseEnter'];
    }

    if (props['onMouseLeave']) {
      const handlerId = registerMouseLeave(props['onMouseLeave']);
      props['data-mouseleave'] = handlerId;
      delete props['onMouseLeave'];
    }

    if (props['onContextMenu']) {
      const handlerId = registerContextMenu(props['onContextMenu']);
      props['data-contextmenu'] = handlerId;
      delete props['onContextMenu'];
    }
  }

  if (typeof tag === 'function') {
    return tag({ ...props, children: children.flat() });
  }

  const attrs = props
    ? Object.entries(props)
        .filter(([, value]) => !!value) // убрал пустые классы типа 'class=""'
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ')
    : '';

  const childrenStr = children.flat().join('');

  return `<${tag} ${attrs}>${childrenStr}</${tag}>`.replace(' >', '>');
}

export const Fragment = 'Fragment';
