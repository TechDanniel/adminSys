// 根据角色动态生成路由
import { defineFakeRoute } from 'vite-plugin-fake-server/client'

export default defineFakeRoute([
  {
    url: '/login',
    method: 'post',
    response: ({ body }) => {
      // 设置 accessToken 的过期时间为两小时
      const expiresIn = 2 * 60 * 60 * 1000

      if (body.username === 'admin') {
        return {
          success: true,
          data: {
            avatar: 'https://avatars.githubusercontent.com/u/44761321',
            username: 'admin',
            nickname: '小铭',
            // 一个用户可能有多个角色
            roles: body.roles ? body.roles : ['admin'],
            // 按钮级别权限
            permissions: ['permission:btn:add'],
            accessToken: 'eyJhbGciOiJIUzUxMiJ9.admin',
            refreshToken: 'eyJhbGciOiJIUzUxMiJ9.adminRefresh',
            expires: expiresIn + Date.now()
          }
        }
      } else {
        return {
          success: true,
          data: {
            avatar: 'https://avatars.githubusercontent.com/u/52823142',
            username: 'common',
            nickname: '小林',
            roles: body.roles ? body.roles : ['common'],
            accessToken: 'eyJhbGciOiJIUzUxMiJ9.common',
            refreshToken: 'eyJhbGciOiJIUzUxMiJ9.commonRefresh',
            expires: expiresIn + Date.now()
          }
        }
      }
    }
  }
])
