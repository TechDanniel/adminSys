import { defineComponent, resolveDirective ,withDirectives,h} from 'vue'

/**封装@vueuse/motion动画库中的自定义指令v-motion */
export default defineComponent({
    name:"Motion",
    props:{
        delay:{
            type:Number,
            default:50
        }
    },
    render() {
        const {delay}=this
        //解析自定义指令，因为render函数里不能直接用v-motion指令，需要先解析出来再渲染出来
        const motion=resolveDirective("motion")
        //安装自定义指令,这样组件挂载的时候动画就生效了
        return withDirectives(
            h(
                "div",
                {},
                {
                    // this.$slots 是一个对象，它包含了组件接收到的所有插槽内容。this.$slots.default 就是默认插槽的内容
                    //相当于<div><slot/></div>
                    default:()=>[this.$slots.default()]
                }
            ),
            [
                [ motion,{initial:{opacity:0,y:100},enter:{opacity:1,y:0,transition:{delay}}}]
            ]
        )
    },
})