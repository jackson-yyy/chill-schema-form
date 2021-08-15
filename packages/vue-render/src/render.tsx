import { defineComponent, ref } from 'vue-demi'

export default defineComponent({
  props: {
    test1: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    // const test = ref(0)
    return () => (
      <div>
        测试: {props.test1}
      </div>
    )
  },
})
