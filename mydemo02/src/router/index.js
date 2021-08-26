import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import ( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/1setup',
    name: '1setup',
    component: () =>
      import ('../views/1setup.vue')
  },
  {
    path: '/2Smzq',
    name: 'About',
    component: () =>
      import ('../views/2Smzq.vue')
  },
  {
    path: '/3reactive',
    name: 'About',
    component: () =>
      import ('../views/3reactive.vue')
  },
  {
    path: '/4ref',
    name: 'About',
    component: () =>
      import ('../views/4ref.vue')
  },
  {
    path: '/5toRef',
    name: 'About',
    component: () =>
      import ('../views/5toRef.vue')
  },  
  {
    path: '/6toRefs',
    name: 'About',
    component: () =>
      import ('../views/6toRefs.vue')
  },  
  {
    path: '/7shallowReactive',
    name: 'About',
    component: () =>
      import ('../views/7shallowReactive.vue')
  },  
  {
    path: '/7shallowReactive2',
    name: 'About',
    component: () =>
      import ('../views/7shallowReactive2.vue')
  },  
  {
    path: '/8shallowRef',
    name: 'About',
    component: () =>
      import ('../views/8shallowRef.vue')
  },    
  {
    path: '/9toRaw',
    name: 'About',
    component: () =>
      import ('../views/9toRaw.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router