import { Directive, DirectiveBinding } from 'vue'
import { isFunction } from 'lodash'
import { useEventListener } from '@vueuse/core'

export const longpress: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<Array<any>>) {
    const [val, arg] = binding.value
    if (val && isFunction(val)) {
      // 用于存储 setTimeout 定时器的返回值
      let timer = null
      // 用于存储 setInterval 定时器的返回值（定时器 ID）
      let interTimer = null
      // 用于表示长按操作的延迟时间
      let num = 500
      // 用于表示在长按操作触发后，如果需要间隔重复触发回调函数，每次触发之间的间隔时间
      let interNum = null
      const isInter = arg?.includes(':') ?? false

      // 依据 binding的值，解析出长按触发的延迟时间 num 和重复触发的间隔时间 interNum。
      if (isInter) {
        num = Number(arg.split(':')[0])
        interNum = Number(arg.split(':')[1])
      } else if (arg) {
        num = Number(arg)
      }

      //清除定时器函数
      const clear = () => {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        if (interTimer) {
          clearInterval(interTimer)
          interTimer = null
        }
      }

      // 长按一段时间后，以指定间隔重复执行回调函数
      const onDownInter = (event: PointerEvent) => {
        event.preventDefault()
        if (interTimer === null) {
          interTimer = setInterval(() => {
            val()
          }, interNum)
        }
      }

      //根据配置设置一个长按定时器,间隔重复触发还是只触发一次
      const onDown = (event: PointerEvent) => {
        //清除之前的定时器
        clear()
        event.preventDefault()
        if (timer === null) {
          timer = isInter
            ? setTimeout(() => {
                val()
                onDownInter(event)
              }, num)
            : setTimeout(() => val(), num)
        }
      }

      useEventListener(el, 'pointerdown', onDown)
      useEventListener(el, 'pointerup', clear)
      useEventListener(el, 'pointerleave', clear)
    } else {
      throw new Error(
        '[Directive: longpress]: need callback and callback must be a function! Like v-longpress="callback"'
      )
    }
  }
}
