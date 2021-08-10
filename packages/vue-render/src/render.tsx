import { defineComponent, ref } from 'vue-demi'

export default defineComponent({
  setup() {
    const test = ref(0)
    return () => <div>测试：{test.value}</div>
  },
})
