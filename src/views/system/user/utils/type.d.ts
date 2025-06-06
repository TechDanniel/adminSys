import { CSSProperties } from 'vue'

export type PaginationProps = {
  /** 分页大小，默认值：`default` */
  size?: Size
  /** 是否为分页按钮添加背景色，默认值：`false` */
  background?: boolean
  /** 每页显示条目个数，默认值 `5` `该属性为必填属性` */
  pageSize: number
  /** 每页显示条目数的初始值 */
  defaultPageSize?: number
  /** 总条目数，默认值 `0` `该属性为必填属性` */
  total: number
  /** 总页数 `total` 和 `page-count` 设置任意一个就可以达到显示页码的功能；如果要支持 `page-sizes` 的更改，则需要使用 `total` 属性 */
  pageCount?: number
  /** 设置最大页码按钮数。页码按钮的数量，当总页数超过该值时会折叠 */
  pagerCount?: number
  /** 当前页数 `该属性为必填属性` */
  currentPage: number
  /** 当前页数的初始值 */
  defaultCurrentPage?: number
  /** 组件布局，子组件名用逗号分隔，默认值 `"total, sizes, prev, pager, next, jumper"` */
  layout?: string
  /** 每页显示个数选择器的选项设置，默认值 `[5, 10, 15, 20]` */
  pageSizes?: number[]
  /** 每页显示个数选择器的下拉框类名 */
  popperClass?: string
  /** 替代图标显示的上一页文字 */
  prevText?: string
  /** 替代图标显示的下一页文字 */
  nextText?: string
  /** 是否禁用分页，默认值：`false` */
  disabled?: boolean
  /** 只有一页时是否隐藏 */
  hideOnSinglePage?: boolean
  /** 分页的对齐方式，默认值：`right` */
  align?: Align
  /** 自定义分页样式 */
  style?: CSSProperties
  /** 自定义类名 */
  class?: string
}

export interface FormItemProps {
  id?: number
  /** 用于判断是`新增`还是`修改` */
  title: string
  higherDeptOptions: Record<string, unknown>[]
  parentId: number
  nickname: string
  username: string
  password: string
  phone: string | number
  email: string
  sex: string | number
  status: number
  dept?: {
    id?: number
    name?: string
  }
  remark: string
}

export interface FormProps {
  formInline: FormItemProps
}

export interface RoleFormItemProps {
  username: string
  nickname: string
  /** 角色列表 */
  roleOptions: any[]
  /** 选中的角色列表 */
  ids: Record<number, unknown>[]
}

export interface RoleFormItemProps {
  username: string
  nickname: string
  /** 角色列表 */
  roleOptions: any[]
  /** 选中的角色列表 */
  ids: Record<number, unknown>[]
}
export interface RoleFormProps {
  formInline: RoleFormItemProps
}
