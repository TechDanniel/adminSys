<template>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="updateRules"
      size="large"
    >
      <Motion>
        <el-form-item prop="phone">
          <el-input
            v-model="ruleForm.phone"
            clearable
            placeholder="手机号"
            :prefix-icon="useRenderIcon(Iphone)"
          />
        </el-form-item>
      </Motion>
  
      <Motion :delay="100">
        <el-form-item prop="verifyCode">
          <div class="w-full flex justify-between">
            <el-input
              v-model="ruleForm.verifyCode"
              clearable
              placeholder="请输入短信验证码"
              :prefix-icon="useRenderIcon('ri:shield-keyhole-line')"
            />
            <el-button
              :disabled="isDisabled"
              class="ml-2"
              @click="useVeriyfyCode().start(ruleFormRef, 'phone')"
            >
              {{text}}
            </el-button>
          </div>
        </el-form-item>
      </Motion>
  
      <Motion :delay="150">
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            clearable
            show-password
            placeholder="请输入密码"
            :prefix-icon="useRenderIcon(Lock)"
          />
        </el-form-item>
      </Motion>
  
      <Motion :delay="200">
        <el-form-item :rules="repeatPasswordRule" prop="repeatPassword">
          <el-input
            v-model="ruleForm.repeatPassword"
            clearable
            show-password
            placeholder="请输入确认密码"
            :prefix-icon="useRenderIcon(Lock)"
          />
        </el-form-item>
      </Motion>
  
      <Motion :delay="250">
        <el-form-item>
          <el-button
            class="w-full"
            size="default"
            type="primary"
            :loading="loading"
            @click="onUpdate(ruleFormRef)"
          >
            确定
          </el-button>
        </el-form-item>
      </Motion>
  
      <Motion :delay="300">
        <el-form-item>
          <el-button class="w-full" size="default" @click="onBack">
            返回
          </el-button>
        </el-form-item>
      </Motion>
    </el-form>
  </template>

<script setup lang="ts">
import { ElMessage, FormInstance } from 'element-plus';
import {ref,reactive} from "vue"
import { useVeriyfyCode } from '../utils/veriyfyCode';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import Lock from '@iconify-icons/ri/lock-fill';
import Iphone from '@iconify-icons/ep/iphone';
import { updateRules } from '../utils/rule';
import { useUserStore } from '@/store/modules/user';

const ruleFormRef=ref<FormInstance>()
const ruleForm=reactive({
    phone: "",
    verifyCode: "",
    password: "",
    repeatPassword: ""
})
const { isDisabled, text } = useVeriyfyCode();

const repeatPasswordRule = [
  {
    validator: (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (ruleForm.password !== value) {
        callback(
          new Error("两次输入的密码不一致,请重新输入")
        );
      } else {
        callback();
      }
    },
    trigger: "blur"
  }
];

const loading=ref(false)
const onUpdate = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      // 模拟请求，需根据实际开发进行修改
      setTimeout(() => {
        ElMessage({
            message:"修改成功",
          type: "success"
        });
        loading.value = false;
      }, 2000);
    } else {
      loading.value = false;
    }
  });
};

function onBack() {
    useVeriyfyCode().end();
  useUserStore().SET_CURRENTPAGE(0);
}
</script>