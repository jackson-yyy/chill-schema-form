<template>
  <section>
    <FormRender :ui-schema="uiSchema" />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { FormRender } from '@chill-schema-form/vue-render'
import * as Data from '../../common/uiSchems'

export default defineComponent({
  name: 'App',
  components: {
    FormRender,
  },
  setup() {
    const uiSchema = ref(Data.uiSchema)
    return {
      uiSchema,
    }
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
