import type { iconType } from '../types'
// Component 类型是 Vue 3 提供的一种类型定义，用于在 TypeScript 代码中明确标识一个变量、参数或返回值是 Vue 组件
//type声明引入的是类型
import { h, defineComponent, type Component } from 'vue'
import { IconifyIconOffline, IconifyIconOnline, FontIcon } from '../index'

/*
该函数用于根据需求返回一个图标组件
支持iconfont，以及iconify
icon是必传属性
attrs是可选的iconType属性
返回Component
 */
export function useRenderIcon(icon: any, attrs?: iconType): Component {
  //iconfont组件,以IF-开头
  const ifReg = /^IF-/
  if (ifReg.test(icon)) {
    const name = icon.split(ifReg)[1]
    const iconName = name.slice(0, name.indexOf(' ') == -1 ? name.length : name.indexOf(' '))
    const iconType = name.slice(name.indexOf(' ') + 1, name.length)
    return defineComponent({
      name: 'FontIcon',
      render() {
        return h(FontIcon, {
          icon: iconName,
          iconType: iconType,
          ...attrs
        })
      }
    })
  } else if (typeof icon === 'function' || typeof icon?.render === 'function') {
    //SVG类型图标
    return attrs ? h(icon, { ...attrs }) : icon
  } else if (typeof icon === 'object') {
    //离线图标
    return defineComponent({
      name: 'OfflineIcon',
      render() {
        return h(IconifyIconOffline, {
          icon: icon,
          ...attrs
        })
      }
    })
  } else {
    //当收到一个字符串时，如果有：是在线图标，没有就是离线图标
    return defineComponent({
      name: 'Icon',
      render() {
        const IconifyIcon = icon && icon.includes(':') ? IconifyIconOnline : IconifyIconOffline
        return h(IconifyIcon, {
          icon: icon,
          ...attrs
        })
      }
    })
  }
}
