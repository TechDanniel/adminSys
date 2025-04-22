import { App, Component } from "vue";

// 扩展 Component 类型以包含 install 方法
type WithInstall<T>=T&{install?:(app:App)=>void}

//包装组件，提供组件全局安装的能力，也可以局部引用
export function withInstall<T extends Component>(component:WithInstall<T>):WithInstall<T>{
    //为组件添加install方法
    component.install=(app:App)=>{
        // 使用 app.component 方法全局注册组件
        app.component(component.name as string, component)
    }
    return component
}