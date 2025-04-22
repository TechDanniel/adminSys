import Http from "../index";

type  notesResult= {
    items: any[]; 
    [key: string]: any; // 允许有其他任意属性
};

type Result = {
    success: boolean;
    data?: notesResult;
};

export const getList=()=>{
    return Http.request<Result>("get","/notes")
}