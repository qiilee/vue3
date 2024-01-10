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
      import ('../views/demo/1setup.vue')
  },
  {
    path: '/2Smzq',
    name: '2Smzq',
    component: () =>
      import ('../views/demo/2Smzq.vue')
  },
  {
    path: '/3reactive',
    name: '3reactive',
    component: () =>
      import ('../views/demo/3reactive.vue')
  },
  {
    path: '/4ref',
    name: '4ref',
    component: () =>
      import ('../views/demo/4ref.vue')
  },
  {
    path: '/5toRef',
    name: '5toRef',
    component: () =>
      import ('../views/demo/5toRef.vue')
  },  
  {
    path: '/6toRefs',
    name: '6toRefs',
    component: () =>
      import ('../views/demo/6toRefs.vue')
  },  
  {
    path: '/7shallowReactive',
    name: '7shallowReactive',
    component: () =>
      import ('../views/demo/7shallowReactive.vue')
  },  
  {
    path: '/7shallowReactive2',
    name: '7shallowReactive2',
    component: () =>
      import ('../views/demo/7shallowReactive2.vue')
  },  
  {
    path: '/8shallowRef',
    name: '8shallowRef',
    component: () =>
      import ('../views/demo/8shallowRef.vue')
  },    
  {
    path: '/9toRaw',
    name: '9toRaw',
    component: () =>
      import ('../views/demo/9toRaw.vue')
  },
  {
    path: '/10markRaw',
    name: '10markRaw',
    component: () =>
      import ('../views/demo/10markRaw.vue')
  },  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router