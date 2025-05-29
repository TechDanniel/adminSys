// 用于管理菜单和缓存页面的状态
import { defineStore } from 'pinia'
import { constantMenus } from '@/router/index'
import { ascending, filterNoPermissionTree, formatFlatteningRoutes } from '@/router/utils'
import remaining from '@/router/modules/remaining'
import { cacheType } from '../types'
import { debounce } from '@/utils/debounce'
import { useMultiTagsStore } from './multiTags'

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    //静态路由生成的菜单
    constantMenus,
    //整体路由菜单,包括动态和静态
    wholeMenu: [],
    //整体路由(一维数组格式)
    flatteningRoutes: [],
    //缓存页面keepAlive,里面存的是名字name
    cachePageList: []
  }),
  actions: {
    /**组装整体路由生成的菜单 */
    // 传入的参数 routes 是一个数组，表示动态路由列表。这个数组包含了应用程序中需要动态添加的路由配置
    handleWholeMenu(routes: any[]) {
      //过滤掉无权限的菜单
      this.wholeMenu = filterNoPermissionTree(ascending(this.constantMenus.concat(routes)))
      console.log(this.wholeMenu)
      //整体路由(一维数组格式)
      this.flatteningRoutes = formatFlatteningRoutes(this.constantMenus.concat(routes, remaining))
    },

    // 其主要功能是根据传入的操作模式（mode）对缓存页面列表（this.cachePageList）进行不同的操作，例如刷新、添加或删除缓存页面
    cacheOperate({ mode, name }: cacheType) {
      const delIndex = this.cachePageList.findIndex(v => v === name)
      switch (mode) {
        // 通常用于更新缓存页面的状态。当你调用 refresh 操作时，可能是因为页面的数据或者状态发生了变化，需要重新加载或更新缓存。
        // 移除该页面只是刷新操作的第一步，后续可能会有重新添加该页面到缓存的逻辑，以保证缓存是最新的。
        case 'refresh':
          this.cachePageList = this.cachePageList.filter(v => v !== name)
          break
        case 'add':
          this.cachePageList.push(name)
          break
        case 'delete':
          this.cachePageList.splice(delIndex, 1)
          break
      }
      /** 监听缓存页面是否存在于标签页，不存在则删除 */
      debounce(() => {
        let cacheLength = this.cachePageList.length
        const arr = useMultiTagsStore().multiTags as Array<{ name: string }>
        const nameList = arr.map(v => v.name)
        while (cacheLength > 0) {
          console.log(this.cachePageList)
          nameList.findIndex(v => v === this.cachePageList[cacheLength - 1]) === -1 &&
            this.cachePageList.splice(cacheLength - 1, 1)
          cacheLength--
        }
      })()
    },

    /** 清空缓存页面 */
    //这里的缓存页面是标签页，动态路由的那些页面
    clearAllCachePage() {
      this.wholeMenus = []
      this.cachePageList = []
    }
  }
})
