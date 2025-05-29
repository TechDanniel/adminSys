import { reactive } from 'vue'
import type { FormRules } from 'element-plus'

// 判断手机号格式是否正确
function isPhone(phone: string): boolean {
  // 简单的手机号正则表达式，以 1 开头，后面跟 10 位数字
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

// 判断邮箱格式是否正确
function isEmail(email: string): boolean {
  // 通用的邮箱正则表达式
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: '部门名称为必填项', trigger: 'blur' }],
  phone: [
    {
      validator: (rule, value, callback) => {
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
      validator: (rule, value, callback) => {
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
