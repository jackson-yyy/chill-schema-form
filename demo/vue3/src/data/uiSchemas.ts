import type { UiSchema } from '@chill-schema-form/core'
import { IxInput, IxTextarea } from '@idux/components/input'

export const uiSchema: UiSchema = {
  widget: 'div',
  attrs: {
    style: {
      width: '200px',
      height: '200px',
    },
  },
  children: [
    {
      widget: (formData, value) => (formData.test1 === '1' && value === '1' ? IxInput : IxTextarea),
      filed: 'test',
      attrs: {
        placeholder: 'xxxxx',
      },
      on: {
        input(e) {
          console.log('input', e)
        },
        change(e) {
          console.log('change', e)
        },
      },
    },
    {
      widget: IxInput,
      filed: 'test1',
      attrs: {
        placeholder: 'xxxxx',
      },
      on: {
        input(e) {
          console.log('input', e)
        },
        change(e) {
          console.log('change', e)
        },
      },
    },
  ],
}
