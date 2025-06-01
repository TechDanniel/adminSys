<template>
  <!-- 遍历缓存组件列表，渲染当前激活的组件 -->
  <template v-for="[fullPath, Comp] in compList" :key="fullPath">
    <div v-show="fullPath === currRoute.fullPath" class="w-full h-full">
      <slot :fullPath="fullPath" :Comp="Comp"></slot>
    </div>
  </template>
  <!-- 当组件不需要缓存，渲染normalComp -->
  <div v-show="!keep" class="w-full h-full">
    <slot :Comp="props.currComp" :fullPath="currRoute.fullPath"></slot>
  </div>
</template>

<script setup lang="ts">
import { getConfig } from '@/config'
import { useMultiTagsStore } from '@/store/modules/multiTags'
import { onMounted, watch } from 'vue'
import { Component, computed, shallowRef } from 'vue'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { useMultiFrame } from '../hooks/useMultiFrames'

// RouteLocationNormalizedLoaded 代表的是已经加载完毕的标准化路由位置对象。
// 标准化意味着路由对象里的路径、参数、查询字符串等都已经经过了处理和规范化
const props = defineProps<{
  currRoute: RouteLocationNormalizedLoaded
  currComp: Component
}>()

onMounted(() => {
  console.log('frame挂载成功', props)
})

//compList 存储了之前访问过且需要缓存的路由组件信息
const compList = shallowRef([])

//判断该路由是否需要缓存
const keep = computed(() => {
  return getConfig().KeepAlive && props.currRoute.meta?.keepAlive
})

const { MAP, setMap, getMap, delMap } = useMultiFrame()
//监听本地存储的标签页，如果小于MAP，说明做了关闭动作，更新MAP和compList的值
watch(useMultiTagsStore().multiTags, (tags: any) => {
  if (!Array.isArray(tags) || !keep.value) {
    return
  }
  if (tags.length < MAP.size) {
    for (const i of MAP.keys()) {
      if (!tags.some(s => s.path === i)) {
        delMap(i)
        compList.value = getMap()
      }
    }
  }
})

//监听当前路由，如果当前路由需要缓存则加入MAP,更新compList的值
watch(
  () => props.currRoute.fullPath,
  (path: string) => {
    const multiTags = useMultiTagsStore().multiTags
    if (keep.value) {
      if (multiTags.length !== MAP.size) {
        const sameKey = [...MAP.keys()].find(i => path === i)
        if (!sameKey) {
          setMap(path, props.currComp)
        }
      }
    }
    if (MAP.size > 0) {
      compList.value = getMap()
    }
  },
  {
    immediate: true
  }
)
</script>
