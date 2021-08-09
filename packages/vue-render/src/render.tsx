import { defineComponent, ref, isVue2 } from 'vue-demi'

export default defineComponent({
  setup() {
    console.log(isVue2)

    const test = ref(0)
    return () => <div>测试：{test.value}</div>
  },
})
