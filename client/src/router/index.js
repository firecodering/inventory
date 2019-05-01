import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import Items from '../components/Items'
import AddItem from '../components/AddItem'
import incoming from '../components/incoming'
import outgoing from '../components/outgoing'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/items',
      name: 'Items',
      component: Items
    },
    {
      path: '/items/Add Item',
      name: 'AddItem',
      component: AddItem
    },
    {
      path: '/incoming',
      name: 'incoming',
      component: incoming
    },
    {
      path: '/outgoing',
      name: 'outgoing',
      component: outgoing
    }
  ]
})
