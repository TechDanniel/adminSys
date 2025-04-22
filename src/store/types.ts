import type { RouteRecordName } from "vue-router";

//侧边导航的数据类型
export type appType={
    sidebar:{
        // 侧边栏是否处于打开状态
        opened:boolean;
        // 侧边栏的显示或隐藏是否不使用动画效果
        withoutAnimation:boolean;
        //判断是否手动点击折叠
        isClickCollapse:boolean
    };
    // 应用程序的布局类型
    layout:string;
    // 描述浏览器视口的尺寸
    viewportSize:{
        width:number;
        height:number
    }
}

//对缓存页面的操作
export type cacheType = {
    mode: string;
    name?: RouteRecordName;
};

//标签页
export type multiType = {
    path: string;
    name: string;
    meta: any;
    query?: object;
    params?: object;
};  

//制定删除标签页的起始位置和长度
export type positionType = {
    startIndex?: number;
    length?: number;
};

//用户信息
export type userType = {
    avatar?: string;
    username?: string;
    nickname?: string;
    roles?: string[];
    permissions?:string[];
    verifyCode?: string;
    currentPage?: number;
    isRemembered?: boolean;
    loginDay?: number;
};

//设置标题，固定头部，隐藏侧边栏
export type setType = {
    title: string;
    fixedHeader: boolean;
    hiddenSideBar: boolean;
};