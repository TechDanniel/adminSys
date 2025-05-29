import { defineComponent, h } from 'vue'
import { hasAuths } from '@/router/utils'

export default defineComponent({
  name: 'Auth',
  //权限
  props: {
    value: {
      type: undefined,
      default: []
    }
  },
  setup(props, { slots }) {
    //返回渲染函数
    return () => {
      if (!slots) return null
      return hasAuths(props.value) ? h('Fragment', null, slots?.default()) : null
    }
  }
})
