import { oneOfType, object } from 'vue-types'
import { type QRCodeRenderersOptions } from 'qrcode'
import propTypes from '@/utils/propTypes'
import { PropType } from 'vue'

export interface QrcodeLogo {
  src?: string
  logoSize?: number
  bgColor?: string
  borderSize?: number
  crossOrigin?: string
  borderRadius?: number
  logoRadius?: number
}

export const props = {
  //二维码的标签,img或者canvas类型
  tag: propTypes.string.validate((v: string) => ['canvas', 'img'].includes(v)).def('canvas'),
  //二维码内容
  text: oneOfType([String, Array]).def(null),
  //二维码配置项
  option: object<QRCodeRenderersOptions>().def({}),
  //宽度
  width: propTypes.number.def(200),
  //用于设置二维码中间的 logo，它可以是字符串或者对象类型
  // Partial<QrcodeLogo>：Partial 是 TypeScript 的一个内置工具类型，它会将 QrcodeLogo 这个类型的所有属性都变为可选的。也就是说，当传入一个对象作为 logo 属性值时，不需要包含 QrcodeLogo 类型定义中的所有属性。
  logo: {
    type: [String, Object] as PropType<Partial<QrcodeLogo> | string>,
    default: (): QrcodeLogo | string => ''
  },
  //是否过期
  disabled: propTypes.bool.def(false),
  //过期提示内容
  disabledText: propTypes.string.def('二维码已过期')
}
