import {h, defineComponent} from 'vue'
import {Icon} from '@iconify/vue'

//在线使用图标
export default defineComponent({
    name:"IconifyIconOnline",
    components:{Icon},
    props:{
        icon: {
            type: String,
            default:null
        }
    },
    render(){
        const attrs=this.$attrs
        return h(Icon,{
            icon:`${this.icon}`,
            "aria-hidden":false,
            style:attrs?.style?
            Object.assign(attrs.style,{outline:"none"}):{outline:"none"},
            ...attrs
        },
        {
            default:()=>[]
        }
    )
    }
})