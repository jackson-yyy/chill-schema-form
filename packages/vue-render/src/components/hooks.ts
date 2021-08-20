import { computed, ComputedRef, shallowRef } from 'vue-demi'
import { isFunction } from 'lodash-es'

import type { FunctionalAttr, UiSchema } from './types'

export function useFunctionalAttr<T extends unknown, K extends unknown>(
  formData: Record<string, any>,
  value: K,
  attr?: FunctionalAttr<T>,
): ComputedRef<T | undefined> {
  const shallowAttr = shallowRef(attr)
  return computed(() => {
    if (isFunction(shallowAttr.value)) {
      return shallowAttr.value(formData, value)
    }
    return shallowAttr.value
  })
}

export function normalizeUiSchema(uiSchema: UiSchema, formData: Record<string, any>) {
  const widget = useFunctionalAttr(formData, uiSchema.filed, uiSchema.widget)
  const hidden = useFunctionalAttr(formData, uiSchema.filed, uiSchema.hidden)
  const attrs = useFunctionalAttr(formData, uiSchema.filed, uiSchema.attrs)
  const children = useFunctionalAttr(formData, uiSchema.filed, uiSchema.children)

  return computed(() => ({
    ...uiSchema,
    widget: widget.value,
    hidden: hidden.value,
    attrs: attrs.value,
    children: children.value,
  }))
}
