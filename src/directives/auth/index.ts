import { hasAuths } from '@/router/utils'
import { Directive, DirectiveBinding } from 'vue'

export const auth: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<Array<string> | string>) {
    const { value } = binding
    if (value) {
      //如果没有权限就移除按钮
      !hasAuths(value) && el.parentNode.removeChild(el)
    } else {
      throw new Error("[Directive: auth]: need auths! Like v-auth=\"['btn.add','btn.edit']\"")
    }
  }
}
