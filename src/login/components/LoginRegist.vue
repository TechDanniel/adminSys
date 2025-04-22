<template>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="updateRules"
      size="large"
    >
    <!--账号-->
    <Motion>
      <el-form-item prop="username">
        <el-input
          v-model="ruleForm.username"
          clearable
          placeholder="账号"
          :rule="[{ required: true, message: 'username is requried', trigger: 'blur' }]"
          :prefix-icon="useRenderIcon(User)"
        />
      </el-form-item>
    </Motion>

    <!--手机号-->
    <Motion :delay="100">
      <el-form-item prop="phone">
        <el-input
          v-model="ruleForm.phone"
          clearable
          placeholder="手机号"
          :prefix-icon="useRenderIcon(Iphone)"
        />
      </el-form-item>
    </Motion>

    <!-- 短信验证码 -->
    <Motion :delay="150">
      <el-form-item prop="verifyCode">
        <div class="w-full flex justify-between">
          <el-input
            v-model="ruleForm.verifyCode"
            clearable
            placeholder="短信验证码"
            :prefix-icon="useRenderIcon('ri:shield-keyhole-line')"
          />
          <el-button
            :disabled="isDisabled"
            class="ml-2"
            @click="useVeriyfyCode().start(ruleFormRef, 'phone')"
          >
          {{ text }}
          </el-button>
        </div>
      </el-form-item>
    </Motion>

    <!-- 密码 -->
    <Motion :delay="200">
      <el-form-item prop="password">
        <el-input
          v-model="ruleForm.password"
          clearable
          show-password
          placeholder="密码"
          :prefix-icon="useRenderIcon(Lock)"
        />
      </el-form-item>
    </Motion>

    <!-- 确认密码 -->
    <Motion :delay="250">
      <el-form-item :rules="repeatPasswordRule" prop="repeatPassword">
        <el-input
          v-model="ruleForm.repeatPassword"
          clearable
          show-password
          placeholder="确认密码"
          :prefix-icon="useRenderIcon(Lock)"
        />
      </el-form-item>
    </Motion>

    <!-- 我已阅读 -->
    <Motion :delay="300">
      <el-form-item>
        <el-checkbox v-model="checked">
          我已仔细阅读并接受
        </el-checkbox>
        <el-button link type="primary">
          《隐私政策》
        </el-button>
      </el-form-item>
    </Motion>

    <!-- 确定 -->
    <Motion :delay="350">
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

    <!-- 返回 -->
    <Motion :delay="400">
      <el-form-item>
        <el-button class="w-full" size="default" @click="onBack">
          返回
        </el-button>
      </el-form-item>
    </Motion>
    </el-form>
</template>

<script setup lang="ts">
import { reactive,ref } from "vue";
import Motion from "../utils/motion";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import {updateRules} from "../utils/rule";
import { useVeriyfyCode } from "../utils/veriyfyCode";
import {FormInstance,ElMessage} from "element-plus";

import Lock from "@iconify-icons/ri/lock-fill";
import Iphone from "@iconify-icons/ep/iphone";
import User from "@iconify-icons/ri/user-3-fill";
import { useUserStore } from "@/store/modules/user";

const ruleForm=reactive({
    username:"",
    phone:"",
    verifyCode:"",
    password:"",
    repeatPassword:""
})

const ruleFormRef=ref<FormInstance>()
const checked = ref(false);
const loading = ref(false);
const { isDisabled, text } = useVeriyfyCode();

const onUpdate = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      if (checked.value) {
        // 模拟请求，需根据实际开发进行修改
        setTimeout(() => {
          ElMessage({
            message:"注册成功",
            type: "success"
          });
          loading.value = false;
        }, 2000);
      } else {
        loading.value = false;
        ElMessage({
          message: "请勾选用户协议",
          type: "warning"
        });
      }
    } else {
      loading.value = false;
    }
  });
};

function onBack() {
  useVeriyfyCode().end();
  useUserStore().SET_CURRENTPAGE(0);
}

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

</script>