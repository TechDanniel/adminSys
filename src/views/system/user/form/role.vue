<template>
  <el-form :model="newFormInline">
    <el-row :gutter="30">
      <el-col>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="newFormInline.nickname" disabled />
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="角色列表" prop="ids">
          <el-select v-model="newFormInline.ids" placeholder="请选择" class="w-full" clearable multiple>
            <el-option
              v-for="(item, index) in newFormInline.roleOptions"
              :key="index"
              :value="item.id"
              :label="item.name"
            >
              {{ item.name }}
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RoleFormProps } from '../utils/type'

const props = withDefaults(defineProps<RoleFormProps>(), {
  formInline: () => ({
    username: '',
    nickname: '',
    roleOptions: [],
    ids: []
  })
})

const newFormInline = ref(props.formInline)
</script>
