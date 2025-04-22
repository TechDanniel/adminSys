<template>
    <canvas ref="domRef" width="120" height="40" class="cursor-pointer" @click="getImgCode"></canvas>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user';
import { useImageVerify } from './hook';
import {watch} from "vue"

defineOptions({
    name:"ReImageVerify"
})

const {domRef,imgCode,setImgCode,getImgCode}=useImageVerify()


//点击图片验证码imgCode变化。监听图形验证码发生变化更新code的值
watch(imgCode,(newValue)=>{
    setImgCode(newValue)
    useUserStore().SET_VERIFYCODE(newValue)
})

defineExpose({getImgCode})
</script>