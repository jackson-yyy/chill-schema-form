export type UiSchemaWithoutFunctional = CommonAttrs & FunctionalAttrs

export type UiSchema = CommonAttrs & TransformToFunctional<FunctionalAttrs>

export type FunctionalAttr<T> = T | ((formData: Record<string, any>, val: any) => T)

interface CommonAttrs {
  filed?: string
  modelEvt?: string
  // 事件回调
  on?: Record<string, <T extends unknown>(...args: T[]) => void>
}

interface FunctionalAttrs {
  widget?: string | Component

  // 是否隐藏
  hidden?: boolean

  // 组件attrs
  attrs?: Record<string, any> & {
    style?: Record<string, string | number>
    class?: string | string[]
  }

  children?: (UiSchema | string)[]
}

type TransformToFunctional<T> = {
  [P in keyof T]: FunctionalAttr<Required<T>[P]>
}

type Component = object
