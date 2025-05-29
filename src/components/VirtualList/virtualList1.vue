<template>
  <div class="container">
    <div class="virtuallist-container">
      <table class="virtuallist-list">
        <thead>
          <tr>
            <th>用户编号</th>
            <th>用户头像</th>
            <th>用户名称</th>
            <th>用户昵称</th>
            <th>性别</th>
            <th>部门</th>
            <th>手机号</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import FixedVirtualList from './FixedHVirtualList'
import { onMounted } from 'vue'
// 在 script setup 语法里，代码会在组件初始化时立即执行。要是在 DOM 元素还未渲染完成时就执行 document.querySelector 方法，就会返回 null。
onMounted(() => {
  const container = document.querySelector('.virtuallist-container') as HTMLDivElement
  const list = document.querySelector('.virtuallist-list') as HTMLTableElement
  // 在大多数情况下，导入 JSON 文件时，其内容会作为默认导出。这意味着 module.default 就是 JSON 文件中的实际数据。
  const tableData = import('./data/list1.json')
  tableData.then(module => {
    const virtuallist = new FixedVirtualList(container, list, module.default)
    virtuallist.init()
  })
})
</script>

<style lang="css">
.container {
  width: 800px;
  height: 300px;
}

.virtuallist-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.virtuallist-list {
  width: 100%;
  height: 100%;
  border-collapse: collapse;
}

thead tr {
  background-color: #ddd;
}

th,
td {
  box-sizing: border-box;
  border: 1px solid #000;
}
</style>
