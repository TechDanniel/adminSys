<template>
  <div class="Wallfall-container" ref="containerRef" @scroll="handleScroll">
    <div class="list" :style="listStyle">
      <div class="item" v-if="isShow" v-for="{ item, style, imageHeight } in renderList" :style="style" :key="item.id">
        <slot name="item" :item="item" :imageHeight="imageHeight"></slot>
      </div>
      <!--临时存储要添加的卡片，用来获取鼎泰卡片的高度-->
      <div id="temporary-list" v-else>
        <div v-for="{ item, style, imageHeight } in temporaryList" :style="style">
          <slot name="item" :item="item" :imageHeight="imageHeight"></slot>
        </div>
      </div>
    </div>
  </div>
  <el-backtop title="回到顶部" :right="35" :bottom="50" :visibility-height="300" target=".Wallfall-container">
    <backTop />
  </el-backtop>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch, nextTick } from 'vue'
import { WaterfallProps, columnQueue, RenderItem, dataState, CardItem, ItemRect } from './util'
import { throttle } from '@/utils/rafThrottle'
import { debounce } from '@/utils/debounce'
import backTop from '@/assets/svg/back_top.svg?component'

const props = defineProps<WaterfallProps>()
const containerRef = ref<HTMLDivElement | null>(null)
const scrollState = reactive({
  viewWidth: 0,
  viewHeight: 0,
  start: 0
})
const end = computed(() => scrollState.viewHeight + scrollState.start)

//临时存储要添加的卡片
const temporaryList = ref<RenderItem[]>([])
const isShow = ref(false)

//瀑布流的二维抽象数据结构
const renderState = reactive({
  queue: Array(props.column)
    .fill(0)
    .map<columnQueue>(() => ({ list: [], height: 0 })),
  len: 0 //存储当前视图上展示的所有卡片数量
})

//拿到最大高度列的高度，计算list的height样式
const computedHeight = computed(() => {
  let minIndex = 0,
    minHeight = Infinity,
    maxHeight = -Infinity
  renderState.queue.forEach(({ height }, index) => {
    if (height < minHeight) {
      minHeight = height
      minIndex = index
    }
    if (height > maxHeight) {
      maxHeight = height
    }
  })
  return {
    minIndex,
    minHeight,
    maxHeight
  }
})
const listStyle = computed(() => ({
  height: `${computedHeight.value.maxHeight}px`
}))

//通过这比较区分滚动时请求数据还是在原有数据上添加到队列中
const hasMoreData = computed(() => renderState.len < dataState.list.length)

//计算renderList，renderList里的内容是 RenderItem
//renderState是二维的，最终要转换成一个一维的renderList列表渲染到视图上
//renderState扁平化
const cardList = computed(() => renderState.queue.reduce<RenderItem[]>((pre, { list }) => pre.concat(list), []))
const renderList = computed(() => {
  return cardList.value.filter(item => item.h + item.y > scrollState.start && item.y < end.value)
})

//计算出一个cardItem将它添加到对应的队列中
const addInQueue = (size: number) => {
  for (let i = 0; i < size; i++) {
    const minIndex = computedHeight.value.minIndex
    const currentColumn = renderState.queue[minIndex]
    const before = currentColumn.list[currentColumn.list.length - 1] || null
    const dataItem = dataState.list[renderState.len] || null
    //计算item的渲染信息
    if (dataItem) {
      const item = generatorItem(dataItem, before, minIndex)
      currentColumn.list.push(item)
      currentColumn.height = item.y
      renderState.len++
    }
  }
  console.log(renderState)
}

const generatorItem = (item: CardItem, before: RenderItem | null, index: number): RenderItem => {
  const rect = itemSizeInfo.value.get(item.id)
  const width = rect!.width
  const height = rect!.height
  let y = 0
  if (before !== null) {
    y = before.y + before.h + props.gap
  }

  return {
    item,
    y,
    h: height,
    imageHeight: rect!.imageHeight,
    style: {
      width: `${width}px`,
      height: `${height}px`,
      transform: `translate3d(${index === 0 ? 0 : (width + props.gap) * index}px,${y}px,0)`
    }
  }
}

//存储卡片的尺寸信息
const itemSizeInfo = ref(new Map<CardItem['id'], ItemRect>())
//初始化itemSizeInfo
const setItemSize = () => {
  itemSizeInfo.value = dataState.list.reduce<Map<CardItem['id'], ItemRect>>((pre, current) => {
    const itemWidth = Math.floor((scrollState.viewWidth - props.gap * (props.column - 1)) / props.column)
    // 如果 itemSizeInfo 里已经存在值，使用存在的高度，而不是重置为 0
    const rect = itemSizeInfo.value.get(current.id)
    pre.set(current.id, {
      width: itemWidth,
      height: rect ? rect.height : 0,
      imageHeight: Math.floor((itemWidth * current.height) / current.width)
    })
    return pre
  }, new Map())
}

//挂载临时卡片，并获取真实的卡片高度（加上小红书文字后）
const mountTemporaryList = (size = props.enterSize) => {
  //判断当前队列是否已满，不再额外添加
  if (!hasMoreData.value) return
  isShow.value = false
  for (let i = 0; i < size!; i++) {
    const item = dataState.list[renderState.len + i]
    if (!item) break
    const rect = itemSizeInfo.value.get(item.id)!
    //临时的卡片用于估计真实高度
    temporaryList.value.push({
      item,
      y: 0,
      h: 0,
      imageHeight: rect.imageHeight,
      style: {
        width: `${rect.width}px`
      }
    })
  }
  nextTick(() => {
    const Templist = document.querySelector('#temporary-list')!
    const childrenArray = Array.from(Templist.children)
    childrenArray.forEach((item, index) => {
      const rect = item.getBoundingClientRect()
      temporaryList.value[index].h = rect.height
    })
    updateItemSize()
    isShow.value = true
    //获取到真实高度后，计算瀑布流布局
    addInQueue(temporaryList.value.length)
    // 注意每次结束之后都需要清空，方便滚动加载更多数据添加
    temporaryList.value = []
  })
}

const updateItemSize = () => {
  temporaryList.value.forEach(({ item, h }) => {
    const rect = itemSizeInfo.value.get(item.id)!
    itemSizeInfo.value.set(item.id, { ...rect, height: h })
  })
}

//初始化渲染操作
const initScrollState = async () => {
  scrollState.viewWidth = containerRef.value!.clientWidth
  scrollState.viewHeight = containerRef.value!.clientHeight
  scrollState.start = containerRef.value!.scrollTop
}

const init = async () => {
  initScrollState()
  const list = await loadDataList()
  setItemSize()
  //初始化时入队size与pageSize一致
  list && mountTemporaryList(list.length)
}

//获取数据
const loadDataList = async () => {
  if (dataState.isFinish) {
    return
  }
  dataState.loading = true
  const list = await props.request(dataState.currentPage++, props.pageSize)
  if (!list.length) {
    dataState.isFinish = true
    return
  }
  dataState.list.push(...list)
  dataState.loading = false
  return list
}

//滚动事件将start设置为scrollTop的值，其次考虑触底加载处理
const handleScroll = throttle(() => {
  const { scrollTop, clientHeight } = containerRef.value!
  scrollState.start = scrollTop
  if (!dataState.loading && !hasMoreData.value) {
    loadDataList().then(list => {
      list && setItemSize()
      list && mountTemporaryList()
    })
  }
  if (scrollTop + clientHeight > computedHeight.value.minHeight) {
    mountTemporaryList()
  }
}, 1000)

//实现响应式效果
const reComputedQueue = () => {
  //清空renderState所有卡片
  renderState.queue = Array(props.column)
    .fill(0)
    .map<columnQueue>(() => ({ list: [], height: 0 }))
  renderState.len = 0
  setItemSize()
  mountTemporaryList(props.pageSize)
}

//对于视口改变我们执行resize事件并添加防抖
const handleResize = debounce(() => {
  initScrollState()
  reComputedQueue()
}, 300)

const ContainerObserver = new ResizeObserver(() => {
  handleResize()
})
onMounted(async () => {
  init()
  ContainerObserver.observe(containerRef.value!)
})

onBeforeUnmount(() => {
  ContainerObserver.unobserve(containerRef.value)
})

watch(
  () => props.column,
  () => {
    handleResize()
  }
)
</script>

<style scoped>
.Wallfall-container {
  width: 100%;
  height: 500px;
  overflow: hidden scroll;
}

.list {
  position: relative;
  width: 100%;
}

.item {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
}
</style>
