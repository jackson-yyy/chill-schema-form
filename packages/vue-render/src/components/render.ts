import { DataController, normalizeUiSchema, useDataController } from './hooks'
import { isString } from 'lodash-es'
import { h } from '../utils/demi'
import type { RenderProps, UiSchema } from '../types'
import { VNode, defineComponent, DefineComponent } from 'vue-demi'
import { object } from 'vue-types'

const childProps = {
  uiSchema: object<UiSchema>().isRequired,
  dataController: object<DataController>().isRequired,
}

const Child: DefineComponent<typeof childProps> = defineComponent({
  props: childProps,
  setup(props) {
    const _uiSchema = normalizeUiSchema(props.uiSchema, props.dataController)

    return () =>
      _uiSchema.value.hidden
        ? null
        : h(
            _uiSchema.value.widget || 'div',
            {
              attrs: {
                ..._uiSchema.value.attrs,
                value: props.dataController.getValue(_uiSchema.value.filed),
              },
              on: {
                ..._uiSchema.value.on,
                [_uiSchema.value.modelEvt!](value: any) {
                  _uiSchema.value.filed && props.dataController.setValue(_uiSchema.value.filed, value)

                  _uiSchema.value.on?.[_uiSchema.value.modelEvt!]?.(value)
                },
              },
            },
            _uiSchema.value.children?.map(item =>
              isString(item) ? item : h(Child, { attrs: { uiSchema: item, dataController: props.dataController } }),
            ),
          )
  },
})

export function useFormRender(props: RenderProps): {
  renderer: () => VNode | null
  getValue: (path: string) => any
  getErrors: (path: string) => Record<string, any>
} {
  const dataController = useDataController(props.formData ?? {})

  const renderer = () => (props.uiSchema ? h(Child, { attrs: { uiSchema: props.uiSchema, dataController } }) : null)

  return {
    renderer,
    getValue: dataController.getValue,
    getErrors: dataController.getErrors,
  }
}
