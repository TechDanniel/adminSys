export default {
  path: '/production',
  name: 'Production',
  redirect: '/production/index',
  meta: {
    icon: 'ri:edit-box-line',
    title: '产品管理'
  },
  children: [
    {
      path: 'production/index',
      name: 'ProductionIndex',
      component: () => import('@/views/production/index.vue'),
      meta: {
        title: '产品概览',
        icon: 'ep:document',
        auths: ['permission:btn:add']
      }
    }
  ]
}
