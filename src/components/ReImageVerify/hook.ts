import { ref, onMounted } from 'vue'

/**
 * 绘制图形验证码
 * @param width - 图形宽度
 * @param height - 图形高度
 */
export const useImageVerify = (width = 120, height = 40) => {
  //画布
  const domRef = ref<HTMLCanvasElement>()
  //验证码
  const imgCode = ref('')

  function setImgCode(code: string) {
    imgCode.value = code
  }

  //每次点击生成新的图形验证码并返回验证码数字
  function getImgCode() {
    if (!domRef.value) return
    imgCode.value = draw(domRef.value, width, height)
  }

  onMounted(() => {
    getImgCode()
  })

  return {
    domRef,
    imgCode,
    setImgCode,
    getImgCode
  }
}

//生成随机数字
function randomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

//生成随机颜色
function randomColor(min: number, max: number) {
  const r = randomNum(min, max)
  const g = randomNum(min, max)
  const b = randomNum(min, max)
  return `rgb(${r},${g},${b})`
}

//绘制图形验证码
function draw(dom: HTMLCanvasElement, width: number, height: number) {
  let imgCode = ''
  const ctx = dom.getContext('2d')
  if (!ctx) return imgCode
  //绘制矩形
  ctx.fillStyle = randomColor(180, 230)
  ctx.fillRect(0, 0, width, height)
  //绘制4个随机数字
  for (let i = 0; i < 4; i++) {
    const text = randomNum(0, 9).toString()
    imgCode += text
    const fontSize = randomNum(25, 35)
    const deg = randomNum(-30, 30)
    ctx.save()

    // 设置与背景区分明显的字体颜色
    ctx.fillStyle = randomColor(0, 100)
    ctx.font = `${fontSize}px Simhei`
    ctx.textBaseline = 'top'
    ctx.translate(25 * i + 15, 5)
    ctx.rotate((deg * Math.PI) / 180)
    ctx.fillText(text, 0, 0)
    ctx.restore()
  }
  //绘制干扰线
  for (let i = 0; i < 5; i++) {
    ctx.beginPath()
    ctx.moveTo(randomNum(0, width), randomNum(0, height))
    ctx.lineTo(randomNum(0, width), randomNum(0, height))
    ctx.strokeStyle = randomColor(180, 230)
    ctx.stroke()
  }
  //绘制干扰点
  for (let i = 0; i <= 40; i++) {
    ctx.beginPath()
    ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI)
    ctx.fillStyle = randomColor(180, 230)
    ctx.fill()
  }
  return imgCode
}
