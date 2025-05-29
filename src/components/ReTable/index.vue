<template>
    <div :class="['w-[99/100]','px-2','pb-2','bg-bg_color','mt-2']">
        <div class="flex justify-between w-full h-[60px] p-4">
            <!-- 表格名 -->
            <p class="font-bold truncate">{{props.title}}</p>
            <div class="flex items-center justify-around">
                <!-- 按钮 -->
                <slot name="buttons"><div class="flex mr-4" v-if="slots?.buttons">{{slots.buttons()}}</div></slot>
                <el-divider direction="vertical" />
                <!-- 刷新图标 -->
                <RefreshIcon
                :class="[
                  'w-[16px]',
                  iconClass,
                  loading ? 'animate-spin' : ''
                ]"
                v-tippy="rendTippyProps('刷新')"
                @click=onReFresh()
              />
              <el-divider direction="vertical" />
              <!-- 选定列展示 -->
              <el-popover
                  placement="bottom-start"
                  :popper-style="{ padding: 0 }"
                  width="200"
                  trigger="click"
              >
                <template #reference>
                    <SettingIcon :class="['w-[16px]', iconClass]" v-tippy="rendTippyProps('列设置')"/>
                </template>
                <div :class="topClass">
                  <el-checkbox
                    class="!-mr-1"
                    label="列展示"
                    v-model="checkAll"
                    :indeterminate="isIndeterminate"
                    @change="handleCheckAllChange"
                  />
                  <el-button type="primary" link @click="() => onReset()">
                    重置
                  </el-button>
                </div>

                <div class="pt-[6px] pl-[11px]">
                  <el-scrollbar max-height="36vh">
                    <el-checkbox-group
                      :ref="GroupRef"
                      v-model="checkedColumns"
                      @change="handleCheckedColumnsChange"
                    >
                      <el-space
                        direction="vertical"
                        alignment="flex-start"
                        :size="0"
                      >
                        <div v-for="(item,index) in checkColumnList" class="flex items-center">
                            <DragIcon
                                :class="[
                                  'drag-btn w-[16px] mr-2',
                                   isFixedColumn(item)
                                    ? '!cursor-no-drop'
                                    : '!cursor-grab'
                                ]"
                                @mouseenter.prevent="rowDrop($event)"
                            />
                            <el-checkbox
                                :key="index"
                                :label="item"
                                :value="item"
                                @change="value=>handleCheckColumnListChange(value,item)"
                              >
                                <span
                                  :title="item"
                                  class="inline-block w-[120px] truncate hover:text-text_color_primary"
                                >
                                  {{item}}
                                </span>
                              </el-checkbox>
                        </div>
                      </el-space>
                    </el-checkbox-group>
                  </el-scrollbar>
                </div>
              </el-popover>
          </div>
        </div>   
        <!--表格-->
        <slot :size="size" :dynamicColumns="visibleColumns"></slot>
    </div>
</template>

<script setup lang="ts">
import { deepClone } from '@/utils/deepClone';
import { nextTick } from 'process';
import {type PropType,computed,ref,useSlots,unref,getCurrentInstance,watch} from 'vue'
import type { CheckboxValueType } from 'element-plus';
import Sortable from "sortablejs";
import { EpPropMergeType } from 'element-plus/es/utils/index.mjs';
import RefreshIcon from "@/assets/table-bar/refresh.svg?component";
import SettingIcon from "@/assets/table-bar/settings.svg?component";
import DragIcon from "@/assets/table-bar/drag.svg?component";

const size:EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never>= "default";

const props=defineProps({
    title: {
        type: String,
        default: "列表"
    },
    /** 需要展示的列 */
    columns: {
        type: Array as PropType<TableColumnList>,
        default: () => []
    },
    tableKey: {
        type: [String, Number] as PropType<string | number>,
        default: "0"
    },
})

const GroupRef=`GroupRef${unref(props.tableKey)}`

// 在组件内部获取父组件传递过来的插槽内容
const slots = useSlots()

const iconClass = computed(() => {
    return [
    "text-black",
    "dark:text-white",
    "duration-100",
    "hover:!text-primary",
    "cursor-pointer",
    "outline-none"
    ];
});

const loading = ref(false);

const emit=defineEmits(["refresh"])

function onReFresh() {
    loading.value = true;
    emit("refresh");
    setTimeout(()=>{
        loading.value = false
    },500);
}

//提示框
const rendTippyProps=(content:string)=>{
    return {
        content,
        offset:[0,18],
        duration:[300,0],
        followCursor:true,
        hideOnclick:"toggle"
    }
}

//列设置弹出框的样式
const topClass = computed(() => {
    return [
    "flex",
    "justify-between",
    "pt-[3px]",
    "px-[11px]",
    "border-b-[1px]",
    "border-solid",
    "border-[#dcdfe6]",
    "dark:border-[#303030]"
    ];
});
//列设置全选复选框
const checkAll = ref(true);
//半选状态，介于全选和全部选之间
const isIndeterminate = ref(false);
//过滤掉隐藏的列
const filterColumns = deepClone(props?.columns).filter(column =>
  !column.hide
);
//所有列的label属性，标识
let checkColumnList = deepClone(props?.columns).map(column => column.label);
//选中列的标识
const checkedColumns =ref( deepClone(filterColumns).map(column => column.label));
//props接受的所有列的数据
const dynamicColumns = ref(deepClone(props?.columns));
//列设置全选复选框
function handleCheckAllChange(val:CheckboxValueType) {
  checkedColumns.value = val ? checkColumnList : [];
  isIndeterminate.value = false;
  //表格列全部显示或隐藏
  dynamicColumns.value.map(column =>
  val ? (column.hide = false) : (column.hide = true)
  )
}
//列复选框group
function handleCheckedColumnsChange(value: string[]) {
    //当前被选中的列的标识集合
    checkedColumns.value = value;
    const checkedCount = value.length;
    //判断是否全选
    checkAll.value = checkedCount === checkColumnList.length;
    //判断是否半选
    isIndeterminate.value =
    checkedCount > 0 && checkedCount < checkColumnList.length;
}
//列的单个复选框
function handleCheckColumnListChange(val, label: string) {
    dynamicColumns.value.filter(
    item =>item.label=== label
    )[0].hide = !val;
}

//是否是固定列,可拖动
const isFixedColumn = (label: string) => {
    return dynamicColumns.value.filter(
    item => item.label === label
    )[0].fixed
    ? true
    : false;
};

// 计算属性，过滤出需要显示的列
const visibleColumns = computed(() => {
  return dynamicColumns.value.filter(column => !column.hide);
});

//列的拖拽
const instance = getCurrentInstance()!;
const rowDrop=(event:{preventDefault:()=>void})=>{
    //阻止浏览器的默认行为
    event.preventDefault();
    nextTick(()=>{
        //获取group的第一个元素，拖拽容器
        const wrapper:HTMLElement=(instance?.proxy?.$refs[`GroupRef${unref(props.tableKey)}`]as any).$el.firstElementChild;
        //将wrapper设为内容可拖拽容器
        Sortable.create(wrapper,{
            animation:300,
            handle:".drag-btn",
            onEnd:({newIndex,oldIndex,item})=>{
                const targetElem=item
                const wrapperElem=targetElem.parentNode
                const oldColumn=dynamicColumns.value[oldIndex]
                const newColumn=dynamicColumns.value[newIndex]
                //不可拖拽的情况
                if(oldColumn?.fixed||newColumn?.fixed){
                    const oldElem=wrapperElem.children[oldIndex]
                    //恢复原来的位置
                    if(newIndex>oldIndex){
                        wrapperElem.insertBefore(targetElem,oldElem)
                    }else{
                        wrapperElem.insertBefore(targetElem,oldElem?oldElem.nextElementSibling:oldElem)
                    }
                    return
                }
                //移动元素从原来位置删除，然后插入到新的位置
                const currentRow=dynamicColumns.value.splice(oldIndex,1)[0]
                dynamicColumns.value.splice(newIndex,0,currentRow)
            }
        })
    })
}

function onReset(){
    checkAll.value = true;
    isIndeterminate.value = false;
    dynamicColumns.value=deepClone(props?.columns)
    checkColumnList=[]
    checkColumnList=deepClone(props?.columns).map(column => column.label);
    checkedColumns.value=deepClone(filterColumns).map(column => column.label);
}
</script>
