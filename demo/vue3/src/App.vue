<script lang="ts">
import { defineComponent } from 'vue'
import { useFormRender } from '@chill-schema-form/vue-render'
import * as Data from './data/uiSchemas'

export default defineComponent({
  name: 'App',
  setup() {
    const { renderer } = useFormRender({
      uiSchema: Data.uiSchema,
      formData: {
        test: '123',
      },
    })
    return renderer
  },
})
</script>
