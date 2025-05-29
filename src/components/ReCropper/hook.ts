import { unref, ref, Ref } from 'vue'
import { debounce } from '@/utils/debounce'
import Cropper from 'cropperjs'

export const useInit = (props: any, emit: any) => {
  const isReady = ref(false)
  const imgElRef = ref<ElRef<HTMLImageElement>>()

  function realTimeCroppered(RefCropper) {
    RefCropper = RefCropper === undefined ? cropper : RefCropper
    props.realTimePreview && croppered(RefCropper)
  }

  const cropper = ref<Nullable<Cropper>>()

  // 从裁剪器（cropper）获取裁剪后的图像，将其转换为 Blob 对象，再把 Blob 对象转换为 DataURL 格式，最后触发自定义事件并传递相关信息
  let inCircled = ref(props.circled)
  let imgBase64 = ref()
  function croppered(RefCropper: Ref<Nullable<Cropper>>) {
    if (!RefCropper.value) return
    // 根据 inCircled 的值决定获取何种画布
    // 如果 inCircled 为 true，调用 getRoundedCanvas 函数获取圆形裁剪的画布
    // 否则，调用 cropper.value.getCroppedCanvas() 获取裁剪后的画布
    let canvas: HTMLCanvasElement = inCircled.value ? getRoundedCanvas(RefCropper) : RefCropper.value.getCroppedCanvas()
    canvas.toBlob(blob => {
      if (!blob) return
      const fileReader: FileReader = new FileReader()
      fileReader.readAsDataURL(blob)
      fileReader.onloadend = e => {
        if (!e.target?.result || !blob) return
        imgBase64.value = e.target?.result as string
        // 触发自定义事件 "cropper"，并传递一个包含裁剪后图像信息的对象
        // 对象包含 base64 编码的图像数据、Blob 对象以及图像的大小和裁剪信息
        emit('cropper', {
          base64: e.target?.result,
          blob,
          info: { size: blob.size, ...cropper.value?.getData() }
        })
      }
      fileReader.onerror = () => {
        emit('error')
      }
    })
  }

  //圆形裁剪画布
  function getRoundedCanvas(cropper) {
    const sourceCanvas = cropper.value!.getCroppedCanvas()
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')!
    //裁剪区大小
    const width = sourceCanvas.width
    const height = sourceCanvas.height
    canvas.width = width
    canvas.height = height
    // 对图像进行缩放等操作时，浏览器会尝试对图像进行抗锯齿处理，使图像边缘看起来更加平滑、自然
    context.imageSmoothingEnabled = true
    context.drawImage(sourceCanvas, 0, 0, width, height)
    // 规定了新绘制的内容（源图像）和画布上已有的内容（目标图像）如何进行混合显示
    context.globalCompositeOperation = 'destination-in'
    context.beginPath()
    context.arc(width / 2, height / 2, Math.min(height, width) / 2, 0, 2 * Math.PI, true)
    context.fill()
    return canvas
  }

  type Options = Cropper.Options
  const debounceRealTimeCroppered = debounce(realTimeCroppered, 80)
  const defaultOptions: Options = {
    aspectRatio: 1,
    zoomable: true,
    zoomOnTouch: true,
    zoomOnWheel: true,
    cropBoxMovable: true,
    cropBoxResizable: true,
    toggleDragModeOnDblclick: true,
    autoCrop: true,
    background: true,
    highlight: true,
    center: true,
    responsive: true,
    restore: true,
    checkCrossOrigin: true,
    checkOrientation: true,
    scalable: true,
    modal: true,
    guides: true,
    movable: true,
    rotatable: true
  }

  async function init() {
    const imgEl = unref(imgElRef)
    if (!imgEl) return
    cropper.value = new Cropper(imgEl, {
      ...defaultOptions,
      ready: () => {
        isReady.value = true
        realTimeCroppered(cropper)
        setTimeout(() => emit('readied', cropper.value), 400)
      },
      crop() {
        debounceRealTimeCroppered()
      },
      zoom() {
        debounceRealTimeCroppered()
      },
      cropmove() {
        debounceRealTimeCroppered()
      },
      ...props.options
    })
  }

  return {
    croppered,
    init,
    cropper,
    inCircled,
    imgBase64,
    isReady,
    realTimeCroppered,
    imgElRef
  }
}
