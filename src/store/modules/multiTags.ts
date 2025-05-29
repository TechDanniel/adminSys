import { responsiveStorageNameSpace } from '@/config'
import ReactiveStorage from '@/utils/ReactiveStorage'
import { defineStore } from 'pinia'
import { usePermissionStore } from './permission'
import { multiType, positionType } from '../types'
import { isBoolean, isNumber } from 'element-plus/es/utils/types.mjs'
import { isEqual } from 'lodash'
import { getConfig } from '@/config'

export const useMultiTagsStore = defineStore('multiTags', {
  state: () => ({
    //存储标签页信息（路由信息）,默认值是fixedTag 且值为真的路由信息
    multiTags: ReactiveStorage.getItem<StorageConfigs>(`${responsiveStorageNameSpace()}configure`)?.multiTagsCache
      ? ReactiveStorage.getItem<StorageConfigs>(`${responsiveStorageNameSpace()}tags`)
      : ([...usePermissionStore().flatteningRoutes.filter(v => v?.meta?.fixedTag)] as any),

    //是否存在标签页缓存信息
    multiTagsCache: ReactiveStorage.getItem<StorageConfigs>(`${responsiveStorageNameSpace()}configure`)?.multiTagsCache
  }),
  getters: {
    getMultiTagsCache(state) {
      return state.multiTagsCache
    }
  },
  actions: {
    // 根据传入的布尔值 multiTagsCache 来更新组件（或存储）中的 multiTagsCache 状态
    multiTagsCacheChange(multiTagsCache: boolean) {
      this.multiTagsCache = multiTagsCache
      if (multiTagsCache) {
        //multiTagsCache为真，说明需要缓存标签页信息，更新标签页缓存
        ReactiveStorage.setItem<StorageConfigs>(`${responsiveStorageNameSpace()}tags`, this.multiTags)
      } else {
        ReactiveStorage.removeItem(`${responsiveStorageNameSpace()}tags`)
      }
    },
    //根据传入标签页信息更新仓库的multiTags
    tagsCache(multiTags) {
      this.getMultiTagsCache && ReactiveStorage.setItem(`${responsiveStorageNameSpace()}tags`, multiTags)
    },

    //对标签列表的操作
    handleTags<T>(mode: string, value?: T | multiType, position?: positionType): T {
      switch (mode) {
        //将value作为当前标签页列表,并更新仓库存储
        case 'equal':
          this.multiTags = value
          this.tagsCache(this.multiTags)
          break
        //根据标签信息判断该标签是否能够加入标签页列表
        case 'push':
          const tagVal = value as multiType
          //不添加到标签页
          if (tagVal?.meta?.hiddenTag) return
          //如果title为空拒绝添加到标签页
          if (tagVal?.meta?.title.length === 0) return
          //showLink为false拒绝添加到标签页
          if (isBoolean(tagVal?.meta?.showLink) && !tagVal?.meta?.showLink) return
          const tagPath = tagVal.path
          //判断tag是否已存在
          const tagHasExist = this.multiTags.some(tag => {
            return tag.path === tagPath
          })

          // 判断tag中的query键值是否相等
          const tagQueryHasExits = this.multiTags.some(tag => {
            return isEqual(tag?.query, tagVal?.query)
          })
          // 判断tag中的params键值是否相等
          const tagParamsHasExits = this.multiTags.some(tag => {
            return isEqual(tag?.params, tagVal?.params)
          })

          if (tagHasExist && tagQueryHasExits && tagParamsHasExits) return

          //动态路由可打开的最大数量（path相同，参数不同的路由）
          const dynamicLevel = tagVal?.meta?.dynamicLevel ?? -1
          if (dynamicLevel > 0) {
            //如果当前打开的动态路由数超过了dynamicLevel，替换掉第一个
            if (this.multiTags.filter(tag => tag.path === tagPath).length >= dynamicLevel) {
              const index = this.multiTags.findIndex(item => item?.path === tagPath)
              index !== -1 && this.multiTags.splice(index, 1)
            }
          }
          //将该路由加入标签页
          this.multiTags.push(value)
          //更新浏览器缓存
          this.tagsCache(this.multiTags)

          //动态路由最大打开数量如果超出了系统配置项config中的MaxTagsLevel就删除第二个路由（因为第一个是首页）
          if (getConfig()?.MaxTagsLevel && isNumber(getConfig().MaxTagsLevel)) {
            if (this.multiTags.length > getConfig().MaxTagsLevel) {
              this.multiTags.splice(1, 1)
            }
          }
          break
        // 从 this.multiTags 数组（用于存储标签页信息）中移除特定的标签页
        case 'splice':
          //没有传position，那value传的肯定是路径值，删除这个值的缓存
          if (!position) {
            const index = this.multiTags.findIndex(v => v.path === value)
            if (index === -1) return
            this.multiTags.splice(index, 1)
          } else {
            this.multiTags.splice(position?.startIndex, position?.length)
          }
          this.tagsCache(this.multiTags)
          return this.multiTags
        //返回最后一项路由（slice跟splice不一样，不改变原数组）
        case 'slice':
          return this.multiTags.slice(-1)
      }
    }
  }
})
