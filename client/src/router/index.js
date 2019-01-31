import Vue from 'vue'
import Router from 'vue-router'
import Champs from '@/components/Champs'
import singleChamp from '@/components/singleChamp'
import Test from '@/components/test'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Champs',
      component: Champs
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/:id',
      name: 'Single Champ',
      component: singleChamp
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
