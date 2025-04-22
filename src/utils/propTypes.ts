// CSSProperties 用于表示 CSS 样式对象，VNodeChild 表示虚拟节点的子节点类型。

//  VueTypesInterface 是 vue-types 接口类型，VueTypeValidableDef 是可验证属性类型的定义类型（对组件的属性进行类型定义和验证）
//createTypes 用于创建自定义的属性类型集合，toValidableType 用于创建可验证的属性类型
import {
    createTypes,
    toValidableType,
  } from "vue-types";


//创建自定义属性集合,让这些类型有检查验证功能
const newPropsTypes=createTypes({
    func:undefined,
    bool:undefined,
    string:undefined,
    number:undefined,
    object:undefined,
    integer:undefined,
})

export default class propTypes extends newPropsTypes{
    //定义实例方法
    static get style(){
        return toValidableType("style",{
            type:[String,Object]
        })
    }

    static get VNodeChild(){
        return toValidableType("VNodeChild", {
        type: undefined // 表示可以是任意类型
    })
    }
}

//propTypes类扩展了vue-type的属性类型，身上包括我们定义的类型集合和style，VNodeChild类型，这些类型都是可验证的，身上有Ref，isRequired，default方法
