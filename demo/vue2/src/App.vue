<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { FormRender } from '@chill-schema-form/vue-render'
import * as Data from './data/uiSchems'

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
