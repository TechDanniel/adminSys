import ReactiveStorage from "@/utils/ReactiveStorage";
import { ref,computed,reactive } from "vue";
import { responsiveStorageNameSpace } from "@/config";
import { useMultiTagsStore } from "@/store/modules/multiTags";
import { useRoute } from "vue-router";
import { CSSProperties,getCurrentInstance } from "vue";
import { tagsViewsType } from "../type";
import { isBoolean } from "lodash";
import _ from "lodash"

import CloseAllTags from "@iconify-icons/ri/subtract-line";
import CloseOtherTags from "@iconify-icons/ri/text-spacing";
import RefreshRight from "@iconify-icons/ep/refresh-right";
import Close from "@iconify-icons/ep/close";


export function useTags(){
    //标签项进度条的显示位置，受移入移出影响
    const activeIndex = ref(-1);
    //获取当前实例
    const instance = getCurrentInstance();
    /** 是否隐藏标签页，默认显示 */
    const showTags =
    ref(
        ReactiveStorage.getItem<StorageConfigs>(
        `${responsiveStorageNameSpace()}configure`
        ).hideTabs
    ) ?? ref("false");

    //当前是否滚动
    const isScrolling = ref(false);

    //当前标签页滚动距离
    const translateX = ref(0);

    //获取要展示的标签页
    const multiTags: any = computed(() => {
        return useMultiTagsStore().multiTags;
    });

    //获得当前路由信息
    const route=useRoute()

    //标签页的样式
    const getTabStyle = computed((): CSSProperties => {
        return {
          transform: `translateX(${translateX.value}px)`,
          transition: isScrolling.value ? "none" : "transform 0.5s ease-in-out"
        };
      });

    //功能区
    const tagsViews = reactive<Array<tagsViewsType>>([
        {
          icon: RefreshRight,
          text: "重新加载",
          divided: false,
          get disabled() {
            return false;
          },
          show: true
        },
        {
          icon: Close,
          text: "关闭当前标签页",
          divided: false,
          get disabled() {
            return multiTags.value.length > 1 ? false : true;
          },
          show: true
        },
        {
          icon: CloseOtherTags,
          text: "关闭其他标签页",
          divided: true,
          get disabled() {
            return multiTags.value.length > 2 ? false : true;
          },
          show: true
        },
        {
          icon: CloseAllTags,
          text: "关闭全部标签页",
          divided: false,
          get disabled() {
            return multiTags.value.length > 1 ? false : true;
          },
          show: true
        }
      ]);

      /** 鼠标移入添加激活样式 */
    function onMouseenter(index) {
        if (index) activeIndex.value = index;
        const dom=instance.refs["dynamic" + index][0] as HTMLElement
        if (dom.classList.contains ("is-active")) return;
        // 当 ref 绑定到原生 DOM 元素上时，instance.refs 中对应的值就是该 DOM 元素的引用
        dom.classList.add("card-in");
        dom.classList.remove("card-out")
    }

     /** 鼠标移出恢复默认样式 */
    function onMouseleave(index) {
        activeIndex.value = -1;
        const dom=instance.refs["dynamic" + index][0] as HTMLElement
        if (dom.classList.contains ("is-active")) return;
        dom.classList.remove("card-in");
        dom.classList.add("card-out")
    }

    //根据传入item路由信息判断它是否是激活状态，如果是就返回previous类
    function conditionHandle(item,previous,next){
      if(isBoolean(route?.meta?.showLink)&&route?.meta?.showLink===false){
          if(Object.keys(route.query).length>0){
              return _.isEqual(route.query,item.query) ?previous:next
          }else{
              return _.isEqual(route.params,item.params) ?previous:next
          }
      }else{
          return route.path===item.path?previous:next
      }
    }

    //标签页底部蓝色进度条
    const scheduleIsActive = computed(() => {
      console.log(multiTags.value);
      return item => {
        return conditionHandle(item, "schedule-active", "");
      };
    });

    //该标签是否激活，返回css类
    const linkIsActive=computed(()=>{
      return item=>{
          return conditionHandle(item,"is-active","")
      }
    })
    //该标签是否是固定标签
    const isFixedTag=computed(()=>{
      return (item,index)=>{
          if(index===0) return
          return conditionHandle(item,true,false)
      }
    })
    //icon是否激活
    const iconIsActive = computed(() => {
      return (item, index) => {
        if (index === 0) return;
        return conditionHandle(item, true, false);
      };
    });

    return{
        showTags,
        isScrolling,
        translateX,
        multiTags,
        route,
        getTabStyle,
        tagsViews,
        activeIndex,
        onMouseenter,
        onMouseleave,
        instance,
        scheduleIsActive,
        conditionHandle,
        linkIsActive,
        isFixedTag,
        iconIsActive
    }
}