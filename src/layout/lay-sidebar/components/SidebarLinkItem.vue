<!-- 渲染菜单项，给他添加router-link -->
<template>
    <component :is="'router-link'" v-bind="getLinkProps(to)">
        <slot></slot>
    </component>
</template>

<script setup lang="ts">
import { menuType } from '@/layout/types';
defineProps<{to:menuType}>()
const getLinkProps=(item:menuType)=>{
    return{
        to:item
    }
}
</script>