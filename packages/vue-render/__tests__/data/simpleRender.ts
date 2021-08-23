import { UiSchema } from "../../src/index";

export const uiSchema: UiSchema = {
  widget: 'div',
  attrs: {
    class: 'div-1',
    style: {
      width: '200px',
      height: '200px',
    },
  },
  children: [
    {
      widget: 'input',
      attrs: {
        class: 'input-1',
        placeholder: 'input-1',
      }
    },
    {
      widget: 'div-1.1',
      children: [
        {
          widget: 'h1',
          children: ['标题1']
        },
        {
          widget: 'textarea',
          attrs: {
            placeholder: 'textarea',
          }
        }
      ]
    }
  ]
}