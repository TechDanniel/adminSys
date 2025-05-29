import { ref } from 'vue'
import { FormInstance, FormItemProp } from 'element-plus'
import { deepClone } from '@/utils/deepClone'

const isDisabled = ref(false)
const timer = ref(null)
const text = ref('获取验证码')

export const useVeriyfyCode = () => {
  const start = async (formEl: FormInstance | undefined, props: FormItemProp, time = 60) => {
    if (!formEl) return
    const initTime = deepClone(time)
    //手机号验证正确就开始倒计时
    await formEl.validateField(props, isValid => {
      if (isValid) {
        clearInterval(timer.value)
        isDisabled.value = true
        text.value = `${time}`
        timer.value = setInterval(() => {
          if (time > 0) {
            time--
            text.value = `${time}`
          } else {
            text.value = '获取验证码'
            isDisabled.value = false
            clearInterval(timer.value)
            time = initTime
          }
        }, 1000)
      }
    })
  }

  const end = () => {
    text.value = '获取验证码'
    isDisabled.value = false
    clearInterval(timer.value)
  }
  return {
    isDisabled,
    timer,
    text,
    start,
    end
  }
}
