<template>
    <div
        v-tippy="{
            content:isActive?
              '收起菜单':'展开菜单',
              theme:'light',
              hideOnclick:'toggle',
              placement:'right'
        }"
        class="left-collapse"
        @click="toggleClick"
    >
        <IconifyIconOffline
            :icon="MenuFold"
            :class="[iconClass]"
            :style="{ transform: isActive ?  'none':'rotateY(180deg)' }"
        />
    </div>
</template>

<script setup lang="ts">
import { IconifyIconOffline } from '@/components/ReIcon';
import { computed } from 'vue';
import MenuFold from "@iconify-icons/ri/menu-fold-fill";

const iconClass = computed(() => {
    return [
    "ml-4",
    "mb-1",
    "w-[16px]",
    "h-[16px]",
    "inline-block",
    "align-middle",
    "cursor-pointer",
    "duration-[100ms]"
  ];
});

interface Props {
  isActive: boolean;
}

withDefaults(defineProps<Props>(), {
  isActive: false
});

const emit = defineEmits<{
  (e: "toggleClick"): void;
}>();
const toggleClick=()=>{
    emit("toggleClick")
}
</script>

<style lang="scss" scoped>
.left-collapse {
  position: absolute;
  bottom: 0;
  padding-left: 10px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  box-shadow: 0 0 6px -3px var(--el-color-primary);
}
</style>