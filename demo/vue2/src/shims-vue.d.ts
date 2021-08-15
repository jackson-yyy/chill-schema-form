declare module '*.vue' {
  import { defineComponent } from '@vue/composition-api'
  const component: typeof defineComponent
  export default component
}
