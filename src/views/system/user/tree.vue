<template>
    <div
        v-loading="treeLoading"
        class="h-full bg-bg_color overflow-hidden relative"
        :style="{ minHeight: `calc(100vh - 141px)` }"
    >
        <div class="flex items-center h-[34px]">
            <!-- 搜索框 -->
            <el-input
                v-model="searchValue"
                class="ml-2"
                size="small"
                placeholder="请输入部门名称"
                clearable0
            >
                <template #suffix>
                    <el-icon class="el-input__icon">
                        <IconifyIconOffline
                        v-show="searchValue.length === 0"
                        icon="ri:search-line"
                        />
                    </el-icon>
                </template>
            </el-input>
        </div>
        <!-- 下拉列表 -->
        <el-scrollbar height="calc(90vh - 88px)">
            <el-tree
                ref="treeRef"
                :data="treeData"
                node-key="id"
                size="small"
                :props="defaultProps"
                default-expand-all
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
                @node-click="nodeClick"
            >
                <template #default="{ node, data }">
                    <div
                        :class="[
                        'rounded',
                        'flex',
                        'items-center',
                        'select-none',
                        'hover:text-primary',
                        searchValue.trim().length > 0 &&
                            node.label.includes(searchValue) &&
                            'text-red-500',
                        highlightMap[node.id]?.highlight ? 'dark:text-primary' : ''
                        ]"
                        :style="{
                        color: highlightMap[node.id]?.highlight
                            ? 'var(--el-color-primary)'
                            : '',
                        background: highlightMap[node.id]?.highlight
                            ? 'var(--el-color-primary-light-7)'
                            : 'transparent'
                        }"
                    >
                        <IconifyIconOffline
                        :icon="
                            data.type === 1
                            ? OfficeBuilding
                            : data.type === 2
                                ? LocationCompany
                                : Dept
                        "
                        />
                        <span class="!w-[120px] !truncate" :title="node.label">
                            {{ node.label }}
                        </span>
                    </div>
                </template>
            </el-tree>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { ref,watch } from "vue";

import OfficeBuilding from "@iconify-icons/ep/office-building";
import LocationCompany from "@iconify-icons/ep/add-location";
import Dept from "@iconify-icons/ri/git-branch-line";
import IconifyIconOffline from "@/components/ReIcon/src/inconifyIconOffline"

defineProps({
  treeLoading: Boolean,
  treeData: Array
});

const defaultProps = {
  children: "children",
  label: "name"
};
const searchValue = ref("");
const highlightMap = ref({});
// el-tree 组件的实例
const treeRef = ref();
// value是搜索框的值,data表示树组件中的一个节点数据
interface Tree {
  id: number;
  name: string;
  highlight?: boolean;
  children?: Tree[];
}
const filterNode = (value: string, data: Tree) => {
  if (!value) return true;
  return data.name.includes(value);
};
watch(searchValue, (val) => {
    // ! 是 TypeScript 中的非空断言操作符，用于告诉 TypeScript 编译器 treeRef.value 一定不为 null 或 undefined。
    treeRef.value!.filter(val)
})

const emit = defineEmits(["tree-select"]);
function nodeClick(value) {
    const nodeId=value.$treeNodeId
    //切换高亮
    highlightMap.value[nodeId]=highlightMap.value[nodeId]?.highlight?
    Object.assign({ id: nodeId }, highlightMap.value[nodeId], {
        highlight: false
    }):
    Object.assign({ id: nodeId }, highlightMap.value[nodeId], {
        highlight: true
    });
    emit("tree-select",
        highlightMap.value[nodeId]?.highlight?
        Object.assign({ ...value, selected: true }):
        Object.assign({ ...value, selected: false })
    )
}
</script>