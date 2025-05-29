export default function downloadByBase64(base64, fileName) {
  // 提取 Base64 数据部分
  const base64Data = base64.split(',')[1]
  // 对 Base64 数据进行解码
  const binaryData = atob(base64Data)
  const arrayBuffer = new ArrayBuffer(binaryData.length)
  const uint8Array = new Uint8Array(arrayBuffer)
  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i)
  }
  // 获取 MIME 类型
  const mimeType = base64.split(',')[0].split(':')[1].split(';')[0]
  // 创建 Blob 对象
  const blob = new Blob([arrayBuffer], { type: mimeType })
  // 创建临时 URL
  const url = URL.createObjectURL(blob)
  // 创建下载链接
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  // 模拟点击下载链接
  link.click()
  // 释放临时 URL 资源
  URL.revokeObjectURL(url)
}
