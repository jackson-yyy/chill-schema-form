import { Input } from 'ant-design-vue'

export const uiSchema = {
  widget: 'div',
  attrs: {
    style: {
      width: '200px',
      height: '200px',
    },
  },
  children: [
    {
      widget: (formData, value) => (formData.test1 === '1' && value === '1' ? Input : Input.TextArea),
      filed: 'test',
      attrs: {
        placeholder: 'xxxxx',
      },
      modelEvt: 'change.value',
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
      widget: Input,
      filed: 'test1',
      modelEvt: 'change.value',
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
