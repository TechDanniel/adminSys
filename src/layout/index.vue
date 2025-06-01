<template>
  <div ref="appWrapperRef" :class="['app-wrapper', set.classes]">
    <!-- 垂直导航栏 -->
    <NavVertical />
    <div :class="['main-container', useSettingStore().hiddenSideBar ? 'main-hidden' : '']">
      <!-- 固定头部-->
      <div v-if="set.fixedHeader">
        <LayHeader />
        <!-- 主体内容 -->
        <LayContent :fixed-header="set.fixedHeader" />
      </div>
      <el-scrollbar v-else>
        <el-backtop target=".main-container .el-scrollbar__wrap">
          <BackTopIcon />
        </el-backtop>
        <LayHeader />
        <LayContent :fixed-header="set.fixedHeader" />
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavVertical from './lay-sidebar/NavVertical.vue'
import { ref, reactive, computed, defineComponent, h, onMounted, getCurrentInstance } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { setType } from './types'
import { useSettingStore } from '@/store/modules/setting'
import BackTopIcon from '@/assets/svg/back_top.svg?component'
import LayContent from './lay-content/index.vue'
import LayNavbar from './lay-navbar/index.vue'
import LayTag from './LayTag/index.vue'

const appWrapperRef = ref()

onMounted(() => {
  console.log('layout挂载成功', getCurrentInstance())
})

// 集中管理和计算应用程序的一些全局设置和状态，包括侧边栏状态、固定头部状态、CSS 类名以及标签页隐藏状态。
const set: setType = reactive({
  sidebar: computed(() => {
    return useAppStore().sidebar
  }),
  fixedHeader: computed(() => {
    return useSettingStore().fixedHeader
  }),

  classes: computed(() => {
    return {
      hideSidebar: !set.sidebar.opened,
      openSidebar: set.sidebar.opened,
      withoutAnimation: set.sidebar.withoutAnimation
    }
  }),
  hideTabs: true
})

//定义头部
const LayHeader = defineComponent({
  name: 'LayHeader',
  render() {
    return h(
      'div',
      {
        class: { 'fixed-header': set.fixedHeader },
        style: ['box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08)']
      },
      {
        default: () => [h(LayNavbar), h(LayTag)]
      }
    )
  }
})
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  &::after {
    clear: both;
    display: table;
    content: '';
  }

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.re-screen {
  margin-top: 12px;
}
</style>
