<template>
  <div :class="['flex', 'justify-between']">
    <tree
        ref="treeRef"
        :class="['mr-2', 'min-w-[200px]']"
        :treeData="treeData"
        :treeLoading="treeLoading"
        @tree-select="onTreeSelect"
    />
    <div
      :class=" ['w-[calc(100%-200px)]']"
    >
      <!-- 搜索表单 -->
      <el-form
        ref="formRef"
        :inline="true"
        :model="form"
        class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto"
      >
        <el-form-item label="用户名称：" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名称"
            clearable
            class="!w-[180px]"
          />
        </el-form-item>
        <el-form-item label="手机号码：" prop="phone">
          <el-input
            v-model="form.phone"
            placeholder="请输入手机号码"
            clearable
            class="!w-[180px]"
          />
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-select
            v-model="form.status"
            placeholder="请选择"
            clearable
            class="!w-[180px]"
          >
            <el-option label="已开启" value="1" />
            <el-option label="已关闭" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :icon="useRenderIcon('ri:search-line')"
            :loading="loading"
            @click="onSearch"
          >
            搜索
          </el-button>
          <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
            重置
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
       <ReTable title="用户管理" :columns="columns" @refresh="onSearch">
          <template #buttons>
            <el-button type="primary" :icon="useRenderIcon(AddFill)" @click="openDialog()">
              新增用户
            </el-button>
          </template>
          <template v-slot="{ size , dynamicColumns }">
            <div v-if="selectedNum>0" v-motion-fade class="bg-[var(--el-fill-color-light)] w-full h-[46px] mb-2 pl-4 flex items-center">
              <div class="flex-auto">
                <span
                style="font-size: var(--el-font-size-base)"
                class="text-[rgba(42,46,54,0.5)] dark:text-[rgba(220,220,242,0.5)]"
                >
                  已选 {{ selectedNum }} 项
                </span>
                <el-button type="primary" text @click="onSelectionCancel">
                  取消选择
                </el-button>
                <el-popconfirm title="是否确认删除?" @confirm="onbatchDel">
                  <template #reference>
                    <el-button type="danger" text class="mr-1">
                      批量删除
                    </el-button>
                  </template>
                </el-popconfirm>
              </div>
            </div>
            <el-table 
            :data="dataList" 
            height="250" 
            style="width: 100%" 
            @selection-change="handleSelectionChange" 
            ref="tableRef">
              <el-table-column
                v-for="column in  dynamicColumns" 
                :key="column.prop" 
                :prop="column.prop" 
                :label="column.label" 
                :type="column.type"
                align="center"
                :formatter="column.formatter"
              >
               <!-- 对于图像列，使用作用域插槽进行自定义渲染 -->
              <template v-if="column.prop === 'avatar'" #default="scope">
                <img :src="scope.row[column.prop]" alt="图像" style="width: 30px; height: 30px; border-radius: 25px;">
              </template>
              <template v-else-if="column.type==='selection'" #default></template>
              <template v-else-if="column.prop==='phone'" #default></template>
              <!-- 对于其他普通列，正常显示数据 -->
              <template v-else #default="scope">
                <!-- 处理嵌套属性，如 dept.name -->
                {{ getNestedValue(scope.row, column.prop) }}
              </template>
              </el-table-column>
              <el-table-column fixed="right" label="Operations" min-width="120">
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
                  <el-popconfirm
                    :title="`是否确认删除用户编号为${row.id}的这条数据`"
                    @confirm="handleDelete(row)"
                  >
                    <template #reference>
                      <el-button
                      class="reset-margin"
                      link
                      type="primary"
                      :size="size"
                      :icon="useRenderIcon(Delete)"
                      >
                        删除
                      </el-button>
                    </template>
                  </el-popconfirm>
                  <el-dropdown>
                    <el-button
                      class="ml-3 mt-[2px]"
                      link
                      type="primary"
                      :size="size"
                      :icon="useRenderIcon(More)"
                      @click="handleUpdate(row)"
                    />
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item>
                          <el-button
                            :class="buttonClass"
                            link
                            type="primary"
                            :size="size"
                            :icon="useRenderIcon(Upload)"
                            @click="handleUpload(row)"
                          >
                            上传头像
                          </el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <el-button
                            :class="buttonClass"
                            link
                            type="primary"
                            :size="size"
                            :icon="useRenderIcon(Password)"
                            @click="handleReset(row)"
                          >
                            重置密码
                          </el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <el-button
                            :class="buttonClass"
                            link
                            type="primary"
                            :size="size"
                            :icon="useRenderIcon(Role)"
                            @click="handleRole(row)"
                          >
                            分配角色
                          </el-button>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
          </template>
       </ReTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref,onMounted} from "vue";
import Tree from "./tree.vue";
import { useUser } from "./utils/hook";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import ReTable from "@/components/ReTable/index.vue"
import { ElMessage } from "element-plus";

import Upload from "@iconify-icons/ri/upload-line";
import Role from "@iconify-icons/ri/admin-line";
import Password from "@iconify-icons/ri/lock-password-line";
import More from "@iconify-icons/ep/more-filled";
import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
    name: "SysetemUser"
})

//表单实例
const formRef = ref();
//树控件实例
const treeRef = ref();
const tableRef = ref();
const {
    treeData,
    treeLoading,
    onTreeSelect,
    getTreeData,
    form,
    onSearch,
    loading,
    resetForm,
    columns,
    selectedNum,
    dataList,
    openDialog,
    handleDelete,
    handleUpdate,
    handleUpload,
    handleReset,
    handleRole,
    buttonClass,
    handleSelectionChange
}=useUser(treeRef,tableRef)


//获取树组件的数据
onMounted(() => {
  getTreeData();
})

//辅助函数，用于获取嵌套函数的值
function getNestedValue(obj, path) {
  return path.split('.').reduce((acc,part)=>acc&&acc[part],obj)
}

/** 取消选择 */
function onSelectionCancel() {
    selectedNum.value = 0;
    // 用于多选表格，清空用户的选择
    tableRef.value.clearSelection();
}

/** 批量删除 */
function onbatchDel() {
  // 返回当前选中的行
  const curSelected = tableRef.value.getSelectionRows();
  console.log(curSelected)
  // 接下来根据实际业务，通过选中行的某项数据，比如下面的id，调用接口进行批量删除
  if(curSelected.length === 1)  ElMessage.success(`已删除用户编号为 ${curSelected[0].id} 的数据`);
  else ElMessage.success(`已删除用户编号为 ${curSelected.length} 的数据`);
  tableRef.value.clearSelection();
  onSearch();
}

// const getVisibleColumns = computed((dynamicColumns:Ref<any>) => {
//   return dynamicColumns.value.filter(column => !column.hide);
// });
</script>

<style lang="scss" scoped>
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

:deep(.el-button:focus-visible) {
  outline: none;
}

.main-content {
  margin: 24px 24px 0 !important;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>