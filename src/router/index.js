import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/Index'),
      children: [
        // Dashboard
        {
          name: 'Main',
          path: '',
          component: () => import('@/views/Home'),
        },
        {
          name: 'Ver reuniones',
          path: '/reuniones/ver',
          component: () => import('@/views/ShowReuniones'),
        },
      ],
    },
  ],
})
