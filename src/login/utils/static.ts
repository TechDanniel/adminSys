// ?component 查询参数告诉 Vite 把 avatar.svg 文件当作 Vue 组件来处理，这样你就能直接在模板里使用这个组件了。
import bg from '@/assets/login/bg.png'
import avatar from '@/assets/login/avatar.svg?component'
import illustration from '@/assets/login/illustration.svg?component'

export { bg, avatar, illustration }
