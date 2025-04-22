/**
 * description:防抖函数
 */
export function debounce(value :Function,delay:number=300){
    let timer:ReturnType<typeof setTimeout>
    return function(...args){
        clearTimeout(timer)
        timer=setTimeout(()=>{
            value.apply(this,...args)
        },delay)
    }
}