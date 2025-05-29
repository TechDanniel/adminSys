// 管理应用程序的全局设置，包括标题、头部固定状态和侧边栏隐藏状态
import { getConfig } from '@/config'
import { setType } from '../types'
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
  state: (): setType => ({
    title: getConfig().Title,
    fixedHeader: getConfig().FixedHeader,
    hiddenSideBar: getConfig().HiddenSideBar
  }),
  getters: {
    getTitle(state) {
      return state.title
    },
    getFixedHeader(state) {
      return state.fixedHeader
    },
    getHiddenSideBar(state) {
      return state.hiddenSideBar
    }
  },
  actions: {
    //修改设置
    CHANGE_SETTING({ key, value }) {
      // Reflect.has 方法用于检查一个对象是否具有某个属性
      if (Reflect.has(this, key)) {
        this[key] = value
      }
    }
  }
})
