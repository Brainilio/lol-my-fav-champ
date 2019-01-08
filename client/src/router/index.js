import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Champs from '@/components/Champs'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Champs',
      name: 'Champs',
      component: Champs
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
