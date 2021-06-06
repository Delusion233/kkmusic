import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const myFound = () => import ('views/data/myFound/MyFound') ;
const kkStyle = () => import('views/data/myFound/menu/KkStyle');
const kkSongs = () => import('views/data/myFound/menu/KkSongs');
const kkAnchor = () => import('views/data/myFound/menu/KkAnchor');
const kkList = () => import('views/data/myFound/menu/KkList');
const kkSinger = () => import('views/data/myFound/menu/KkSinger');
const kkNewSongs = () => import('views/data/myFound/menu/KkNewSongs');

const myVideo = () => import ('views/data/myVideo/MyVideo') ;
const myFriends = () => import ('views/data/myFriends/MyFriends') ;
const myLives = () => import ('views/data/myLives/MyLives') ;
const mySelf = () => import ('views/data/mySelf/MySelf') ;
const searchResult = () => import ('views/searchResult/SearchResult') ;
const playListResult = () => import ('views/searchResult/PlayListResult') ;

const routes = [
  {
    path: '',
    redirect: '/found/kkstyle',
  },
  {
    path: '/found',
    component: myFound,
    children: [
      { path: 'kkstyle', component: kkStyle},
      { path: 'kksongs', component: kkSongs},
      { path: 'kkanchor', component: kkAnchor},
      { path: 'kklist', component: kkList},
      { path: 'kksinger', component: kkSinger},
      { path: 'kknewsongs', component: kkNewSongs},
    ]
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
  {
    path: '/search',
    component: searchResult
  },
  {
    path: '/playList',
    component: playListResult
  }
]

const router = new VueRouter({
  mode: 'history',
  routes // (缩写) 相当于 routes: routes
})

export default router