import { CSSProperties, reactive } from 'vue'

//设置组件的props
export interface WaterfallProps {
  gap: number //卡片间隔
  column: number //瀑布流列数
  pageSize: number //单词请求的数据量
  request?: (page: number, pageSize: number) => Promise<CardItem[]> //数据请求的方法
  enterSize?: number //每次需要进入渲染队列的数量
}

export interface CardItem {
  id: number | string
  width: number
  height: number
  //索引签名，允许一个对象有任意数量的属性，并且这些属性的键为字符串类型，值为任意类型
  // 表明 ICardItem 类型的对象除了 id、width 和 height 这些已知属性之外，还能有其他任意名称的属性
  [key: string]: any
}

//定义组件内部状态
//数据源状态
export const dataState = reactive({
  loading: false, //发送请求loading状态
  isFinish: false, //请求数据是否已经结束
  currentPage: 1, //当前页数
  list: [] as CardItem[] //数据源
})

//瀑布流单独的数据状态，存储卡片的二维数组
//瀑布流的每一列包含了当前列高和当前列的所有卡片list
export interface columnQueue {
  list: RenderItem[]
  height: number
}

//渲染视图项
export interface RenderItem {
  item: CardItem //数据源
  y: number //卡片距离列表顶部的距离
  h: number //卡片自身的高度
  imageHeight: number //小红书卡片图片的高度
  style: CSSProperties //卡片的样式（宽高、偏移量）
}

//数据源映射到itemSizeInfo中卡片信息
export interface ItemRect {
  width: number
  height: number
  imageHeight: number
}
