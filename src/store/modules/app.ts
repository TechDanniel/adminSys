import { responsiveStorageNameSpace,getConfig } from '@/config'
import ReactiveStorage from '@/utils/ReactiveStorage'

//侧边导航栏状态
import {defineStore} from 'pinia'
import { appType } from '../utils'

export const useAppStore=defineStore('app',{
    state:():appType=>({
       sidebar:{
        // 从storage里读取侧边栏是否处于打开状态；读不到就取默认值getConfig().SidebarStatus
        opened:ReactiveStorage.getItem<StorageConfigs>(`${responsiveStorageNameSpace()}layout`)?.sidebarStatus??getConfig().SidebarStatus,
        withoutAnimation:false,
        // 记录侧边栏是通过点击折叠按钮进行的切换
        // 侧边栏打开时，isClickCollapse为false，表示不是点击折叠状态；侧边栏关闭时，isClickCollapse为true，表示是点击折叠状态。
        isClickCollapse:false
       },

       // 这里的layout用于监听容器拖拉后恢复对应的导航模式
       layout:ReactiveStorage.getItem<StorageConfigs>(`${responsiveStorageNameSpace()}layout`)?.layout??getConfig().Layout,
       
       //浏览器窗口可视区域大小
       viewportSize:{
        // documentElement该属性返回文档的根元素（即 html 元素）的视口高度,不包括浏览器的菜单栏
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight
       },
    }),
    getters:{
        //侧边导航栏的状态
        getSidebarStatus(state){
            return state.sidebar.opened
        },
        getViewportWidth(state){
            return state.viewportSize.width
        },
        getViewportHeight(state){
            return state.viewportSize.height
        }
    },
    actions:{
        //用于切换侧边栏的打开或关闭状态，并根据不同的条件进行相应的设置
        TOGGLE_SIDEBAR(opened?:boolean,resize?:boolean){
            //获取本地存储的sidebar信息
            const layout=ReactiveStorage.getItem<StorageConfigs>(`${responsiveStorageNameSpace()}layout`)
            // 表示在窗口大小调整（resize）的同时，明确要求侧边栏打开（opened）。
            if(opened&&resize){
                //设置store中侧边栏无动画打开
                this.sidebar.withoutAnimation=true
                this.sidebar.opened=true
                //设置本地存储中侧边栏打开状态
                layout.sidebarStatus=true
            }
            // 表示在窗口大小调整（resize）的同时，明确要求侧边栏关闭（opened）。
            else if(!opened&&resize){
                this.sidebar.withoutAnimation=true
                this.sidebar.opened=false
                layout.sidebarStatus=false
            }
            // 表示在非窗口大小调整的情况下，通过用户点击等其他方式来切换侧边栏的状态,不传opended，为undefined
            else if(!opened&&!resize){
                this.sidebar.withoutAnimation=false
                this.sidebar.opened=!this.sidebar.opened
                this.sidebar.isClickCollapse=!this.sidebar.opened
                layout.sidebarStatus=this.sidebar.opened
            }
            //更新storage的状态
            ReactiveStorage.setItem<StorageConfigs>(`${responsiveStorageNameSpace()}layout`,layout)
        },
        //折叠展开侧边导航栏
        toggleSidebar(opened?:boolean,resize?:boolean){
            this.TOGGLE_SIDEBAR(opened,resize)
        },

        setLayout(layout){
            this.layout=layout
        },

        setViewPortSize(size){
            this.viewportSize=size
        }
    }
})