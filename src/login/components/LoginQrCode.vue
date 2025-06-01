<template>
  <Motion class="-mt-2 -mb-2">
    <ReQrcode text="模拟测试" />
  </Motion>
  <Motion :delay="100">
    <el-divider>
      <p class="text-gray-500 text-xs">扫码后点击"确认"即可完成登录</p>
    </el-divider>
  </Motion>
  <Motion :delay="150">
    <el-button class="w-full mt-4" @click="useUserStore().SET_CURRENTPAGE(0)"> 返回 </el-button>
  </Motion>
</template>

<script lang="ts" setup>
import ReQrcode from '@/components/ReQrcode/index.vue'
import Motion from '../utils/motion'
import { useUserStore } from '@/store/modules/user'
</script>
