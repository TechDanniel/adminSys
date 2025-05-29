import { defineStore } from 'pinia'
import { userType } from '../types'
import { DataInfo, removeToken, userKey } from '@/utils/auth'
import { refreshTokenApi, RefreshTokenResult, UserResult } from '@/http/api/user'
import { setToken } from '@/utils/auth'
import ReactiveStorage from '@/utils/ReactiveStorage'
import { getLogin } from '@/http/api/user'
import { useMultiTagsStore } from './multiTags'
import { routerArrays } from '@/layout/type'
import { resetRouter } from '@/router'
import router from '@/router'

export const useUserStore = defineStore('user', {
  state: (): userType => ({
    //头像
    avatar: ReactiveStorage.getItem<DataInfo<number>>(userKey)?.avatar ?? '',
    //用户名
    username: ReactiveStorage.getItem<DataInfo<number>>(userKey)?.username ?? '',
    //昵称
    nickname: ReactiveStorage.getItem<DataInfo<number>>(userKey)?.nickname ?? '',
    //角色
    roles: ReactiveStorage.getItem<DataInfo<number>>(userKey)?.roles ?? [],
    //权限
    permissions: ReactiveStorage.getItem<DataInfo<number>>(userKey)?.permissions ?? [],
    // 前端生成的验证码（按实际需求替换）
    verifyCode: '',
    // 判断登录页面显示哪个组件（0：登录（默认）、1：手机登录、2：二维码登录、3：注册、4：忘记密码）
    currentPage: 0,
    // 是否勾选了登录页的免登录
    isRemembered: false,
    // 登录页的免登录存储几天，默认7天
    loginDay: 7
  }),
  actions: {
    /**存储头像 */
    SET_AVATAR(avatar: string) {
      this.avatar = avatar
    },
    /** 存储用户名 */
    SET_USERNAME(username: string) {
      this.username = username
    },
    /** 存储昵称 */
    SET_NICKNAME(nickname: string) {
      this.nickname = nickname
    },
    /** 存储角色 */
    SET_ROLES(roles: Array<string>) {
      this.roles = roles
    },
    /** 存储按钮级别权限 */
    SET_PERMS(permissions: Array<string>) {
      this.permissions = permissions
    },
    /** 存储前端生成的验证码 */
    SET_VERIFYCODE(verifyCode: string) {
      this.verifyCode = verifyCode
    },
    /** 存储登录页面显示哪个组件 */
    SET_CURRENTPAGE(value: number) {
      this.currentPage = value
    },
    /** 存储是否勾选了登录页的免登录 */
    SET_ISREMEMBERED(bool: boolean) {
      this.isRemembered = bool
    },
    /** 设置登录页的免登录存储几天 */
    SET_LOGINDAY(value: number) {
      this.loginDay = Number(value)
    },

    /**账号登入 */
    async loginByUsername(data) {
      return new Promise<UserResult>((resolve, reject) => {
        getLogin(data)
          .then(data => {
            if (data?.success) setToken(data.data)
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    /**刷新token */
    //服务器返回新的token后设置浏览器本地token的值
    async handleRefreshToken(data) {
      return new Promise<RefreshTokenResult>((resolve, reject) => {
        refreshTokenApi(data)
          .then(data => {
            if (data) {
              setToken(data.data)
              resolve(data)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    //前端登出不用调用接口
    logOut() {
      this.username = ''
      this.roles = []
      this.permissions = []
      removeToken()
      useMultiTagsStore().handleTags('eqaul', [...routerArrays])
      resetRouter()
      router.push('/login')
    }
  }
})
