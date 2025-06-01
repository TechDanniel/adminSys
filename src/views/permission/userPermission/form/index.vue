<template>
  <el-form ref="ruleFormRef" :model="newFormInline" :rules="formRules" label-width="82px">
    <el-row :gutter="30">
      <el-col :value="12" :xs="24" :sm="24">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="newFormInline.username" clearable placeholder="请输入用户名" />
        </el-form-item>
      </el-col>
      <el-col :value="12" :xs="24" :sm="24">
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="newFormInline.phone" clearable placeholder="请输入手机号码" />
        </el-form-item>
      </el-col>

      <el-col :value="12" :xs="24" :sm="24">
        <el-form-item label="归属部门">
          <el-cascader
            v-model="newFormInline.parentId"
            class="w-full"
            :options="newFormInline.higherDeptOptions"
            :props="{
              value: 'id',
              label: 'name',
              emitPath: false,
              checkStrictly: true
            }"
            clearable
            filterable
            placeholder="请选择归属部门"
          >
            <template #default="{ node, data }">
              <span>{{ data.name }}</span>
              <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
            </template>
          </el-cascader>
        </el-form-item>
      </el-col>

      <el-col v-if="newFormInline.title === '新增'" :value="12" :xs="24" :sm="24"> </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formRules } from '../rule.ts'

const props = defineProps({
  formInline: () => ({
    title: '新增',
    username: '',
    phone: '',
    deptname: '',
    role: '',
    parentId: 0,
    higherDeptOptions: []
  })
})

const newFormInline = ref(props.formInline)

const ruleFormRef = ref()
function getRef() {
  return ruleFormRef.value
}

defineExpose({ getRef })
</script>
