<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="phoneRules" size="large">
        <!-- 手机号 -->
         <Motion>
            <el-form-item prop="phone">
                <el-input
                  v-model="ruleForm.phone"
                  clearable
                  placeholder="请输入手机号"
                  :prefix-icon="useRenderIcon(Iphone)"
                />
            </el-form-item>
         </Motion>

         <!-- 短信验证码 -->
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
                    class="ml-2"
                    :disabled="isDisabled"
                    @click="useVeriyfyCode().start(ruleFormRef,'phone')"
                    >
                    {{ text }}
                    </el-button>
                </div>
            </el-form-item>
         </Motion>

         <!-- 登录按钮 -->
         <Motion :delay="150">
            <el-form-item>
                <el-button
                class="w-full"
                size="default"
                type="primary"
                :loading="loading"
                @click="onLogin(ruleFormRef)"
                >
                  登录
                </el-button>
            </el-form-item>
         </Motion>

         <Motion :delay="200">
            <el-form-item>
                <el-button class="w-full" size="default" @click="onBack">
                    返回
                </el-button>
            </el-form-item>
         </Motion>
    </el-form>
</template>

<script setup lang="ts">
import {ref,reactive} from "vue"
import { FormInstance,ElMessage } from "element-plus";
import {phoneRules} from "../utils/rule"
import Motion from "../utils/motion"
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Iphone from "@iconify-icons/ep/iphone";
import {useVeriyfyCode } from "../utils/veriyfyCode";
import { useUserStore } from "@/store/modules/user";


const ruleFormRef=ref<FormInstance>()
const ruleForm=reactive({
    phone:"",
    verifyCode:""
})

//获取验证码的相关信息
const {isDisabled,text}=useVeriyfyCode()

//登录按钮相关
const loading=ref(false)
const onLogin=async(formEl:FormInstance|undefined)=>{
    loading.value=true
    if(!formEl) return
    await formEl.validate(valid=>{
        if(valid){
            //模拟登录请求
            setTimeout(() => {
                ElMessage.success("登录成功")
                loading.value = false;
            }, 2000);
        } else {
        loading.value = false;
        }
    })
}
function onBack(){
    useVeriyfyCode().end()
    useUserStore().SET_CURRENTPAGE(0)
}
</script>