export type UiSchema = {
  widget?: FunctionalAttr<string | Component>

  filed?: string

  // 是否隐藏
  hidden?: FunctionalAttr<boolean>

  // 组件attrs
  attrs?: FunctionalAttr<
    | Record<string, any> & {
        style?: Record<string, string | number>
        class?: string | string[]
      }
  >

  // 事件回调
  on?: Record<string, <T extends unknown>(...args: T[]) => void>

  children?: FunctionalAttr<(UiSchema | string)[]>
}

export type Schema = (NumberKeywords | StringKeywords | ArrayKeywords) & {
  description?: string
  type?: SchemaType
  additionalProperties?: Boolean | Record<string, Schema>
  properties?: Record<string, Schema>
  items?: Schema | Schema[]
  $ref?: string
  required?: string[]
  anyOf?: Schema[]
  oneOf?: Schema[]
  allOf?: Schema[]
  not?: Schema

  /** new attrs */
  validators?: ((value: any, formData: Record<string, any>) => boolean)[]
  errMsg?: Partial<
    | Record<keyof (NumberKeywords & StringKeywords & ArrayKeywords) | 'type' | 'required', ErrMsg>
    | { validators?: ErrMsg[] }
  >
}

export type FunctionalAttr<T> = T | ((formData: Record<string, any>, val: any) => T)
type Component = object

type SchemaType = 'integer' | 'string' | 'array' | 'number' | 'boolean' | 'object'

interface NumberKeywords {
  minimum?: number
  maximum?: number
  exclusiveMinimum?: number
  exclusiveMaximum?: number
  multipleOf?: number
  format?: string
  enum?: number[]
}

interface StringKeywords {
  minLength?: number
  maxLength?: number
  pattern?: string
  format?: string
  enum?: string[]
}

interface ArrayKeywords {
  minItems?: number
  maxItems?: number
  uniqueItems?: boolean
}

type ErrMsg = string | ((title: string, value: any) => string)
