// 引入组件
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
const routers = [
    {
        path:"/",
        redirect: '/search'
    },
    // {
    //     path:"/home",
    //     name: 'home',
    //     component:resolve => require(['../page/page-home'], resolve)
    // },
    {
        path: "/player",
        name: 'player',
        component:resolve => require(['../page/player'], resolve)
    },
    {
        path: "/search",
        name: "search",
        component:resolve => require(['../page/search'], resolve)
    }
]
const router = new VueRouter({
    routes: routers
  });
  export default router