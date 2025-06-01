<template>
  <div class="navbar bg-[#fff] shadow-sm shadow-[rgba(0,21,41,0.08)]">
    <div v-if="layout === 'vertical'" class="vertical-header-right">
      <!-- 退出登录 -->
      <el-dropdown trigger="click">
        <!--用户头像-->
        <span class="el-dropdown-link navbar-bg-hover select-none">
          <img :src="userAvatar" :style="avatarsStyle" />
          <p v-if="username" class="dark:text-white">{{ username }}</p>
        </span>
        <!-- 下拉菜单 -->
        <template #dropdown>
          <el-dropdown-menu class="logout">
            <!-- 账户设置 -->
            <el-dropdown-item>
              <InconifyIconOffline :icon="AccountSettingsIcon" style="margin: 5px" />
              账户设置
            </el-dropdown-item>
            <el-dropdown-item @click="logout">
              <InconifyIconOffline :icon="LogoutCircleRLine" style="margin: 5px" />
              退出系统
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!--系统设置-->
      <span class="set-icon navbar-bg-hover" title="设置">
        <InconifyIconOffline :icon="setting" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNav } from '../hooks/useNav'
import setting from '@iconify-icons/ri/settings-3-line'
import AccountSettingsIcon from '@iconify-icons/ri/user-settings-line'
import LogoutCircleRLine from '@iconify-icons/ri/logout-circle-r-line'
import InconifyIconOffline from '@/components/ReIcon/src/inconifyIconOffline'

const { layout, username, userAvatar, avatarsStyle, logout } = useNav()
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 48px;
  overflow: hidden;

  .hamburger-container {
    float: left;
    height: 100%;
    line-height: 48px;
    cursor: pointer;
  }

  .vertical-header-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 280px;
    height: 48px;
    color: #000000d9;

    .el-dropdown-link {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 48px;
      padding: 10px;
      color: #000000d9;
      cursor: pointer;

      p {
        font-size: 14px;
      }

      img {
        width: 22px;
        height: 22px;
        border-radius: 50%;
      }
    }
  }

  .breadcrumb-container {
    float: left;
    margin-left: 16px;
  }
}

.translation {
  ::v-deep(.el-dropdown-menu__item) {
    padding: 5px 40px;
  }

  .check-zh {
    position: absolute;
    left: 20px;
  }

  .check-en {
    position: absolute;
    left: 20px;
  }
}

.logout {
  width: 120px;

  ::v-deep(.el-dropdown-menu__item) {
    display: inline-flex;
    flex-wrap: wrap;
    min-width: 100%;
  }
}
</style>
