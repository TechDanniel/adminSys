// 定义图标类型，身上有哪些其他属性(没被props接受的，除icon属性外)
export interface iconType {
  //改变垂直对齐方式
  inline?: boolean
  width?: string
  height?: string
  //水平翻转
  horizontalFlip?: boolean
  //垂直翻转
  verticalFlip?: boolean
  //定义水平，垂直翻转
  flip?: string
  rotate?: number | string
  color?: string
  //是否水平对齐，默认为 false
  horizontalAlign?: boolean
  verticalAlign?: boolean
  align?: string
  //图标数据加载完成后的回调函数
  onload?: Function
  // SVG 相关属性
  // SVG 填充颜色，如 'blue' 或 '#0000ff'
  fill?: string
  // 所有图标通用的样式对象，用于设置额外的 CSS 样式
  //Record定义对象类型
  style?: Record<string, string | number>
}
