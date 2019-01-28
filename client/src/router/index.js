import Vue from 'vue'
import Router from 'vue-router'
import Champs from '@/components/Champs'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Champs',
      component: Champs
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
