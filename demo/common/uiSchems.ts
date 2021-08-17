export const uiSchema = {
  widget: 'input',
  filed: 'test',
  attrs: {
    style: {
      width: '200px',
      height: '200px',
    },
    placeholder: 'xxxxx',
  },
  on: {
    click(e) {
      console.log('click', e)
    },
    input(e) {
      console.log('input', e)
    },
    change(e) {
      console.log('change', e)
    },
  },
  children: ['xxx'],
}
