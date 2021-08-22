<script lang="ts">
import { defineComponent } from 'vue'
import { FormRender } from '@chill-schema-form/vue-render'
import * as Data from './data/uiSchemas'

export default defineComponent({
  name: 'App',
  setup() {
    return () =>
      FormRender({
        uiSchema: Data.uiSchema,
      })
  },
})
</script>
