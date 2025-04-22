<template>
    <!-- 如果该菜单没有子项显示为el-menu-item（辨别根路径/的情况） -->
    <SidebarLinkItem v-if="shouldShowSingleMenuItem" :to="ShowSingleMenuItem" >
        <el-menu-item :index="ShowSingleMenuItem.path" :class="{ 'submenu-title-noDropdown': !isNest }"
        :style="getNoDropdownStyle">
            <div v-if="ShowSingleMenuItem.meta.icon" class="sub-menu-icon" :style="getSubMenuIconStyle">
                <!-- 图标 -->
                <component :is="useRenderIcon(ShowSingleMenuItem.meta.icon)" />
            </div>
            
            <template #title>
                <div :style="getDivStyle">
                    <ReText :tippyProps="{
                        offset: [0, -10],
                        theme: 'light'
                    }" class="!w-full !text-inherit">
                        {{ ShowSingleMenuItem.meta.title }}
                    </ReText>
                </div>
            </template>
        </el-menu-item>
    </SidebarLinkItem>
    <!-- 有子项的菜单 -->
    <!-- 其作用是决定子菜单是否使用 teleport 功能将菜单内容传送到指定位置（通常是 body 元素）。开启该属性后，子菜单的内容会脱离原有的 DOM 结构，被移动到指定的目标位置 -->
    <el-sub-menu v-else ref="subMenu" teleported :index="item.path" v-bind="expandCloseIcon">
        <!-- 菜单的顶级项 -->
        <template #title>
            <div v-if="toRaw(item.meta.icon)" :style="getSubMenuIconStyle" class="sub-menu-icon">
                <component :is="useRenderIcon(item.meta && toRaw(item.meta.icon))" />
            </div>
            <ReText v-if="isCollapse"
            :tippyProps="{
                offset: [0, -10],
                theme: 'light'
            }" class="!w-full !text-inherit">
                {{ item.meta.title }}
            </ReText>
        </template>

        <!-- 渲染子项 -->
        <sidebar-item v-for="child in item.children" :key="child.path" :is-nest="true" :item="child"
            :base-path="resolvePath(child.path)" class="nest-menu" />
    </el-sub-menu>
</template>

<script setup lang="ts">
import SidebarLinkItem from "./SidebarLinkItem.vue";
import { PropType, ref, useAttrs, toRaw, computed } from "vue";
import { menuType } from "@/layout/types";
import { useNav } from "@/layout/hooks/useNav";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import ReText from "@/components/ReText/index.vue";
import { getConfig } from "@/config";

import ArrowUp from "@iconify-icons/ep/arrow-up-bold";
import EpArrowDown from "@iconify-icons/ep/arrow-down-bold";
import ArrowLeft from "@iconify-icons/ep/arrow-left-bold";
import ArrowRight from "@iconify-icons/ep/arrow-right-bold";

const { isCollapse, layout, getDivStyle } = useNav()
//接收传过来的菜单，是否嵌套,路径
const props = defineProps({
    item: {
        type: Object as PropType<menuType>
    },
    isNest: {
        type: Boolean,
        default: false
    },
    basePath: {
        type: String,
        default: ""
    }
})

// 判断是否应该显示单个菜单项
const shouldShowSingleMenuItem = computed(() => {
    const { item } = props;
    const isRootPath = item.path === '/';
    const hasNoChildren = !item.children || item.children.length === 0;
    return (isRootPath || hasNoChildren)
});
const ShowSingleMenuItem: menuType = computed(() => {
    const { item } = props;
    const isRootPath = item.path === '/';
    if (isRootPath) {
        return item.children[0]
    } else {
        return item
    }
})

const getNoDropdownStyle = ref({
    width: "100%",
    display: "flex",
    alignItems: "center"
})

const getSubMenuIconStyle = ref({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin:
        layout.value === "horizontal"
            ? "0 5px 0 0"
            : isCollapse.value
                ? "0 auto"
                : "0 5px 0 0"
})

// resolvePath 函数的主要功能是根据传入的路由路径和基础路径，判断是否为完整的 HTTP (S) 网址
// 如果是则直接返回存在的那个网址路径，否则使用 posix.resolve 方法将基础路径和路由路径解析为一个完整的路径并返回。
function resolvePath(routePath) {
    const httpReg = /^http(s?):\/\//
    if (httpReg.test(routePath) || httpReg.test(props.basePath)) {
        return routePath || props.basePath
    } else {
        return props.basePath + '/' + routePath
    }
}

const expandCloseIcon = computed(() => {
    if (!getConfig()?.MenuArrowIconNoTransition) return "";
    return {
        "expand-close-icon": useRenderIcon(EpArrowDown),
        "expand-open-icon": useRenderIcon(ArrowUp),
        "collapse-close-icon": useRenderIcon(ArrowRight),
        "collapse-open-icon": useRenderIcon(ArrowLeft)
    };
});
</script>