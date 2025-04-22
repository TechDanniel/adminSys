//定义普通动画
import { defineComponent,reactive,watch,computed,unref,h ,onMounted} from 'vue'
import { countToProps } from "./props";

export default defineComponent({
    name:"ReNormalCountTo",
    props:countToProps,
    emits:["mounted","callback"],

    setup(props,{emit}){
        //格式化数字
            // decimals：表示要保留的小数位数。
            // decimal：表示小数点符号，例如 . 或 ,。
            // separator：表示千位分隔符，例如 , 或 .。
            // suffix：表示要添加到数字后面的后缀，例如 %。
            // prefix：表示要添加到数字前面的前缀，例如 $。
            function formatNumber(num:number|string){
                const { decimals, decimal, separator, suffix, prefix } = props;
                // 使用 toFixed 方法将数字保留指定的小数位数，并返回一个字符串。
                num=Number(num).toFixed(decimals)
                // 分离整数部分和小数部分
                const x=num.split(".")
                let x1=x[0]//整数
                const x2=x.length>1?decimal+x[1]:""
                // 添加千位分隔符
                const rgx=/(\d+)(\d{3})/
                if(separator){
                    while(rgx.test(x1)){
                        x1=x1.replace(rgx,"$1"+separator+"$2")
                    }
                }
                return prefix+x1+x2+suffix
            }

        // 初始化计数状态
        const state=reactive<{
            localStartVal: number;
            // 计算和显示实时的计数结果
            printVal: number | null;
            // 显示的格式化后的字符串值
            // 直接在界面上显示给用户，确保计数结果以合适的格式呈现，例如添加千位分隔符、处理小数等。
            displayValue: string;
            paused: boolean;
            localDuration: number;
            // 当计数动画开始时，会记录当前的时间戳作为起始时间。
            startTime: number | null;
            // 当前的时间戳，在动画执行过程中，会不断更新这个值为当前的时间。
            timestamp: number | null;
            // 这个属性用于存储 requestAnimationFrame 的返回值，以便后续可以取消动画。
            rAF: any;
            // 剩余的动画时间。它表示从当前时刻到动画结束还需要的时间。
            remaining: number | null;
            color: string|null;
            fontSize: string;
        }>({
            localStartVal: props.startVal,
            displayValue:formatNumber(props.startVal),
            printVal: null,
            paused: false,
            localDuration: props.duration,
            startTime: null,
            timestamp: null,
            remaining: null,
            rAF: null,
            color: props.color,
            fontSize: "16px"
        })

        // 判断是否是倒计时
        const getCountDown=computed(()=>{
            return props.startVal>props.endVal
        })

        //监听 props.startVal 和 props.endVal 的变化，当它们发生变化且 props.autoplay 为 true 时，调用 start 函数开始计数
        watch([()=>props.startVal,()=>props.endVal],()=>{
            if(props.autoplay){
                start()
            }
        })

        //使用 requestAnimationFrame 开始动画循环，调用 count 函数。
        const start=()=>{
            state.rAF = requestAnimationFrame(count);
        }

        // 切换计数的暂停和恢复状态，如果当前是暂停状态，则调用 resume 方法恢复计数；否则调用 pause 方法暂停计数。
        const pauseResume=()=>{
            if(state.paused){
                resume()
                state.paused=false
            }else{
                pause()
                state.paused=true
            }
        }

        function pause(){
            cancelAnimationFrame(state.rAF);
        }

        function resume() {
            state.startTime = null;
            state.localDuration = state.remaining as number;
            state.localStartVal =state.printVal as number;
            requestAnimationFrame(count);
          }

          function reset() {
            state.startTime = null;
            cancelAnimationFrame(state.rAF);
            state.displayValue = formatNumber(props.startVal);
          }

        //定义动画
        function count(timestamp:number){
            const{useEasing,easingFn,endVal}=props
            if(!state.startTime) state.startTime=timestamp
            //更新现在的数字
            state.timestamp=timestamp
            const progress=timestamp-state.startTime
            state.remaining=state.localDuration-progress
            if(useEasing){
                // unref 函数的作用是自动解包 ref 对象。如果传入的参数是一个 ref 对象，它会返回该 ref 对象的 .value 属性；如果传入的不是 ref 对象，它会直接返回传入的参数本身。
                //computed计算的值默认是ref需要.value
                if(unref(getCountDown)){
                    state.printVal==state.localStartVal-
                    easingFn(progress,0,endVal-state.localStartVal,state.localDuration)
                }else{
                    state.printVal = easingFn(progress,state.localStartVal,endVal - state.localStartVal,state.localDuration)   
                }
            }else{
                if(unref(getCountDown)){
                    state.printVal=state.localStartVal-(state.localStartVal-endVal)*(progress/state.localDuration)
                }else{
                    state.printVal=state.localStartVal+(endVal-state.localStartVal)*(progress/state.localDuration)
                }
            }

            //显示结果不能超出正常范围
            if (unref(getCountDown)) {
                state.printVal = state.printVal as number < endVal ? endVal : state.printVal;
              } else {
                state.printVal = state.printVal as number> endVal ? endVal : state.printVal;
            }

            //要显示在屏幕上的数字字符串
            state.displayValue=formatNumber(state.printVal as number)

            //判断动画是要继续，还是到时间了触发回调
            if (progress < (state.localDuration as number)) {
                state.rAF = requestAnimationFrame(count);
            } else {
                emit("callback");
            }
        }

        //是否自动开始动画，并执行开始动画后的回调函数
        onMounted(()=>{
            if(props.autoplay){
                start()
            }   
            emit("mounted")
        })
        
        // 返回渲染函数
        return () =>
            h("span", {
                style: {
                color: props.color,
                fontSize: props.fontSize
                }
            }, state.displayValue);
    }
})