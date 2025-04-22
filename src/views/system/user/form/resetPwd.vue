<template>
    <ElForm ref="ruleFormRef" :model="pwdForm">
        <ElFormItem
            prop="newPwd"
            :rules="[
            {
                required: true,
                message: '请输入新密码'
            }
            ]"
        >
            <ElInput
            clearable
            show-password
            type="password"
            v-model="pwdForm.newPwd"
            placeholder="请输入新密码"
            />
        </ElFormItem>
    </ElForm>
    <div class="mt-4 flex">
        <div
            v-for="({ color, text }, idx) in pwdProgress"
            class="w-[19vw]"
            :style="{marginLeft: idx !== 0 ? '4px' : 0 }"
        >
            <ElProgress
                striped
                striped-flow
                :duration="curScore.value === idx ? 6 : 0"
                :percentage="curScore.value >= idx ? 100 : 0"
                :color="color"
                :stroke-width="10"
                :show-text="false"
            />
            <p
                class="text-center"
                :style="{ color: curScore.value === idx ? color : '' }"
            >
                {{text}}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps(["pwdProgress", "curScore", "pwdForm"])
</script>