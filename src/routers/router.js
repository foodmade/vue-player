// 引入组件
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../page/page-home"
import Player from "../page/player"
import Search from "../page/search"
Vue.use(VueRouter);
const routers = [
    {
        path:"/",
        redirect: '/home'
    },
    {
        path:"/home",
        name: 'home',
        component: Home
    },
    {
        path: "/player",
        name: 'player',
        component: Player
    },
    {
        path: "/search",
        name: "search",
        component:Search
    }
]
const router = new VueRouter({
    routes: routers
  });
  export default router