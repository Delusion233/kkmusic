import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const myFound = () => import ('views/data/myFound/MyFound') ;
const myVideo = () => import ('views/data/myVideo/MyVideo') ;
const myFriends = () => import ('views/data/myFriends/MyFriends') ;
const myLives = () => import ('views/data/myLives/MyLives') ;
const mySelf = () => import ('views/data/mySelf/MySelf') ;
// const found = () => import('views/data/mainComps/Found');

const routes = [
  {
    path: '',
    redirect: '/found',
  },
  {
    path: '/found',
    component: myFound,
    // children: [
    //   {
    //     path: 'found',
    //     component: found
    //   }
    // ]
  },
  {
    path: '/video',
    component: myVideo
  },
  {
    path: '/friends',
    component: myFriends
  },
  {
    path: '/lives',
    component: myLives
  },
  {
    path: '/myself',
    component: mySelf
  },
]

const router = new VueRouter({
  mode: 'history',
  routes // (缩写) 相当于 routes: routes
})

export default router