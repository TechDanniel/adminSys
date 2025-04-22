<template>
    <div ref="charRef" style="width: 100%; height:60px"></div>
</template>

<script setup lang="ts">
    import { ref, type PropType, onMounted, watch ,nextTick} from 'vue'
    import echarts from '@/plugins/echarts'
    //根据父组件传递过来的参数画出折线图
    const props=defineProps({
        //断言data是数组，数组的元素是数字
        data:{
            type:Array as PropType<Array<number>>,
            // 在 Vue 中，props 的默认值如果是一个对象（包括数组），
            // 需要使用一个函数来返回默认值，而不能直接赋值。
            // 这是因为对象和数组是引用类型，直接赋值会导致所有组件实例共享同一个默认值对象或数组。
            default:()=>[]
        },
        color:{
            type:String,
            default: "#41b6ff"
        }
    })

    //初始化元素（绘制折线图的容器）明确类型为 HTMLDivElement 或 null
    const charRef=ref<HTMLDivElement | null>(null)
    // : echarts.ECharts | null 是变量的类型注解部分。
    // echarts.ECharts：这是 ECharts 库中表示图表实例的类型
    let charLine: echarts.ECharts | null = null;

    //设置配置项
    const options={
        xAxis:{
            type: "category",
            show: false,
            data: props.data
        },
        yAxis: {
            show: false,
            type: "value"
        },
        series: [
            {
                data:props.data,
                type:"line",
                smooth: true,
                symbol: "none",
                color:props.color,
                lineStyle: {
                //设置折线的阴影
                    shadowOffsetY: 3,
                    shadowBlur: 7,
                    shadowColor: props.color
                }
            }
        ]
    }

    // 封装绘制图表的函数
    const drawChart = () => {
        if (charRef.value) {
            if (!charLine) {
                // 初始化 ECharts 实例
                charLine = echarts.init(charRef.value);
            }
            // 设置图表配置
            charLine.setOption(options);
        }
    };

    // 在组件挂载后绘制图表
    // 直接初始化 charRef.value 可能为 null，因为组件的 DOM 元素还未挂载到页面上，ref 还没有关联到实际的 DOM 节点
    onMounted(() => {
        nextTick(() => {
            drawChart();
        })
    });

    // 监听 props 的变化，当 data 或 color 变化时重新绘制图表
    watch([() => props.data, () => props.color], () => {
        drawChart();
    });
</script>