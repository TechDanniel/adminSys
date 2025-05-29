import type { VNode, Component } from 'vue'
import { iconType } from '@/components/ReIcon/types'

export interface OptionsType {
  /** 文字 */
  label?: string | (() => VNode | Component)
  icon?: string | Component
  /** 图标属性、样式配置 */
  iconAttrs?: iconType
  /** 值 */
  value?: any
  /** 是否禁用 */
  disabled?: boolean
  /** `tooltip` 提示 */
  tip?: string
}
