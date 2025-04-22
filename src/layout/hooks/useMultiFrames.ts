import { Component } from "vue"

//缓存组件的路径和组件实例的映射关系(标签页)
const MAP=new Map()

export const useMultiFrame=()=>{
    function setMap(path:string,Comp:Component){
        MAP.set(path,Comp)
    }

    function getMap(path?:string){
        if(path){
            return MAP.get(path)
        }
        return [...MAP.entries()]
    }

    function delMap(path:string){
        MAP.delete(path)
    }

    return {
        setMap,
        getMap,
        delMap,
        MAP
    }
}