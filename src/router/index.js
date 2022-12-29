import { createRouter, createWebHashHistory } from 'vue-router'
import home from "@/views/home";
import Findtop from "@/views/Find/Findtop";
import Identify from "@/views/Find/child/identify";
import Playlist from "@/views/Find/child/playlist";
import Ranklist from "@/views/Find/child/ranklist";
import Songer from "@/views/Find/child/songer";


const routes = [
  {path: '/',redirect:'/home'},
  {
    path: '/home',
    name: 'home',
    component: home,
    children:[
      {path: '/home',redirect:'/identify'},
      {path:'/find',component:Findtop,
      children:[
        {path:'/identify',component:Identify},
        {path:'/playlist',component:Playlist},
        {path:'/ranklist',component:Ranklist},
        {path:'/songer',component:Songer},
      ]
      }
    ]
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
