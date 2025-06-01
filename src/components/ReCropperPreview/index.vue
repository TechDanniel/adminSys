<!-- 图片裁剪 -->
<template>
  <div v-loading="!showPopover" element-loading-background="transparent">
    <el-popover ref="popoverRef" :visible="showPopover" placement="right" width="18vw">
      <!-- 图片裁剪编辑区 -->
      <template #reference>
        <div class="w-[18vw]">
          <ReCropper ref="refCropper" :imgSrc="imgSrc" circled @cropper="onCropper" @readied="showPopover = true" />
          <p v-show="showPopover" class="mt-1 text-center">温馨提示：右键上方裁剪区可开启功能菜单</p>
        </div>
      </template>
      <div class="flex flex-wrap justify-center items-center text-center">
        <!-- 裁剪预览图 -->
        <el-image v-if="cropperImg" :src="cropperImg" :preview-src-list="Array.of(cropperImg)" fit="cover" />
        <div v-if="infos" class="mt-1">
          <p>图像大小：{{ parseInt(infos.width) }} × {{ parseInt(infos.height) }}像素</p>
          <p>文件大小：{{ formatBytes(infos.size) }}（{{ infos.size }} 字节）</p>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import formatBytes from '@/utils/formatBytes'
import ReCropper from '@/components/ReCropper/index.vue'

defineOptions({
  name: 'ReCropperPreview'
})

const showPopover = ref(false)
const refCropper = ref()
defineProps({
  imgSrc: String
})

//裁剪预览
const cropperImg = ref<string>('')
//裁剪后图片信息
const infos = ref()

//这里绑定的cropper事件式给ReCropper触发的，获取图片信息
const emit = defineEmits(['cropper'])
function onCropper({ base64, blob, info }) {
  infos.value = info
  cropperImg.value = base64
  //这里触发的是用到图片裁剪功能组件（如换头像）给更新自己的信息
  emit('cropper', { base64, blob, info })
}

//关闭弹框
const popoverRef = ref()
function hidePopover() {
  popoverRef.value.hide()
}

defineExpose({ hidePopover })
</script>
