// 此文件跟同级目录的 global.d.ts 文件一样也是全局类型声明，只不过这里存放一些零散的全局类型，无需引入直接在 .vue 、.ts 、.tsx 文件使用即可获得类型提示
type Nullable<T> = T | null
//绑定了ref的htmlElement类型可接受空
type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
