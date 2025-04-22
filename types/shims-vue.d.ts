//为 vue 模块添加或修改类型定义的重要语法
// 有时候，你可能会使用一些自定义的插件或者扩展，这些扩展可能会给 Vue 实例或者组件选项添加新的属性或方法。
// 这时就可以使用 declare module 'vue' 来扩展 Vue 的类型定义，让 TypeScript 能够识别这些新增的内容。
import { Component } from 'vue';

declare module 'vue' {
  interface Component {
    //import('vue')动态引入模块
    install?: (app: import('vue').App) => void;
  }
}

declare module '*.svg?component' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'tailwindcss' {
  interface CorePlugins {
    preflight?: boolean;
  }
  
  interface Config {
    corePlugins?: CorePlugins | false;
  }
}