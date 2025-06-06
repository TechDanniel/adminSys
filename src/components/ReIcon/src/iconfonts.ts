import { h, defineComponent } from 'vue'

//封装iconfont组件，默认`font-class`引用模式，支持`unicode`引用、`font-class`引用、`symbol`引用
export default defineComponent({
  name: 'FontIcon',
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  render() {
    const attrs = this.$attrs
    if (Object.keys(attrs).includes('uni') || attrs?.iconType === 'uni') {
      return h(
        'i',
        {
          class: 'iconfont',
          ...attrs
        },
        this.icon
      )
    } else if (Object.keys(attrs).includes('svg') || attrs?.iconType === 'svg') {
      return h(
        'svg',
        {
          class: 'icon',
          ...attrs
        },
        {
          default: () => [
            h('use', {
              'xlink:href': `#${this.icon}`
            })
          ]
        }
      )
    } else {
      return h('i', {
        class: `iconfont ${this.icon}`,
        ...attrs
      })
    }
  }
})
