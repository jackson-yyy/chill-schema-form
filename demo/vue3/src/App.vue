<template>
  <section>
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
    <FormRender test1="x" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import { FormRender } from '@chill-schema-form/vue-render'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    FormRender,
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
