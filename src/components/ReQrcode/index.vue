<template>
    <div
        v-loading="loading"
        class="qrcode relative inline-block"
        :style="wrapStyle"
    >
       <canvas v-if="prop.tag==='canvas'" ref="wrapRef" @click="clickCode"></canvas>
       <img v-else ref="wrapRef" @click="clickCode"/> 
       <!-- 根据 props.disabled 的值来决定是否渲染一个覆盖层，这个覆盖层可用于在二维码被禁用时显示一些提示信息和操作按钮 -->
        <div 
            v-if="prop.disabled"
            class="qrcode--disabled absolute top-0 left-0 flex w-full h-full items-center justify-center"
            @click="disabledClick"
        >
            <div class="absolute top-[50%] left-[50%] font-bold">
                <inconifyIconOffline
                  class="cursor-pointer"
                  :icon="RefreshRight"
                  width="30"
                  color="var(--el-color-primary)"
                />
                <div>{{props.disabledText}}</div>
            </div>
        </div>
    </div>
</template>    

<script setup lang="ts">
import { ref ,computed,nextTick,unref,watch} from "vue";
import {props,QrcodeLogo} from "./type"
import QRCode ,{type QRCodeRenderersOptions}  from "qrcode";
import { Nullable } from "element-plus/es/components/cascader-panel/src/node.mjs";
import { deepClone } from "@/utils/deepClone";
import { isString } from "element-plus/es/utils/types.mjs";
import RefreshRight from "@iconify-icons/ep/refresh-right";
import inconifyIconOffline from "../ReIcon/src/inconifyIconOffline";


defineOptions({
    name:"ReQrcode",
})

const prop=defineProps(props)
const emit=defineEmits(["done","click","disabled-click"])
const {toCanvas,toDataURL}=QRCode
const loading=ref(true)
// Nullable<T> 表示该类型的值既可以是 T 类型，也可以是 null。
const wrapRef=ref<Nullable<HTMLCanvasElement|HTMLImageElement>>(null)
const renderText=computed(()=>{
    return String(prop.text)
})
const wrapStyle = computed(() => {
    return {
    width: prop.width + "px",
    height: prop.width + "px"
    };
});

// 对于内容少的QrCode，增大容错率
const getErrorCorrectionLevel = (content: string) => {
    if (content.length > 36) {
    return "M";
    } else if (content.length > 16) {
    return "Q";
    } else {
    return "H";
    }
};

// 建一个临时的canvas，计算原始二维码的大小
const getOriginWidth = async (
    content: string,
    options: QRCodeRenderersOptions
) => {
    const _canvas = document.createElement("canvas");
    await toCanvas(_canvas, content, options);
    return _canvas.width;
};

//初始化二维码
// 根据传入的属性 props 生成二维码，并在生成完成后触发 done 事件，同时更新加载状态
const initQRcode=async ()=>{
    // 确保在操作 DOM 之前，Vue 已经完成了模板渲染和 DOM 更新
    await nextTick()
    const options=deepClone(prop.option||{})
    if(prop.tag==="canvas"){
        options.errorCorrectionLevel=options.errorCorrectionLevel||getErrorCorrectionLevel(unref(renderText))
        const _width=await getOriginWidth(unref(renderText),options)
        options.sclae=prop.width===0?undefined:(prop.width/_width)*4
        const canvasRef=await toCanvas(unref(wrapRef)as HTMLCanvasElement,unref(renderText),options)
        //如果有logo记得渲染logo
        if(prop.logo){
            const url = await createLogoCode(canvasRef);
            emit("done", url);
            loading.value = false;
        }else{
            // toDataURL可以将 <canvas> 上绘制的二维码内容转换为一个基于 Base64 编码的数据 URL。
            emit("done",canvasRef.toDataURL())
            loading.value=false
        }
    }else{
        const url:string=await toDataURL(renderText.value,{
            errorCorrectionLevel: "H",
            width: prop.width,
            ...options
        });
        (unref(wrapRef)as HTMLImageElement).src=url;
        emit("done",url)
        loading.value=false
    }
}

//在画布上绘制logo后，更新二维码的url
const createLogoCode=(canvasRef:HTMLCanvasElement)=>{
    const canvasWidth=canvasRef.width
    const logoOptions: QrcodeLogo = Object.assign(
        {
          logoSize: 0.15,
          bgColor: "#ffffff",
          borderSize: 0.05,
          crossOrigin: "anonymous",
          borderRadius: 8,
          logoRadius: 0
        },
        isString(prop.logo) ? {} : prop.logo
    );
    //确定logo的背景及logo在二维码中的位置
    const logoSrc = isString(prop.logo) ? prop.logo : (prop.logo as QrcodeLogo).src;
    const logoWidth = canvasWidth * logoOptions.logoSize;
    const logoXY = (canvasWidth * (1 -logoOptions. logoSize)) / 2;
    const logoBgWidth = canvasWidth * (logoOptions.logoSize + logoOptions.borderSize);
    const logoBgXY = (canvasWidth * (1 - logoOptions.logoSize - logoOptions.borderSize)) / 2;

    //绘制logo底色
    const ctx=canvasRef.getContext("2d")
    if(!ctx) return
    canvasRoundRect(ctx)(logoBgXY, logoBgXY, logoBgWidth, logoBgWidth, logoOptions.borderRadius)
    ctx.fillStyle=logoOptions.bgColor
    ctx.fill()
    //绘制logo图片
    const image=new Image()
    //解决跨域问题，crossOrigin的值anonymous可以解决跨域问题
    //logo的值是对象的情况下(对象里配置了crossOrigin/logoRadius属性表示需要解决跨域)
    if(logoOptions.crossOrigin||logoOptions.logoRadius){
        image.setAttribute("crossOrigin", logoOptions.crossOrigin);
    }
    image.src=logoSrc
    const drawLogoWithImage=(image:HTMLImageElement)=>{
        ctx.drawImage(image, logoXY, logoXY, logoWidth, logoWidth);
    }
    
    //这里模拟一下假如需要对图片做复杂处理的情况（模拟给图片画圆角）
    const drawLogoWithCanvas=(image:HTMLImageElement)=>{
        //建临时画布
        const canvasImage=document.createElement("canvas")
        canvasImage.width = logoXY + logoWidth;
        canvasImage.height = logoXY + logoWidth;
        const imageCanvas = canvasImage.getContext("2d");
        if (!imageCanvas || !ctx) return;
        imageCanvas.drawImage(image, logoXY, logoXY, logoWidth, logoWidth);
        //在原来画布上画图片的圆角
        canvasRoundRect(ctx)(logoXY, logoXY, logoWidth, logoWidth, logoOptions.logoRadius);
        //将画好的图片填充到画布上
        const fillStyle = ctx.createPattern(canvasImage, "no-repeat");
        ctx.fillStyle = fillStyle;
        ctx.fill();
    }
    return new Promise((resolve)=>{
        image.onload=()=>{
            logoOptions.logoRadius?drawLogoWithCanvas(image):drawLogoWithImage(image)
            //返回画好的二维码的url
            resolve(canvasRef.toDataURL())
        }
    })
}

//返回一个函数绘制logo的圆角矩形
const canvasRoundRect=(ctx:CanvasRenderingContext2D)=>{
    // 圆角矩形左上角的 x 坐标,y坐标,宽度,高度,圆角
    return (x: number, y: number, w: number, h: number, r: number)=>{
        const minSize=Math.min(w,h)
        if(r>minSize/2){
            r=minSize/2
        }
        ctx.beginPath()
        ctx.moveTo(x+r,y)
        ctx.arcTo(x+w,y,x+w,y+h,r)
        ctx.arcTo(x+w,y+h,x,y+h,r)
        ctx.arcTo(x,y+h,x,y,r)
        ctx.arcTo(x,y,x+r,y,r) 
        ctx.closePath()
        return ctx
    }
}

//点击更新二维码
const clickCode = () => {
    emit("click");
};
//二维码被禁用时的点击事件
const disabledClick = () => {
    emit("disabled-click");
};

//监听二维码的值变化，有变化就更新二维码
watch(renderText,val=>{
    if(!val) return
    initQRcode()
},{immediate:true})
</script>