import { registerClick, registerSubmit } from './handlers'

export function h(tag, props, ...children) {
  if (tag === 'Fragment') {
    return children.flat().join('')
  }

  if (props) {
    if (props['onClick']) {
      const handlerId = registerClick(props['onClick'])
      props['data-handler'] = handlerId
      delete props['onClick']
    }

    if (props['onSubmit']) {
      const handlerId = registerSubmit(props['onSubmit'])
      props['data-handler'] = handlerId
      delete props['onSubmit']
    }
  }

  if (typeof tag === 'function') {
    return tag({ ...props, children: children.flat() })
  }

  const attrs = props
    ? Object.entries(props)
        .filter(([, value]) => !!value) // убрал пустые классы типа 'class=""'
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ')
    : ''

  const childrenStr = children.flat().join('')

  return `<${tag} ${attrs}>${childrenStr}</${tag}>`.replace(' >', '>')
}

export const Fragment = 'Fragment'