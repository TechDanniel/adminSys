import { reactive } from 'vue'
import type { FormRules } from 'element-plus'

const isPhone = (str: string) => {
  const reg = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
  return reg.test(str)
}

const isEmail = (str: string) => {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(str)
}

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  nickname: [{ required: true, message: '用户昵称为必填项', trigger: 'blur' }],
  username: [{ required: true, message: '用户名称为必填项', trigger: 'blur' }],
  password: [{ required: true, message: '用户密码为必填项', trigger: 'blur' }],
  phone: [
    {
      validator: (_rule, value, callback) => {
        if (value === '') {
          callback()
        } else if (!isPhone(value)) {
          callback(new Error('请输入正确的手机号码格式'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
      // trigger: "click" // 如果想在点击确定按钮时触发这个校验，trigger 设置成 click 即可
    }
  ],
  email: [
    {
      validator: (_rule, value, callback) => {
        if (value === '') {
          callback()
        } else if (!isEmail(value)) {
          callback(new Error('请输入正确的邮箱格式'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})
