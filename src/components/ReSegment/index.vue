<template>
  <div
    :class="{
      'pure-segmented': true,
      'pure-segmented-block': props.block,
      'pure-segmented--large': isLarge,
      'pure-segmented--small':!isLarge 
    }"
  >
    <div class="pure-segmented-group">
      <div
        class="pure-segmented-item-selected"
        :style="{
          width: width + 'px',
          transform: `translateX(${translateX}px)`,
          display: initStatus? 'block': 'none'
        }"
      ></div>
      <label v-for="(option, index) in props.options" 
        :key="index"
        :ref="'labelRef'+index"
        :class="{
            'pure-segmented-item': true,
            'pure-segmented-item-disabled': props.disabled || option.disabled
        }"
        :style="{
            background:curMouseActive===index?segmentedItembg:'',
            color:props.disabled?null:
            !option.disabled&&(curIndex === index || curMouseActive=== index)?'rgba(0,0,0,.88)': ''
        }"
        @mouseenter="event=>handleMouseenter({ option, index }, event)"
        @mouseleave="event => handleMouseleave({ option, index }, event)"
        @click="event => handleChange({ option, index }, event)"
      >
        <input type="radio" name="segmented" />
        <div
            class="pure-segmented-item-label"
            v-tippy="{
                content: option?.tip,
                zIndex: 41000
            }"
        >
            <span v-if="option.icon&&!isFunction(option.label)"
                class="pure-segmented-item-icon"
                :style="{marginRight:option.label? '6px' : 0 }"
            >
              {{ useRenderIcon(option.icon,{...option.iconAttrs}) }}
            </span>
            <span v-if="option.label">{{ option.label }}</span>
        </div>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import "./index.css"
import { isFunction,isNumber } from 'lodash';
import { useRenderIcon } from '../ReIcon/src/hooks';
import type { OptionsType } from "./type";
import {
  type PropType,
  ref,
  toRef,
  watch,
  nextTick,
  getCurrentInstance,
  computed
} from "vue";

const props =defineProps( {
  options: {
    type: Array as PropType<OptionsType[]>,
    default: () => []
  },
  /** 默认选中，按照第一个索引为 `0` 的模式，可选（`modelValue`只有传`number`类型时才为响应式） */
  modelValue: {
    type: undefined,
    require: false,
    default: "0"
  },
  /** 将宽度调整为父元素宽度	 */
  block: {
    type: Boolean,
    default: false
  },
  /** 控件尺寸 */
  size: {
    type: String as PropType<"small" | "default" | "large">,
    default: 'default'
  },
  /** 是否全局禁用，默认 `false` */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 当内容发生变化时，设置 `resize` 可使其自适应容器位置 */
  resize: {
    type: Boolean,
    default: false
  }
});

const isLarge=computed(()=>props.size as unknown=== 'large')

const emit=defineEmits(["update:modelValue","change"])
const width = ref(0);
const translateX = ref(0);
const initStatus = ref(false);
const curMouseActive = ref(-1);
const segmentedItembg = ref("");
const instance = getCurrentInstance()!;
const curIndex = isNumber(props.modelValue)? toRef(props, "modelValue"): ref(0);
function handleChange({ option, index }, event: Event) {
    if (props.disabled || option.disabled) return;
    event.preventDefault();
    isNumber(props.modelValue)
    ? emit("update:modelValue", index)
    : (curIndex.value = index);
    segmentedItembg.value = "";
    emit("change", { index, option });
}
function handleMouseenter({ option, index }, event: Event) {
    if (props.disabled) return;
    event.preventDefault();
    curMouseActive.value = index;
    if (option.disabled || curIndex.value === index) {
    segmentedItembg.value = "";
    } else {
    segmentedItembg.value = "rgba(0, 0, 0, 0.06)";
    }
}
function handleMouseleave(_, event: Event) {
    if (props.disabled) return;
    event.preventDefault();
    curMouseActive.value = -1;
}
function handleInit(index = curIndex.value) {
    nextTick(() => {
    const curLabelRef = instance?.proxy?.$refs[`labelRef${index}`] as ElRef;
    if (!curLabelRef) return;
    width.value = curLabelRef.clientWidth;
    translateX.value = curLabelRef.offsetLeft;
    initStatus.value = true;
    });
}

const useResizeObserver=new ResizeObserver(entries => {
    nextTick(() => {
        handleInit(curIndex.value);
    })
})

function handleResizeInit() {
  const element:Element=document.querySelector('.pure-segmented')
  if(element) useResizeObserver.observe(element);
}

watch(
    () => curIndex.value,
    index => {
    nextTick(() => {
        handleInit(index);
    });
    },
    {
    immediate: true
    }
);

watch(() => props.size, handleResizeInit, {
    immediate: true
});
</script>