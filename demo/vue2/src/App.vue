<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useFormRender } from '@chill-schema-form/vue-render'
import * as Data from './data/uiSchems'

export default defineComponent({
  name: 'App',
  setup() {
    const { renderer } = useFormRender({
      uiSchema: Data.uiSchema,
      formData: {
        test: '123',
        test1: '',
      },
    })
    return renderer
  },
})
</script>
