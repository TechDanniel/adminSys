<template>
  <div class="content">
    <el-card shadow="never" class="mb-2">
      <el-space wrap>
        <Auth value="permission:btn:add">
          <el-button plain type="warning"> 新增(组件方式控制权限) </el-button>
        </Auth>
        <el-button v-if="hasAuths('permission:btn:add')" plain type="warning"> 新增(函数方式控制权限) </el-button>
        <el-button v-auth="'permission:btn:add'" plain type="warning"> 新增(指令方式控制权限) </el-button>
      </el-space>
    </el-card>
    <!--瀑布流-->
    <div ref="containerRef">
      <Waterfall :request="getData" :gap="20" :page-size="15" :column="column" :enter-size="column * 2">
        <template #item="{ item, imageHeight }">
          <div class="notesItem">
            <div
              :style="{
                height: imageHeight + 'px',
                width: '100%',
                border: '1px solid #eee',
                borderRadius: '20px',
                backgroundColor: item.bgColor
              }"
            ></div>
            <div class="notesFooter">
              <div class="title">{{ item.title }}</div>
              <div class="author">
                <div class="author-info">
                  <div class="avatar" :style="{ backgroundColor: item.bgColor }"></div>
                  <span class="name">{{ item.author }}</span>
                </div>
                <div class="like">100</div>
              </div>
            </div>
          </div>
        </template>
      </Waterfall>
    </div>
  </div>
</template>

<script setup lang="ts">
import Auth from '@/components/ReAuth'
import { hasAuths } from '@/router/utils'
import Waterfall from '@/components/waterflow/index.vue'
import { CardItem } from '@/components/waterflow/util'
import { listData } from './api'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const getData = async (page: number, pageSize: number) => {
  return new Promise<CardItem[]>(resolve => {
    setTimeout(() => {
      resolve(listData().then(res => res.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)))
    }, 1000)
  })
}

const containerRef = ref<HTMLDivElement | null>(null)
const ContainerObserver = new ResizeObserver(entries => {
  changeColumn(entries[0].target.clientWidth)
})
const column = ref(5)
const changeColumn = (width: number) => {
  if (width > 960) {
    column.value = 5
  } else if (width >= 690 && width < 960) {
    column.value = 4
  } else if (width >= 500 && width < 690) {
    column.value = 3
  } else {
    column.value = 2
  }
}

onMounted(() => {
  ContainerObserver.observe(containerRef.value)
})
onBeforeUnmount(() => {
  ContainerObserver.unobserve(containerRef.value)
})
</script>

<style scoped lang="scss">
@mixin line-clamp($lines) {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: $lines;
  line-clamp: $lines;
  -webkit-box-orient: vertical;
}

@keyframes MoveAnimate {
  0% {
    opacity: 0;
    transform: translateY(5px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.notesItem {
  width: 100%;
  height: 100%;
  background-color: #fff;

  /* 使用动画简写属性 */
  animation: MoveAnimate 2s;

  .notesFooter {
    padding: 12px;
    font-size: 14px;

    .title {
      @include line-clamp(2);

      margin-bottom: 8px;
      color: rgb(51 51 51 / 80%);
      word-break: break-all;
    }

    .author {
      display: flex;
      gap: 5px;
      align-items: center;
      justify-content: space-between;
      font-size: 13px;

      .author-info {
        display: flex;
        flex: 1;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        .avatar {
          width: 20px;
          height: 20px;
          margin-right: 6px;
          border: 1px solid rgb(0 0 0 / 8%);
          border-radius: 20px;
        }

        .name {
          width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
          color: rgb(51 51 51 / 80%);
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
