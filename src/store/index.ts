import type { App } from 'vue'
import { createPinia } from 'pinia'

//创建pinia实例
const store = createPinia()

//这个函数用来把 Pinia 实例安装到 Vue 应用中
export function setupStore(app: App<Element>) {
  app.use(store)
}

//在其他模块中，你可以直接使用 store 进行状态管理
export { store }
