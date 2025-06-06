import http from '../index'

type Result = {
  success: boolean
  data?: Array<any>
}

type ResultTable = {
  success: boolean
  data?: {
    /** 列表数据 */
    list: Array<any>
    /** 总条目数 */
    total?: number
    /** 每页显示条目个数 */
    pageSize?: number
    /** 当前页数 */
    currentPage?: number
  }
}

/** 获取系统管理-用户管理列表 */
export const getUserList = (data?: object) => {
  return http.request<ResultTable>('post', '/user', { data })
}

/** 系统管理-用户管理-获取所有角色列表 */
export const getAllRoleList = () => {
  return http.request<Result>('get', '/list-all-role')
}

/** 系统管理-用户管理-根据userId，获取对应角色id列表（userId：用户id） */
export const getRoleIds = (data?: object) => {
  return http.request<Result>('post', '/list-role-ids', { data })
}

/** 获取系统管理-菜单管理列表 */
export const getMenuList = (data?: object) => {
  return http.request<Result>('post', '/menu', { data })
}

/** 获取系统管理-部门管理列表 */
export const getDeptList = (data?: object) => {
  return http.request<Result>('post', '/dept', { data })
}

/** 获取角色管理-权限-菜单权限 */
export const getRoleMenu = (data?: object) => {
  return http.request<Result>('post', '/role-menu', { data })
}

/** 获取系统管理-角色管理列表 */
export const getRoleList = (data?: object) => {
  return http.request<ResultTable>('post', '/role', { data })
}

/** 获取角色管理-权限-菜单权限-根据角色 id 查对应菜单 */
export const getRoleMenuIds = (data?: object) => {
  return http.request<Result>('post', '/role-menu-ids', { data })
}

/**获取用户权限列表 */
export const getUserPermission = (data?: object) => {
  return http.request<ResultTable>('post', '/user-permission', { data })
}
