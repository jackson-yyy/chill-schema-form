import { normalizeUiSchema } from './hooks'
import { isString } from 'lodash-es'
import { h } from '../utils/demi'
import type { RenderProps, UiSchema } from '../types'

function renderChild(uiSchema: UiSchema, formData: Record<string, any>): ReturnType<typeof h> | null {
  const _uiSchema = normalizeUiSchema(uiSchema, formData)
  const onInput = (value: any) => {
    // TODO: update formData
    console.log('update formData')

    _uiSchema.value.on?.input(value)
  }

  return _uiSchema.value.hidden
    ? null
    : h(
        _uiSchema.value.widget || 'div',
        {
          attrs: _uiSchema.value.attrs,
          on: {
            ..._uiSchema.value.on,
            input: onInput,
          },
        },
        _uiSchema.value.children?.map(item => (isString(item) ? item : renderChild(item, formData))),
      )
}

export default function (props: RenderProps) {
  return props.uiSchema ? renderChild(props.uiSchema, props.formData ?? {}) : null
}
