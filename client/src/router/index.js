import Vue from 'vue'
import Router from 'vue-router'
import Champs from '@/components/Champs'
import singleChamp from '@/components/singleChamp'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Champs',
      component: Champs
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
