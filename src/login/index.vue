<template>
  <div class="select-none">
    <!-- 登录页的背景图 -->
    <img :src="bg" class="wave" />
    <div class="login-container">
      <div class="img">
        <!-- 动态创建组件时，is一定传传入组件选项对象或字符串，不能是响应式的 -->
        <component :is="toRaw(illustration)" />
      </div>
      <div class="login-box">
        <div class="login-form">
          <avatar class="avatar" />
          <!-- 打字机效果 -->
          <Motion>
            <h2 class="outline-none">
              <TypeIt :options="{ strings: 'AdminSystem', cursor: false, speed: 100 }" />
            </h2>
          </Motion>

          <!-- 登录表单 -->
          <!-- currentPage=0是默认的账号登录 -->
          <el-form v-if="currentPage === 0" ref="ruleFormRef" :model="ruleForm" :rules="loginRules" size:large>
            <!-- 用户名 -->
            <Motion :delay="100">
              <el-form-item :rules="[{ required: true, message: 'username is requried', trigger: 'blur' }]"
                prop="username">
                <el-input v-model="ruleForm.username" clearable placeholder="账号" :prefix-icon="useRenderIcon(User)" />
              </el-form-item>
            </Motion>

            <!--密码-->
            <Motion :delay="150">
              <el-form-item prop="password">
                <el-input v-model="ruleForm.password" clearable show-password placeholder="密码"
                  :prefix-icon="useRenderIcon(Lock)" />
              </el-form-item>
            </Motion>

            <!-- 验证码 -->
            <Motion :delay="200">
              <el-form-item prop="verifyCode">
                <el-input v-model="ruleForm.verifyCode" clearable placeholder="验证码"
                  :prefix-icon="useRenderIcon('ri:shield-keyhole-line')">
                  <template #append>
                    <ReImageVerify />
                  </template>
                </el-input>
              </el-form-item>
            </Motion>

            <!-- 七天内免登录复选框和忘记密码 -->
            <Motion :delay="250">
              <el-form-item>
                <div class="w-full h-[20px] flex justify-between items-center">
                  <el-checkbox v-model="checked">
                    <span class="flex">
                      七天内免登录
                      <IconifyIconOffline
                        :icon="Info"
                        class="ml-1"
                        v-tippy="{content:'勾选后规定天数内自动登录',placement:'top'}"
                      />
                    </span>
                  </el-checkbox>
                  <el-button
                    link
                    type="primary"
                    @click="useUserStore().SET_CURRENTPAGE(4)"
                  >
                    忘记密码
                  </el-button>
                </div>
              </el-form-item>
            </Motion>

            <Motion :delay="300">
              <el-form-item>
                <!-- 登录按钮 -->
                <el-button
                  class="w-full mt-4"
                  size="default"
                  type="primary"
                  :loading="loading"
                  :disabled="disabled"
                  @click="onLogin(ruleFormRef)"
                >
                  登录
                </el-button>
              </el-form-item>
            </Motion>

            <Motion :delay="300">
                <el-form-item>
                  <div class="w-full h-[20px] flex justify-between items-center">
                    <el-button
                      v-for="(item,index) in operates"
                      :key="index"
                      class="w-full mt-4"
                      size="default"
                      @click="useUserStore().SET_CURRENTPAGE(index + 1)"
                    >
                      {{ item }}
                    </el-button>
                  </div>
                </el-form-item>
            </Motion>
          </el-form>

           <!-- 手机号登录 -->
          <LoginPhone v-if="currentPage === 1" />
          <!-- 二维码登录 -->
          <LoginQrCode v-if="currentPage === 2" />
          <!-- 注册 -->
          <LoginRegist v-if="currentPage === 3" />
          <!-- 忘记密码 -->
          <LoginUpdate v-if="currentPage === 4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// avatar, illustration是 render 函数对象
import { bg, avatar, illustration } from "./utils/static";
import Motion from "./utils/motion"
import { toRaw, computed, reactive, ref, watch } from "vue";
import TypeIt from "@/components/ReTypeit";
import { useUserStore } from "@/store/modules/user";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { loginRules } from "./utils/rule";
import ReImageVerify from "@/components/ReImageVerify/index.vue"
import { FormInstance,ElMessage } from "element-plus";
import { getTopMenu, initRouter } from "@/router/utils";

import LoginPhone from "./components/LoginPhone.vue"
import LoginQrCode from "./components/LoginQrCode.vue"
import LoginRegist from "./components/LoginRegist.vue"
import LoginUpdate from "./components/LoginUpdate.vue"

import Lock from "@iconify-icons/ri/lock-fill";
import User from "@iconify-icons/ri/user-3-fill";
import Info from "@iconify-icons/ri/information-line";
import { IconifyIconOffline } from "@/components/ReIcon";
import router from "@/router";


defineOptions({
  name: "Login"
})

const ruleForm = reactive({
  username: "admin",
  password: "admin123",
  verifyCode: ""
})

//登陆方式
const currentPage = computed(() => {
  return useUserStore().currentPage
})

//七天免登录复选框
const checked = ref(false);
watch(checked, bool => {
  useUserStore().SET_ISREMEMBERED(bool);
});

//登录按钮
const loading=ref(false)
const disabled=ref(false)
const ruleFormRef=ref<FormInstance>()
const onLogin=async(formEl:FormInstance|undefined)=>{
  if(!formEl) return
  await formEl.validate(valid=>{
    if(valid){
      useUserStore().loginByUsername({username:ruleForm.username,password:ruleForm.password}).then(
        res=>{
          if(res.success){
            return initRouter().then(()=>{
              disabled.value=true
              //跳转到顶级菜单，true表示添加到标签页
              router.push(getTopMenu(true).path).then(()=>{
                ElMessage({message: '登录成功',type: 'success'})
              }).finally(()=>disabled.value=false)
            })
          }else{
            ElMessage.error('登陆失败')
          }
        }
      )
    }
  })
}

//不同登录方式
const operates=["手机登录","二维码登录","注册"]
</script>

<style scoped lang="scss">
@import url("@/style/login.css");

:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}

.translation {
  ::v-deep(.el-dropdown-menu__item) {
    padding: 5px 40px;
  }

  .check-zh {
    position: absolute;
    left: 20px;
  }

  .check-en {
    position: absolute;
    left: 20px;
  }
}
</style>