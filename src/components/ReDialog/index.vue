<script setup lang="ts">
import {
  type EventType,
  type ButtonProps,
  type DialogOptions,
} from "./type";
import {dialogStore,closeDialog} from "./index"
import { ref, computed } from "vue";
import { isFunction } from "lodash";

defineOptions({
  name: "ReDialog"
});

const sureBtnMap = ref({});

const footerButtons = computed(() => {
  return (options: DialogOptions) => {
    return options?.footerButtons?.length > 0
      ? options.footerButtons
      : ([
          {
            label: "取消",
            text: true,
            bg: true,
            btnClick: ({ dialog: { options, index } }) => {
              const done = () =>
                closeDialog(options, index, { command: "cancel" });
              if (options?.beforeCancel && isFunction(options?.beforeCancel)) {
                options.beforeCancel(done, { options, index });
              } else {
                done();
              }
            }
          },
          {
            label: "确定",
            type: "primary",
            text: true,
            bg: true,
            popconfirm: options?.popconfirm,
            btnClick: ({ dialog: { options, index } }) => {
              if (options?.sureBtnLoading) {
                sureBtnMap.value[index] = Object.assign(
                  {},
                  sureBtnMap.value[index],
                  {
                    loading: true
                  }
                );
              }
              const closeLoading = () => {
                if (options?.sureBtnLoading) {
                  sureBtnMap.value[index].loading = false;
                }
              };
              const done = () => {
                closeLoading();
                closeDialog(options, index, { command: "sure" });
              };
              if (options?.beforeSure && isFunction(options?.beforeSure)) {
                options.beforeSure(done, { options, index, closeLoading });
              } else {
                done();
              }
            }
          }
        ] as Array<ButtonProps>);
  };
});


function eventsCallBack(
  event: EventType,
  options: DialogOptions,
  index: number
) {
  if (options?.[event] && isFunction(options?.[event])) {
    return options?.[event]({ options, index });
  }
}

function handleClose(
  options: DialogOptions,
  index: number,
  args = { command: "close" }
) {
  closeDialog(options, index, args);
  eventsCallBack("close", options, index);
}
</script>

<template>
  <el-dialog
    v-for="(options, index) in dialogStore"
    :key="index"
    v-bind="options"
    v-model="options.visible"
    class="pure-dialog"
    @closed="handleClose(options, index)"
    @opened="eventsCallBack('open', options, index)"
    @openAutoFocus="eventsCallBack('openAutoFocus', options, index)"
    @closeAutoFocus="eventsCallBack('closeAutoFocus', options, index)"
  >
    <!-- header -->
    <template
      v-if="options?.headerRender"
      #header="{ close, titleId, titleClass }"
    >
      <component
        :is="options?.headerRender({ close, titleId, titleClass })"
      />
    </template>
    <component
      v-bind="options?.props"
      :is="options.contentRender({ options, index })"
      @close="args => handleClose(options, index, args)"
    />
    <!-- footer -->
    <template v-if="!options?.hideFooter" #footer>
      <template v-if="options?.footerRender">
        <component :is="options?.footerRender({ options, index })" />
      </template>
      <span v-else>
        <template v-for="(btn, key) in footerButtons(options)" :key="key">
          <el-popconfirm
            v-if="btn.popconfirm"
            v-bind="btn.popconfirm"
            @confirm="
              btn.btnClick({
                dialog: { options, index },
                button: { btn, index: key }
              })
            "
          >
            <template #reference>
              <el-button v-bind="btn">{{ btn?.label }}</el-button>
            </template>
          </el-popconfirm>
          <el-button
            v-else
            v-bind="btn"
            :loading="key === 1 && sureBtnMap[index]?.loading"
            @click="
              btn.btnClick({
                dialog: { options, index },
                button: { btn, index: key }
              })
            "
          >
            {{ btn?.label }}
          </el-button>
        </template>
      </span>
    </template>
  </el-dialog>
</template>
