<template>
  <div
    v-tippy="{
      content: isActive ? '展开菜单' : '收起菜单',
      theme: 'light',
      hideOnClick: 'toggle',
      placement: 'right'
    }"
    class="center-collapse"
    @click="toggleClick"
  >
    <IconifyIconOffline
      :icon="ArrowLeft"
      :class="[iconClass]"
      :style="{ transform: isActive ? 'none' : 'rotateY(180deg)' }"
    />
  </div>
</template>

<script lang="ts" setup>
import { IconifyIconOffline } from '@/components/ReIcon'
import ArrowLeft from '@iconify-icons/ri/arrow-left-double-fill'
import { computed } from 'vue'

interface Props {
  isActive: boolean
}
withDefaults(defineProps<Props>(), { isActive: false })

const iconClass = computed(() => {
  return ['w-[16px]', 'h-[16px]']
})

const emit = defineEmits<{
  (e: 'toggleClick'): void
}>()

const toggleClick = () => {
  emit('toggleClick')
}
</script>

<style lang="scss" scoped>
.center-collapse {
  position: absolute;
  top: 50%;
  right: 2px;
  z-index: 1002;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 34px;
  cursor: pointer;
  background: var(--el-bg-color);
  border: 1px solid var(--pure-border-color);
  border-radius: 4px;
  transform: translate(12px, -50%);
}
</style>
