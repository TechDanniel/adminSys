export default {
  path: '/',
  name: 'Home',
  component: () => import('@/layout/index.vue'),
  redirect: '/welcome',
  meta: {
    icon: 'ep:home-filled',
    title: '首页',
    rank: 0
  },
  children: [
    {
      path: 'welcome',
      name: 'Welcome',
      component: () => import('@/views/home/index.vue'),
      meta: {
        icon: 'ep:home-filled',
        title: '首页'
      }
    }
  ]
} satisfies RouteConfigsTable
// 如果 routes 对象不满足 RouteConfigsTable 类型的要求，TypeScript 编译器会报错。
