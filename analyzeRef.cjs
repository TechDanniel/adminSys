//分析模块被引用的次数，组件的复用率
const fs=require('fs')
const path=require('path')
//读取rollup-plugin-visualizer 生成的json报告，分析依赖
const reportPath=path.join(__dirname,'stats.json')
const report=JSON.parse(fs.readFileSync(reportPath,'utf8'))

//定义要查找的组件的名称
const componentNames=['ReTable','ReDialog','ReIcon']

//提取组件的引用信息
const componentReferences={}
const map=report.nodeMetas
componentNames.forEach(componentName => {
    componentReferences[componentName] =0
    for (const key in map) {
        const module = map[key];
        if (module.id.includes(componentName)) {
            componentReferences[componentName] += module.importedBy?module.importedBy.length:0;
        }
    }
});
console.log(componentReferences)