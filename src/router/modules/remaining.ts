import {error} from "../enums";

//剩余路由
// 这段代码通过定义路由配置数组，为 Vue 应用程序配置了多个路由规则，包括登录页面、重定向页面、空白页面和账户设置页面
export default[
    {
        path:"/login",
        name:"Login",
        component:()=>import("@/login/index.vue").catch(error => {console.error('登录组件加载失败:', error)}),
        meta:{
            title:'登录',
            showLink:false,
            rank:101
        }
    },
    {
        path:"/redirect",
        component:()=>import("@/layout/index.vue"),
        meta:{
            title:"加载中",
            showLink:false,
            rank:102
        },
        children:[
            {
                // 这个路由规则能够匹配以 /redirect/ 开头的任意 URL，(这里path作为params参数传入经过redirect.vue处理后，它将重定向到path路径)
                path:":path(.*)",
                name:"Redirect"
            }
        ]
    },
    {
        path:"/error",
        redirect:"/error/403",
        meta:{
            icon:"ri:information-line",
            title:"错误页面403",
            rank:error
        },
        children:[
            {
                path:"403",
                name:"403",
                component:()=>import("@/views/error/403.vue"),
                meta:{
                    title:"403",
                }
            },
            {
                path:"404",
                name:"404",
                component:()=>import("@/views/error/404.vue"),
                meta:{
                    title:"404",
                }
            },
            {
                path:"500",
                name:"500",
                component:()=>import("@/views/error/500.vue"),
                meta:{
                    title:"500",
                }
            }
        ]
    }
]