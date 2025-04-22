// h：这是 Vue 3 中的 createVNode 函数的别名，用于手动创建虚拟节点。
import {h,defineComponent} from 'vue'
import {Icon ,type IconifyIcon,addIcon} from "@iconify/vue/dist/offline"

// Iconify Icon在Vue里本地使用,将图标加入本地库（用于内网环境）
//这里定义了一个组件IconifyIconOffline，该组件可以接收icon属性，将对应的图标保存到本地
export default defineComponent({
    name:"IconifyIconOffline",
    //注册 IconifyIcon 组件，以便在当前组件中使用
    components: { Icon },
    props: {
        icon: {
            type: [String, Object],
            default: null
        }
    },

    // render 函数在 Vue 中的作用是提供一个替代模板的方式来定义组件的结构。它允许你使用 JavaScript 代码来创建虚拟 DOM 节点，从而实现更高的灵活性和动态性。   
    render() {
        //如果接受到一个图标对象，调用 addIcon 函数将该图标数据添加到 本地Iconify 图标库中，实现离线使用。
        //1. 第一个参数：图标的名称或图标对象的名称部分。一般是一个字符串，用于标识图标。
        //2. 第二个参数：图标的完整数据。一般是一个对象，包含了图标的所有详细信息。

        // 生成唯一的图标名称
        let iconName=`custom-icon-${Date.now()}`;
        if(typeof this.icon === 'object'){
            const iconify=this.icon as IconifyIcon
            addIcon(iconName,iconify)
        }
        
        //收集除icon信息外其他属性信息
        const attrs=this.$attrs
        //Icon是导入的图标组件
        return h(
            'div', // 添加外层div元素
            {
                style: { display: 'inline-block' } // 可以根据需要调整样式
            },
            [
                h(
                    Icon,
                    {
                        icon: typeof this.icon === 'string' ? this.icon : iconName,
                        // 被辅助设备识别,outline:none表示图标没有外边框
                        "aria-hidden": false,
                        style: attrs?.style ?
                            Object.assign(attrs.style, { outline: "none" }) : { outline: "none" },
                        // 剩下的属性也要加在图标上
                        ...attrs
                    },
                    // 插槽定义
                    {
                        default: () => []
                    }
                )
            ]
        );
    },
})