import { isFunction, upperFirst } from 'lodash-es'
import { h as hDemi, isVue2, VNode } from 'vue-demi'

type OptPass = {
  attrs?:
    | Record<string, any> & {
        style?: CSSStyleDeclaration
        class?: string | string[]
      }

  // 事件回调
  on?: Record<string, (...args: any[]) => void>
}

function eventsV3(evts: Record<string, (...args: any) => void> = {}) {
  const res: Record<string, (...args: any) => void> = {}
  Object.entries(evts).forEach(([evt, cb]) => {
    res[`on${upperFirst(evt)}`] = cb
  })
  return res
}

export function h(type: any, opt: OptPass, children: any = '') {
  if (isVue2) {
    const { style, class: cls, ...props } = opt.attrs ?? {}

    return hDemi(
      type as any,
      {
        on: opt.on,
        class: cls,
        style,
        props,
      },
      children,
    )
  }

  return hDemi(
    type,
    {
      ...opt.attrs,
      ...eventsV3(opt.on),
    },
    {
      default: () => children,
    },
  )
}

export function slot(sl: any) {
  return isFunction(sl) ? sl() : sl
}
