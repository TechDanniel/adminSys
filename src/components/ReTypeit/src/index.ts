import TypeIt, { type Options as TypeItOptions } from 'typeit'
import { El } from 'typeit/dist/types'
import { defineComponent, PropType, h, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'TypeIt',
  props: {
    options: {
      type: Object as PropType<TypeItOptions>,
      default: () => ({}) as TypeItOptions
    }
  },
  // 子组件需要主动使用 expose 函数来明确暴露哪些属性和方法可供父组件访问,父组件用ref
  setup(props, { slots, expose }) {
    /**
     * 输出错误信息
     * @param message 错误信息
     */
    function throwError(message: string) {
      throw new TypeError(message)
    }

    //获取子组件的ref,这样就能使用typeIt了
    const typedItRef = ref<Element | null>(null)

    //组件挂载的时候获取到要开启打字动画的元素，并初始化TypeIt
    onMounted(() => {
      // 在 typedItRef 引用的元素里查找具有 type-it 类名的元素。
      const $typed = typedItRef.value!.querySelector('.type-it') as El
      if (!$typed) {
        const errorMsg = "请确保有且只有一个具有class属性为 'type-it' 的元素"
        throwError(errorMsg)
      }
      const typeIt = new TypeIt($typed, props.options).go()
      //TypeIt 库提供了一系列用于控制打字动画的方法，如 pause（暂停）、resume（恢复）、reset（重置）等。
      // 通过将 typeIt 实例暴露给父组件，父组件就能调用这些方法来控制子组件中的打字动画。
      expose({ typeIt })
    })

    return () => {
      {
        return h(
          'div',
          {
            ref: typedItRef
          },
          slots.default ? slots.default() : h('span', { class: 'type-it' })
        )
      }
    }
  }
})
