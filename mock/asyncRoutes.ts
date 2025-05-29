// 模拟后端动态生成路由
import { defineFakeRoute } from 'vite-plugin-fake-server/client'
import { system, permission } from '../src/router/enums'

/**
 * roles：页面级别权限，这里模拟二种 "admin"、"common"
 * admin：管理员角色
 * common：普通角色
 */

const systemManagementRouter = {
  path: '/system',
  meta: {
    icon: 'ri:settings-3-line',
    title: '系统管理',
    rank: system
  },
  children: [
    {
      path: '/system/user/index',
      name: 'SystemUser',
      meta: {
        icon: 'ri:admin-line',
        title: '用户管理',
        roles: ['admin'],
        keepAlive: true // 标记需要缓存
      }
    },
    {
      path: '/system/dept/index',
      name: 'SystemDept',
      meta: {
        icon: 'ri:git-branch-line',
        title: '部门管理',
        roles: ['admin'],
        keepAlive: true
      }
    }
  ]
}

const permissionRouter = {
  path: '/permission',
  meta: {
    title: '权限管理',
    icon: 'ep:lollipop',
    rank: permission
  },
  children: [
    {
      path: '/permission/role/index',
      name: 'PermissionRole',
      meta: {
        icon: 'ri:admin-fill',
        title: '角色管理',
        roles: ['admin'],
        keepAlive: true // 标记需要缓存
      }
    },
    {
      path: '/permission/userPermission/index',
      name: 'PermissionUserPermission',
      meta: {
        icon: 'ep:menu',
        title: '用户权限',
        roles: ['admin']
      }
    }
  ]
}

export default defineFakeRoute([
  {
    url: '/get-async-routes',
    method: 'get',
    response: () => {
      return {
        success: true,
        data: [systemManagementRouter, permissionRouter]
      }
    }
  }
])
