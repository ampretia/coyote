import Vue from 'vue'
import Router from 'vue-router'
import SelectAspects from '@/components/SelectAspects'
import SelectPath from '@/components/SelectPath'
import Text from '@/components/Text'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: SelectPath
    },
    {
      path: '/aspects',
      name: 'index',
      component: SelectAspects
    },
    {
      path: '/text',
      name: 'text',
      component: Text
    }
  ]
})
