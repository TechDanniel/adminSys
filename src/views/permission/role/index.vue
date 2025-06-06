<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto"
    >
      <el-form-item label="角色名称：" prop="name">
        <el-input v-model="form.name" placeholder="请输入角色名称" clearable class="!w-[180px]" />
      </el-form-item>
      <el-form-item label="角色标识：" prop="code">
        <el-input v-model="form.code" placeholder="请输入角色标识" clearable class="!w-[180px]" />
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-select v-model="form.status" placeholder="请选择状态" clearable class="!w-[180px]">
          <el-option label="已启用" value="1" />
          <el-option label="已停用" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="useRenderIcon('ri:search-line')" :loading="loading" @click="onSearch">
          搜索
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)"> 重置 </el-button>
      </el-form-item>
    </el-form>

    <div ref="contentRef" :class="['flex']">
      <ReTable
        :class="[isShow ? '!w-[60vw]' : 'w-full']"
        style="transition: width 220ms cubic-bezier(0.4, 0, 0.2, 1)"
        title="角色管理（仅演示，操作后不生效）"
        :columns="columns"
        @refresh="onSearch"
      >
        <template #buttons>
          <el-button type="primary" :icon="useRenderIcon(AddFill)" @click="openDialog()"> 新增角色 </el-button>
        </template>
        <template v-slot="{ size, dynamicColumns }">
          <el-table
            ref="tableRef"
            table-layout="auto"
            :loading="loading"
            :size="size"
            :row-style="rowStyle"
            :data="dataList"
            :header-cell-style="{
              background: 'var(--el-fill-color-light)',
              color: 'var(--el-text-color-primary)'
            }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              v-for="col in dynamicColumns"
              :key="col.prop"
              :label="col.label"
              :prop="col.prop"
              align="center"
            >
              <template #default="scope" v-if="col.prop === 'status'">
                <el-switch
                  :size="scope.row.size === 'small' ? 'small' : 'default'"
                  :loading="switchLoadMap[scope.$index]?.loading"
                  v-model="scope.row.status"
                  :active-value="1"
                  :inactive-value="0"
                  active-text="启用"
                  inactive-text="停用"
                  inline-prompt
                  :style="switchStyle"
                  @change="onChange(scope)"
                />
              </template>
              <template #default="{ row }" v-else></template>
            </el-table-column>
            <el-table-column fixed="right" label="Operations" min-width="800">
              <template #default="{ row }">
                <el-button
                  class="reset-margin"
                  link
                  type="primary"
                  :size="size"
                  :icon="useRenderIcon(EditPen)"
                  @click="openDialog('修改', row)"
                >
                  修改
                </el-button>
                <el-popconfirm :title="`是否确认删除角色名称为${row.name}的这条数据`" @confirm="handleDelete(row)">
                  <template #reference>
                    <el-button class="reset-margin" link type="primary" :size="size" :icon="useRenderIcon(Delete)">
                      删除
                    </el-button>
                  </template>
                </el-popconfirm>
                <el-button
                  class="reset-margin"
                  link
                  type="primary"
                  :size="size"
                  :icon="useRenderIcon(Menu)"
                  @click="handleMenu(row)"
                >
                  权限
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </ReTable>
      <!-- 权限弹框 -->
      <div v-if="isShow" class="!min-w-[calc(100vw-60vw-268px)] w-full mt-2 px-2 pb-2 bg-bg_color ml-2 overflow-auto">
        <div class="flex justify-between w-full px-3 pt-5 pb-4">
          <div class="flex">
            <span :class="iconClass">
              <IconifyIconOffline
                v-tippy="{
                  content: '关闭'
                }"
                class="dark:text-white"
                width="18px"
                height="18px"
                :icon="Close"
                @click="handleMenu"
              />
            </span>
            <span :class="[iconClass, 'ml-2']">
              <IconifyIconOffline
                v-tippy="{
                  content: '保存菜单权限'
                }"
                class="dark:text-white"
                width="18px"
                height="18px"
                :icon="Check"
                @click="handleSave"
              />
            </span>
          </div>
          <p class="font-bold truncate">
            菜单权限
            {{ `${curRow?.name ? `（${curRow.name}）` : ''}` }}
          </p>
        </div>
        <el-input
          v-model="treeSearchValue"
          placeholder="请输入菜单进行搜索"
          class="mb-1"
          clearable
          @input="onQueryChanged"
        />
        <div class="flex flex-wrap">
          <el-checkbox v-model="isSelectAll" label="全选/全不选" />
        </div>
        <el-tree
          ref="treeRef"
          :show-checkbox="true"
          :data="treeData"
          :props="treeProps"
          node-key="id"
          :filter-node-method="filterMethod"
        >
          <template #default="{ node }">
            <span>{{ node.label }}</span>
          </template>
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRole } from './utils/hook'
import { useRenderIcon } from '@/components/ReIcon/src/hooks'
import { computed, ref } from 'vue'
import ReTable from '@/components/ReTable/index.vue'
import { IconifyIconOffline } from '@/components/ReIcon'

import Delete from '@iconify-icons/ep/delete'
import EditPen from '@iconify-icons/ep/edit-pen'
import Refresh from '@iconify-icons/ep/refresh'
import Menu from '@iconify-icons/ep/menu'
import AddFill from '@iconify-icons/ri/add-circle-line'
import Close from '@iconify-icons/ep/close'
import Check from '@iconify-icons/ep/check'

//菜单权限选择树控件
const treeRef = ref()
const {
  form,
  columns,
  loading,
  onSearch,
  resetForm,
  isShow,
  dataList,
  openDialog,
  rowStyle,
  handleSelectionChange,
  handleDelete,
  handleMenu,
  curRow,
  handleSave,
  treeSearchValue,
  onQueryChanged,
  isSelectAll,
  filterMethod,
  treeData,
  treeProps,
  switchLoadMap,
  switchStyle,
  onChange
} = useRole(treeRef)

//表单
const formRef = ref()
const iconClass = computed(() => {
  return [
    'w-[22px]',
    'h-[22px]',
    'flex',
    'justify-center',
    'items-center',
    'outline-none',
    'rounded-[4px]',
    'cursor-pointer',
    'transition-colors',
    'hover:bg-[#0000000f]',
    'dark:hover:bg-[#ffffff1f]',
    'dark:hover:text-[#ffffffd9]'
  ]
})
</script>
