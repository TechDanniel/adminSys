<template>
    <el-form
      ref="ruleFormRef"
      :model="newFormInline"
      :rules="formRules"
      label-width="82px"
    >
      <el-row :gutter="30">
        <el-col :value="12" :xs="24" :sm="24">
          <el-form-item label="用户昵称" prop="nickname">
            <el-input
              v-model="newFormInline.nickname"
              clearable
              placeholder="请输入用户昵称"
            />
          </el-form-item>
        </el-col>
        <el-col :value="12" :xs="24" :sm="24">
          <el-form-item label="用户名称" prop="username">
            <el-input
              v-model="newFormInline.username"
              clearable
              placeholder="请输入用户名称"
            />
          </el-form-item>
        </el-col>
  
        <el-col
          v-if="newFormInline.title === '新增'"
          :value="12"
          :xs="24"
          :sm="24"
        >
          <el-form-item label="用户密码" prop="password">
            <el-input
              v-model="newFormInline.password"
              clearable
              placeholder="请输入用户密码"
            />
          </el-form-item>
        </el-col>
        <el-col :value="12" :xs="24" :sm="24">
          <el-form-item label="手机号" prop="phone">
            <el-input
              v-model="newFormInline.phone"
              clearable
              placeholder="请输入手机号"
            />
          </el-form-item>
        </el-col>
  
        <el-col :value="12" :xs="24" :sm="24">
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="newFormInline.email"
              clearable
              placeholder="请输入邮箱"
            />
          </el-form-item>
        </el-col>
        <el-col :value="12" :xs="24" :sm="24">
          <el-form-item label="用户性别">
            <el-select
              v-model="newFormInline.sex"
              placeholder="请选择用户性别"
              class="w-full"
              clearable
            >
              <el-option
                v-for="(item, index) in sexOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
        <el-col
          v-if="newFormInline.title === '新增'"
          :value="12"
          :xs="24"
          :sm="24"
        >
        </el-col>
  
        <el-col>
          <el-form-item label="备注">
            <el-input
              v-model="newFormInline.remark"
              placeholder="请输入备注信息"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
</template>

<script setup lang="ts">
import { FormProps } from "../utils/type"
import { ref } from "vue";
import { formRules } from "../utils/rule";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    title: "新增",
    higherDeptOptions: [],
    parentId: 0,
    nickname: "",
    username: "",
    password: "",
    phone: "",
    email: "",
    sex: "",
    status: 1,
    remark: ""
  })
});
const sexOptions = [
  {
    value: 0,
    label: "男"
  },
  {
    value: 1,
    label: "女"
  }
];
const newFormInline = ref(props.formInline);

const ruleFormRef = ref();
function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>