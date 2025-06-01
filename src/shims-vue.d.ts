//TypeScript 默认不认识 .vue 文件，直接导入会报错
//让 TypeScript 将 .vue 单文件组件识别为一个合法的模块，并知道它默认导出一个 Vue 组件（DefineComponent 类型）。
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

//允许 TypeScript 理解通过 import 导入的 SCSS 文件（如变量文件
declare module "*.scss" {
  const scss: Record<string, string>;
  export default scss;
}

//为没有自带类型声明（如缺少 @types/xxx）的第三方库提供“通行证”，告诉 TypeScript 这些模块是存在的，避免报错：