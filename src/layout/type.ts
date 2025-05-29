import type { IconifyIcon } from '@iconify/vue'

//默认的路由标签
export const routerArrays: Array<RouteConfigs> = [
  {
    path: '/welcome',
    meta: {
      title: 'menus.pureHome',
      icon: 'ep:home-filled'
    }
  }
]

export type RouteConfigs = {
  path?: string
  query?: object
  params?: object
  meta?: routeMetaType
  children?: RouteConfigs[]
  name?: string
}

export type routeMetaType = {
  title?: string
  icon?: string | IconifyIcon
  showLink?: boolean
  savedPosition?: boolean
  auths?: Array<string>
}

//标签页功能按钮的样式
export type tagsViewsType = {
  icon: string | IconifyIcon
  text: string
  divided: boolean
  disabled: boolean
  show: boolean
}
