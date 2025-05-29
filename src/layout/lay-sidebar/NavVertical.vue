<!-- 垂直导航栏 -->
<template>
  <div
    v-loading="loading"
    :class="['sidebar-container', showLogo ? 'has-logo' : 'no-logo']"
    @mouseenter.prevent="isShow = true"
    @mouseleave.prevent="isShow = false"
  >
    <!-- 侧边栏的logo -->
    <LaySidebarLogo v-if="showLogo" :collapse="isCollapse" />
    <!-- 菜单 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        unique-opened
        mode="vertical"
        popper-class="pure-scrollbar"
        :collapse="!isCollapse"
        :collapse-transition="false"
        popper-effect="light"
        class="outer-most select-none"
        :default-active="defaultActive"
      >
        <SidebarItem
          v-for="routes in menuData"
          :key="routes.path"
          :item="routes"
          :base-path="routes.path"
          class="outer-most select-none"
        />
      </el-menu>
    </el-scrollbar>
    <!-- 导航栏中间展开折叠图标 -->
    <SidebarCenterCollapse
      v-if="isShow || isCollapse"
      :is-active="AppStore.sidebar.opened"
      @toggleClick="toggleSideBar"
    />
    <!-- 导航栏底部折叠展开图标 -->
    <SidebarLeftCollapse :isActive="AppStore.sidebar.opened" @toggleClick="toggleSideBar" />
  </div>
</template>

<script setup lang="ts">
import LaySidebarLogo from './components/SidebarLogo.vue'
import SidebarItem from './components/SidebarItem.vue'
import { useNav } from '../hooks/useNav'
import { computed, ref, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { isEmpty } from 'element-plus/es/utils/types.mjs'
import { usePermissionStore } from '@/store/modules/permission'
import ReactiveStorage from '@/utils/ReactiveStorage'
import { responsiveStorageNameSpace } from '@/config'
import SidebarCenterCollapse from '../lay-sidebar/components/SidebarCenterCollapse.vue'
import SidebarLeftCollapse from '../lay-sidebar/components/SidebarLeftCollapse.vue'

const { isCollapse, toggleSideBar, AppStore, menuSelect } = useNav()
//调用useRoute函数得到当前路由信息并存储于route常量中
const route = useRoute()

const defaultActive = ref('')

const showLogo = ref(
  ReactiveStorage.getItem<StorageConfigs>(`${responsiveStorageNameSpace()}configure`)?.showLogo ?? true
)

const isShow = ref(false)

const menuData = computed(() => {
  console.log(usePermissionStore().wholeMenu)
  return usePermissionStore().wholeMenu
})

watch(
  () => [route.path, usePermissionStore().wholeMenu],
  () => {
    if (route.path.includes('/redirect')) return
    //添加动态标签
    menuSelect(route.path)
  },
  { deep: true }
)

const loading = computed(() => {
  menuData.value.length === 0 ? true : false
})

// 监听菜单数据变化
const stopWatcher = watch(loading, () => {
  nextTick(() => {
    // 确保菜单数据加载完成且DOM更新后再设置defaultActive
    defaultActive.value = !isEmpty(route.meta?.activePath) ? route.meta.activePath : route.path
  })
  // 停止监听
  stopWatcher()
})
</script>

<style scoped lang="scss">
/* 用 :deep() 作为深度作用选择器，它可以让样式穿透当前组件的作用域，影响到子组件的元素。 */

/* 使用 v-loading 指令时，会出现一个半透明的遮罩层来表示加载状态，这个遮罩层的类名就是 el-loading-mask。 */
:deep(.el-loading-mask) {
  opacity: 0.45;
}
</style>
