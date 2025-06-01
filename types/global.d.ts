import { TableColumnCtx } from 'element-plus'
import { CSSProperties } from 'vue'

type Effect = 'light' | 'dark'
declare global {
  /** 平台配置信息，对应public/platform-config.json */
  interface PlatformConfigs {
    Version?: string
    Title?: string
    FixedHeader?: boolean
    HiddenSideBar?: boolean
    MultiTagsCache?: boolean
    MaxTagsLevel?: number
    KeepAlive?: boolean
    Locale?: string
    Layout?: string
    Theme?: string
    DarkMode?: boolean
    OverallStyle?: string
    Grey?: boolean
    Weak?: boolean
    HideTabs?: boolean
    HideFooter?: boolean
    Stretch?: boolean | number
    SidebarStatus?: boolean
    EpThemeColor?: string
    ShowLogo?: boolean
    ShowModel?: string
    MenuArrowIconNoTransition?: boolean
    CachingAsyncRoutes?: boolean
    TooltipEffect?: Effect
    ResponsiveStorageNameSpace?: string
    MenuSearchHistory?: number
    MapConfigure?: {
      amapKey?: string
      options: {
        resizeEnable?: boolean
        center?: number[]
        zoom?: number
      }
    }
  }

  /**
   * 缓存到浏览器本地存储的类型声明
   */
  interface StorageConfigs {
    version?: string
    title?: string
    fixedHeader?: boolean
    hiddenSideBar?: boolean
    multiTagsCache?: boolean
    keepAlive?: boolean
    locale?: string
    layout?: string
    theme?: string
    darkMode?: boolean
    grey?: boolean
    weak?: boolean
    hideTabs?: boolean
    hideFooter?: boolean
    //侧边栏打开关闭状态
    sidebarStatus?: boolean
    epThemeColor?: string
    themeColor?: string
    overallStyle?: string
    showLogo?: boolean
    showModel?: string
    menuSearchHistory?: number
    mapConfigure?: {
      amapKey?: string
      options: {
        resizeEnable?: boolean
        center?: number[]
        zoom?: number
      }
    }
    username?: string
  }

  /**
   * `responsive-storage` 本地响应式 `storage` 的类型声明
   */
  interface ResponsiveStorage {
    locale: {
      locale?: string
    }
    layout: {
      layout?: string
      theme?: string
      darkMode?: boolean
      sidebarStatus?: boolean
      epThemeColor?: string
      themeColor?: string
      overallStyle?: string
    }
    configure: {
      grey?: boolean
      weak?: boolean
      hideTabs?: boolean
      hideFooter?: boolean
      showLogo?: boolean
      showModel?: string
      multiTagsCache?: boolean
      stretch?: boolean | number
    }
    tags?: Array<any>
  }

  // 定义扩展后的列类型
  interface TableColumns {
    prop: string
    label: string
    minWidth?: number
    // 添加自定义属性
    hide?: boolean
    fixed?: boolean
    formatter?: (row: any, column: TableColumnCtx<any>, cellValue: any, index: number) => any
    width?: number
    align?: Align
    headerAlign?: Align
    type?: string
    reserveSelection?: boolean
  }
  type TableColumnList = Array<TableColumns>

  type Size = 'large' | 'default' | 'small'
  type Align = 'left' | 'center' | 'right'
  interface PaginationProps {
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
}
// 确保文件被视为模块,导出
export {}
