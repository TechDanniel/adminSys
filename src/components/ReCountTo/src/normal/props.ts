//初始化数字动画组件所需要的参数
//存储一些属性及其默认配置，通常用于组件的属性设置
import type{PropType} from 'vue'
import propTypes from "@/utils/propTypes"

export const countToProps={
    // 起始值，类型为数字，默认值为 0
  startVal: propTypes.number.def(0),
  // 结束值，类型为数字，默认值为 2020
  endVal: propTypes.number.def(2020),
  // 动画持续时间，类型为数字，单位可能是毫秒，默认值为 1300
  duration: propTypes.number.def(1300),
  // 是否自动播放，类型为布尔值，默认值为 true
  autoplay: propTypes.bool.def(true),
  // 小数位数
  decimals:propTypes.number.validate((value:number)=>{return value>=0}),
  // 文本颜色，类型为字符串，默认值为空
  color: propTypes.string.def(),
  // 字体大小，类型为字符串，默认值为空
  fontSize: propTypes.string.def(),
  // 小数点符号，类型为字符串，默认值为 "."
  decimal: propTypes.string.def("."),
  // 千位分隔符，类型为字符串，默认值为 ","
  separator: propTypes.string.def(","),
  // 前缀，类型为字符串，默认值为空字符串
  prefix: propTypes.string.def(""),
  // 后缀，类型为字符串，默认值为空字符串
  suffix: propTypes.string.def(""),
  // 是否使用缓动函数，类型为布尔值，默认值为 true
  useEasing: propTypes.bool.def(true),
  // 缓动函数
  easingFn: {
    // 类型为函数，函数接受四个参数 t, b, c, d，返回一个数字
    type: Function as PropType<
      (t: number, b: number, c: number, d: number) => number
    >,
    // 默认的缓动函数
    // 动画开始时速度较慢，随着时间的推移速度逐渐加快
    default:(t: number, b: number, c: number, d: number)=> {
      return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
    }
  }
}
