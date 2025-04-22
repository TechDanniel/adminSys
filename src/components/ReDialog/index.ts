import { DialogOptions } from "./type";
import { ref } from "vue";

const dialogStore=ref<Array<DialogOptions>>([])

/**打开对话框 */
const addDialog=(options:DialogOptions)=>{
    const open=()=>{
        dialogStore.value.push(Object.assign(options,{visible:true}))
    }
    if(options?.openDelay){
        setTimeout(()=>{
            open()
        },options.openDelay)
    }else{
        open()
    }
}

/** 关闭弹框 */
const closeDialog = (options: DialogOptions, index: number, args?: any) => {
    dialogStore.value[index].visible = false;
    options.closeCallBack && options.closeCallBack({ options, index, args });
  
    const closeDelay = options?.closeDelay ?? 200;
    setTimeout(() => {
      dialogStore.value.splice(index, 1);
    }, closeDelay);
};

export { addDialog,closeDialog,dialogStore }