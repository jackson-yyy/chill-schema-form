import { IxInput } from '@idux/components/input'
import type { UiSchema } from '@chill-schema-form/vue-render'

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
      widget: IxInput,
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
      widget: 'input',
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
      widget: 'div',
      children: [
        {
          widget: 'h1',
          children: ['标题1'],
        },
        {
          widget: 'textarea',
          attrs: {
            placeholder: 'xxxxx',
          },
        },
      ],
    },
  ],
}
