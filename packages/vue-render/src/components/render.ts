import { DataController, normalizeUiSchema, useDataController } from './hooks'
import { isString } from 'lodash-es'
import { h } from '../utils/demi'
import type { RenderProps, UiSchema } from '../types'
import { VNode } from 'vue-demi'

function renderChild(uiSchema: UiSchema, controller: DataController): ReturnType<typeof h> | null {
  const _uiSchema = normalizeUiSchema(uiSchema, controller)

  return _uiSchema.value.hidden
    ? null
    : h(
        _uiSchema.value.widget || 'div',
        {
          attrs: {
            ..._uiSchema.value.attrs,
            value: controller.getValue(uiSchema.filed),
          },
          on: {
            ..._uiSchema.value.on,
            [_uiSchema.value.modelEvt!](value: any) {
              _uiSchema.value.filed && controller.setValue(_uiSchema.value.filed, value)

              _uiSchema.value.on?.[_uiSchema.value.modelEvt!]?.(value)
            },
          },
        },
        _uiSchema.value.children?.map(item => (isString(item) ? item : renderChild(item, controller))),
      )
}

export function useFormRender(props: RenderProps): {
  renderer: () => VNode | null
  getValue: (path: string) => any
  getErrors: (path: string) => Record<string, any>
} {
  const dataController = useDataController(props.formData ?? {})

  const renderer = () => (props.uiSchema ? renderChild(props.uiSchema, dataController) : null)

  return {
    renderer,
    getValue: dataController.getValue,
    getErrors: dataController.getErrors,
  }
}
