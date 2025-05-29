import type { Emitter } from 'mitt'
import mitt from 'mitt'

/** 全局公共事件需要在此处添加类型 */
type Events = {
  openPanel: string
  tagOnClick: string
  logoChange: boolean
  tagViewsChange: string
  changLayoutRoute: string
  tagViewsShowModel: string
  imageInfo: {
    img: HTMLImageElement
    height: number
    width: number
    x: number
    y: number
  }
}

// Emitter 是 mitt 库中定义的一个类型，它代表事件发射器的类型。
// 这是调用 mitt 函数并传入泛型参数 Events 来创建事件发射器实例。
export const emitter: Emitter<Events> = mitt<Events>()
