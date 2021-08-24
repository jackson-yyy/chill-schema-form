import { computed, isVue2, reactive } from 'vue-demi'
import { get, isFunction, set } from 'lodash-es'

import type { FunctionalAttr, UiSchema } from '@chill-schema-form/core'

function getFunctionalAttr<T extends unknown, K extends unknown>(
  formData: Record<string, any>,
  value: K,
  attr?: FunctionalAttr<T>,
): T | undefined {
  if (isFunction(attr)) {
    return attr(formData, value)
  }
  return attr
}

export function normalizeUiSchema(uiSchema: UiSchema, controller: DataController) {
  const formData = controller.getValue() as Record<string, any>
  const value = controller.getValue(uiSchema.filed)

  return computed(() => ({
    ...uiSchema,
    modelEvt: uiSchema.modelEvt ?? (isVue2 ? 'input' : 'update:value'),
    widget: getFunctionalAttr(formData, value, uiSchema.widget),
    hidden: getFunctionalAttr(formData, value, uiSchema.hidden),
    attrs: getFunctionalAttr(formData, value, uiSchema.attrs),
    children: getFunctionalAttr(formData, value, uiSchema.children),
  }))
}

export type DataController = {
  setValue: <K extends unknown>(path: string, value: K) => void
  getValue: <T extends unknown>(path?: string) => T | Record<string, any>
  getErrors: (path: string) => Record<string, any>
}

export function useDataController(defaultData: Record<string, any>): DataController {
  const formData = reactive(defaultData)

  const setValue = (path: string, value: any) => set(formData, path, value)
  const getValue = (path?: string) => (path ? get(formData, path) : formData)
  const getErrors = (path?: string) => (path ? get(formData, path) : formData)

  return {
    setValue,
    getValue,
    getErrors,
  }
}
