import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: require('@/components/Blank').default
    },
    {
      path: '/settings',
      name: 'settings',
      component: require('@/components/Settings').default
    },
    {
      path: '/feeds/:feedId',
      name: 'posts',
      component: require('@/components/Posts').default,
      beforeEnter: (to, from, next) => {
        if (!store.getters.feedById(to.params.feedId)) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/addfeed',
      name: 'addfeed',
      component: require('@/components/AddFeed').default
    },
    {
      path: '/addbatch',
      name: 'addbatch',
      component: require('@/components/AddBatch').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
