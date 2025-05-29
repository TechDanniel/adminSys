import { useUserStore } from '@/store/modules/user'
import Cookies from 'js-cookie'
import ReactiveStorage from './ReactiveStorage'
//处理登录信息
export interface DataInfo<T> {
  /**token */
  accessToken: string
  /** `accessToken`的过期时间（时间戳） */
  expires: T
  /** 用于调用刷新accessToken的接口时所需的token */
  refreshToken: string
  /** 头像 */
  avatar?: string
  /** 用户名 */
  username?: string
  /** 昵称 */
  nickname?: string
  /** 当前登录用户的角色 */
  roles?: string[]
  /** 当前登录用户的按钮级别权限 */
  permissions?: string[]
}

/**
 * 通过`multiple-tabs`是否在`cookie`中，判断用户是否已经登录系统，
 * 从而支持多标签页打开已经登录的系统后无需再登录。
 * */
export const multipleTabsKey = 'multiple-tabs'

//存基础的用户信息
export const userKey = 'user-info'
//存token
export const TokenKey = 'authorized-token'

/**获取Token */
export function getToken(): DataInfo<number> {
  // 如果用户信息需要长期保留（如 “记住我” 功能），localStorage 更适合
  return Cookies.get(TokenKey) ? JSON.parse(Cookies.get(TokenKey)) : ReactiveStorage.getItem<DataInfo<number>>(userKey)
}

/**
 * @description 设置token以及一些必要的信息采用无感刷新token方案
 * 无感刷新：后端返回accessToken（访问接口使用的token），refreshToken（用于调用刷新accessToken的接口时所需的token，refreshToken的过期时间应大于acessToken的过期时间）、`expires`（`accessToken`的过期时间）
 *  将`accessToken`、`expires`、`refreshToken`这三条信息放在key值为authorized-token的cookie里（过期自动销毁）
 * 将`avatar`、`username`、`nickname`、`roles`、`permissions`、`refreshToken`、`expires`这七条信息放在key值为`user-info`的localStorage里（利用`multipleTabsKey`当浏览器完全关闭后自动销毁）
 */
// setToken 函数的主要作用是设置用户的令牌（token）和相关用户信息，包括 accessToken、refreshToken、过期时间 expires 以及用户的基本信息（如头像、用户名、昵称、角色和权限等）。
// 它会将这些信息分别存储到 Cookie 和 localStorage 中，并且支持无感刷新 token 的方案。
export function setToken(data: DataInfo<Date>) {
  //初始化accessToken 的过期时间戳
  let expires = 0
  const { accessToken, refreshToken } = data
  const { isRemembered, loginDay } = useUserStore()
  expires = new Date(data.expires).getTime()
  //存在cookie里的信息
  const accessTokenCookie = JSON.stringify({ accessToken, expires })

  //设置cookie
  //第一个参数是存在cookie中的键，第二个参数是值，第三个参数是cookie的过期时间,86400000是一天时间
  expires > 0
    ? Cookies.set(`${TokenKey}_access`, accessTokenCookie, { expires: (expires - Date.now()) / 86400000 })
    : Cookies.set(TokenKey, accessTokenCookie)

  // 存储 refreshToken
  if (refreshToken) {
    const refreshTokenCookie = JSON.stringify({ refreshToken })
    // 假设 refreshToken 的有效期为 30 天
    const refreshTokenExpires = 30
    Cookies.set(`${TokenKey}_refresh`, refreshTokenCookie, { expires: refreshTokenExpires })
  }

  //根据是否勾选了“七天免登录”设置multipleTabsKey的过期时间
  // 不设置过期时间，使其成为会话 cookie。当浏览器关闭时，该 cookie 会被删除。
  Cookies.set(multipleTabsKey, 'true', isRemembered ? { expires: loginDay } : {})

  //将其余信息存到localStorage中，还有sotre中
  function setUserKey({ avatar, username, nickname, roles, permissions }) {
    useUserStore().SET_AVATAR(avatar)
    useUserStore().SET_USERNAME(username)
    useUserStore().SET_NICKNAME(nickname)
    useUserStore().SET_ROLES(roles)
    useUserStore().SET_PERMS(permissions)
    ReactiveStorage.setItem(
      userKey,
      JSON.stringify({
        avatar,
        username,
        nickname,
        roles,
        permissions,
        refreshToken,
        expires
      })
    )
  }

  if (data.username && data.roles) {
    const { username, roles } = data
    setUserKey({
      avatar: data?.avatar ?? '',
      username,
      nickname: data?.nickname ?? '',
      roles,
      permissions: data?.permissions ?? []
    })
  } else {
    //从 localStorage 中获取之前存储的用户信息
    const avatar = ReactiveStorage.getItem<DataInfo<number>>(userKey)?.avatar ?? ''
    const username = ReactiveStorage.getItem<DataInfo<number>>(userKey)?.username ?? ''
    const nickname = ReactiveStorage.getItem<DataInfo<number>>(userKey)?.nickname ?? ''
    const roles = ReactiveStorage.getItem<DataInfo<number>>(userKey)?.roles ?? ''
    const permissions = ReactiveStorage.getItem<DataInfo<number>>(userKey)?.permissions ?? ''
    setUserKey({
      avatar,
      username,
      nickname,
      roles,
      permissions
    })
  }
}

/** 删除`token`以及key值为`user-info`的localStorage信息 */
export function removeToken() {
  Cookies.remove(TokenKey)
  Cookies.remove(multipleTabsKey)
  localStorage.removeItem(userKey)
}

/**格式化token（jwt格式） */
export const formatToken = (token: string): string => {
  // 服务器在接收到请求后，会根据Bearer令牌来进行身份验证和授权
  return 'Bearer ' + token
}
