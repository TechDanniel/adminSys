<!-- 右键的菜单功能 -->
<template>
    <div
    ref="tippyElRef"
    :class="getClass"
    :style="getWrapperStyle"
    @contextmenu="event => onContextmenu(event)"
    >
        <img
          v-show="isReady"
          ref="imgElRef"
          :style="getImageStyle"
          :src="inSrc"
          :alt="alt"
          :crossorigin="crossorigin"
        />
    </div>
</template>

<script setup lang="ts">
import "./circled.css";
import {computed,CSSProperties,ref, useAttrs,PropType ,h,onMounted,onUnmounted} from 'vue'
import  Cropper  from "cropperjs";
import { useTippy } from 'vue-tippy';
import { useEventListener } from "@vueuse/core";
import menuContent from './menuContent.vue';
import {useInit} from './hook';

type Options = Cropper.Options;
const emit=defineEmits(["error","cropper","readied"])
const props=defineProps( {
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
    options: { type: Object as any as PropType<Options>, default: () => ({}) }
});

let { init,cropper,isReady,imgBase64,imgElRef,inCircled } = useInit(props,emit);

const inSrc=ref(props.imgSrc)
const getClass = computed(() => {
  return [
    useAttrs().class,
    {
      ["re-circled"]: inCircled.value
    }
  ];
});

const getImageStyle = computed((): CSSProperties => {
    return {
    height: props.height,
    maxWidth: "100%",
    ...props.imageStyle
    };
});
const getWrapperStyle = computed((): CSSProperties => {
    return { height: `${props.height}`.replace(/px/, "") + "px" };
});

const isInClose = ref(props.isClose);
const tippyElRef = ref<ElRef<HTMLImageElement>>();
// 定义事件处理函数
const error = (errorData) => {
  emit('error', errorData); // 将事件继续向上传递给父组件
};

const cropperEvent = (cropperData) => {
  emit('cropper', cropperData);
};

onMounted(()=>{
  init()
});

let scaleX = 1;
let scaleY = 1;
onUnmounted(() => {
  cropper.value?.destroy();
  isReady.value = false;
  cropper.value = null;
  imgBase64.value = "";
  scaleX = 1;
  scaleY = 1;
});

const readied = () => {
  emit('readied');
};
//右键弹出菜单栏
function onContextmenu(event) {
    event.preventDefault();

    const MenuContent = h(menuContent,
    {...props,
      imgBase64:imgBase64.value,cropper:cropper.value,
      onerror:error,oncropper:cropperEvent,onreadied:readied})

    const { show, setProps, destroy, state } = useTippy(tippyElRef, {
    content: MenuContent,
    arrow: false,
    theme: "light",
    trigger: "manual",
    interactive: true,
    appendTo: "parent",
    // hideOnClick: false,s
    placement: "bottom-end"
    });

    setProps({
    getReferenceClientRect: () => ({
        width: 0,
        height: 0,
        top: event.clientY,
        bottom: event.clientY,
        left: event.clientX,
        right: event.clientX
    })
    });

    show();

    if (isInClose.value) {
        if (!state.value.isShown && !state.value.isVisible) return;
        useEventListener(tippyElRef, "click", destroy);
    }
}
</script>