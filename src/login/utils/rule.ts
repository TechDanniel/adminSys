import { reactive } from 'vue'
import type { FormRules } from 'element-plus'
import { useUserStore } from '@/store/modules/user'

export const REGEXP_PWD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
/**登录校验 */
export const loginRules = reactive<FormRules>({
  password: [
    {
      validator: (_rule, value, callback) => {
        if (value === '') {
          callback(new Error('账号不能为空'))
        } else if (!REGEXP_PWD.test(value)) {
          callback(new Error('必须包括字母和数字两种字符,长度至少6位'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  verifyCode: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('密码不能为空'))
        } else if (useUserStore().verifyCode !== value) {
          callback(new Error('验证码错误'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

/** 手机登录校验 */
/** 6位数字验证码正则 */
const REGEXP_SIX = /^\d{6}$/
const isPhone = (value): boolean => {
  const REG = /^1[3-9]\d{9}$/
  if (REG.test(value)) {
    return true
  }
  return false
}
export const phoneRules = reactive<FormRules>({
  phone: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'))
        } else if (!isPhone(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  verifyCode: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'))
        } else if (!REGEXP_SIX.test(value)) {
          callback(new Error())
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

/** 手机注册 */
export const updateRules = reactive<FormRules>({
  phone: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('手机号不能为空'))
        } else if (!isPhone(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  verifyCode: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('验证码不能为空'))
        } else if (!REGEXP_SIX.test(value)) {
          callback(new Error('请输入正确的验证码'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  password: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('密码不能为空'))
        } else if (!REGEXP_PWD.test(value)) {
          callback(new Error('必须包括字母和数字两种字符，长度至少6位'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})
