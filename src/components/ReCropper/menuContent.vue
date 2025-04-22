<template>
        <div class="flex flex-wrap w-[60px] justify-between">
        <ElUpload
            accept="image/*"
            :show-file-list="false"
            :before-upload="beforeUpload"
        >
            <Upload
                :class="iconClass"
                v-tippy="{
                content: '上传',
                placement: 'left-start'
                }"
            />
        </ElUpload>
        <DownloadIcon
            :class="iconClass"
            v-tippy="{
            content: '下载',
            placement: 'right-start'
            }"
            @click="() => downloadByBase64(RefimgBase64, 'cropping.png')"
        />
        <ChangeIcon
            :class="iconClass"
            v-tippy="{
            content: '圆形、矩形裁剪',
            placement:'left-start'
            }"
            @click="toggleCropper"
        />
        <Reload
            :class="iconClass"
            v-tippy="{
            content: '重置',
            placement: 'right-start'
            }"
            @click="() => handCropper('reset')"
        />
        
        <ArrowUp
            :class="iconClass"
            v-tippy="{
            content: '上移（可长按）',
            placement: 'left-start'
            }"
           v-longpress="[() => handCropper('move', [0, -10]), '0:100']"
        />
        <ArrowDown
            :class="iconClass"
            v-tippy="{
            content: '下移（可长按）',
            placement: 'right-start'
            }"
            v-longpress="[() => handCropper('move', [0, 10]), '0:100']"
        />
        
        <ArrowLeft
            :class="iconClass"
            v-tippy="{
            content: '左移（可长按）',
            placement: 'left-start'
            }"
            v-longpress="[() => handCropper('move', [-10, 0]), '0:100']"
        />
        
        <ArrowRight
            :class="iconClass"
            v-tippy="{
            content: '右移（可长按）',
            placement: 'right-start'
            }"
           v-longpress="[() => handCropper('move', [10, 0]), '0:100']"
        />
        <ArrowH
            :class="iconClass"
            v-tippy="{
            content: '水平翻转',
            placement: 'left-start'
            }"
            @click="() => handCropper('scaleX', -1)"
        />
        <ArrowV
            :class="iconClass"
            v-tippy="{
            content: '垂直翻转',
            placement: 'right-start'
            }"
            @click="() => handCropper('scaleY', -1)"
        />
        <RotateLeft
            :class="iconClass"
            v-tippy="{
            content: '逆时针旋转',
            placement: 'left-start'
            }"
            @click="() => handCropper('rotate', -45)"
        />
        <RotateRight
            :class="iconClass"
            v-tippy="{
            content: '顺时针旋转',
            placement: 'right-start'
            }"
            @click="() => handCropper('rotate', 45)"
        />
        
        <SearchPlus
            :class="iconClass"
            v-tippy="{
            content: '放大（可长按）',
            placement: 'left-start'
            }"
            v-longpress="[() => handCropper('zoom', 0.1), '0:100']"
        />
        
        <SearchMinus
            :class="iconClass"
            v-tippy="{
            content: '缩小（可长按）',
            placement: 'right-start'
            }"
            v-longpress="[() => handCropper('zoom', -0.1), '0:100']"
        />
    </div>
</template>

<script setup lang="ts">
import {computed,ref,PropType,CSSProperties} from "vue";
import { useInit } from "./hook";
import Cropper from "cropperjs";
import { longpress } from "@/directives/longpress";
import { directive as tippy } from "vue-tippy";
import downloadByBase64 from '@/utils/download';
import {
  Reload,
  Upload,
  ArrowH,
  ArrowV,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ChangeIcon,
  ArrowRight,
  RotateLeft,
  SearchPlus,
  RotateRight,
  SearchMinus,
  DownloadIcon
} from "./svg";

// 定义指令
const vLongpress = longpress;
const vTippy = tippy;

const emit=defineEmits(["error","cropper","readied"])
const props=defineProps({
    imgSrc: { type: String, required: true },
    alt: { type: String },
    circled: { type: Boolean, default: false },
    /** 是否可以通过点击裁剪区域关闭右键弹出的功能菜单，默认 `true` */
    isClose: { type: Boolean, default: true },
    realTimePreview: { type: Boolean, default: true },
    height: { type: [String, Number], default: "360px" },
    crossorigin: {
      type: String as any as PropType<"" | "anonymous" | "use-credentials" | undefined>,
      default: undefined
    },
    imageStyle: { type: Object as any as PropType<CSSProperties>, default: () => ({}) },
    options: { type: Object as any as PropType<Cropper.Options>, default: () => ({}) },
    imgBase64: { type: String, default: "" },
    cropper: { type: Object as any as PropType<Cropper>, default: () => ({}) }
})

let { init,realTimeCroppered,inCircled} = useInit(props, emit);

//根据指令操作图像
let scaleX = 1;
let scaleY = 1;
let RefCropper=ref(props.cropper)
function handCropper(event:string,arg?:number|Array<number>){
    if(event==="scaleX"){
        scaleX=arg=scaleX===-1?1:-1
    }
    if (event === "scaleY") {
        scaleY = arg = scaleY === -1 ? 1 : -1;
    }
    //?.是可选链操作符，[]为了处理表达式
    //根据指令event执行cropper实例的函数
    arg&&Array.isArray(arg)?
    RefCropper.value?.[event]?.(...arg):
    RefCropper.value?.[event]?.(arg)
}

const inSrc=ref(props.imgSrc)
const RefimgBase64=ref(props.imgBase64)
function beforeUpload(file){
    const reader = new FileReader();
    //以dataURL的形式读取文件
    reader.readAsDataURL(file)
    inSrc.value=""
    reader.onload=e=>{
        // 将读取到的 DataURL 赋值给 inSrc 元素
        inSrc.value=e.target?.result as string
    }
    reader.onloadend=()=>{
        init()
    }
    // 返回 false 以阻止文件的默认上传行为
    return false
}

function toggleCropper(){
    inCircled.value=!inCircled.value
    realTimeCroppered(RefCropper);
}

const iconClass = computed(() => {
    return [
    "p-[6px]",
    "h-[30px]",
    "w-[30px]",
    "outline-none",
    "rounded-[4px]",
    "cursor-pointer",
    "hover:bg-[rgba(0,0,0,0.06)]"
    ];
});
</script>