//关于封装请求的时候用到的类型定义
import { AxiosRequestConfig, AxiosResponse ,AxiosError, Method} from "axios";

//增加发送请求前的回调；响应请求后的回调
export interface HttpRequestConfig extends AxiosRequestConfig{
    beforeRequestCallback?:(request:HttpRequestConfig)=>void
    beforeResponseCallback?:(response:HttpResponseConfig)=>void
}

export interface HttpResponseConfig extends AxiosResponse{
    beforeResponseCallback?:(response:HttpResponseConfig)=>void
}

//异步请求失败的error类型
export interface HttpError extends AxiosError {
    isCancelRequest?: boolean;
}

//异步请求类型限制
// 使用了 TypeScript 中的 Extract 工具类型，其主要目的是从 Method 类型中提取出指定的 HTTP 请求方法类型
export type RequestMethods=Extract<
    Method,
    "get"|"post" | "put" | "delete" | "patch" | "option" | "head"
>;