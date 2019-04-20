// 引入组件
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
const routers = [
    {
        path:"/",
        redirect: '/search',
        meta:{
            'title':'我要看电影,最全电影资源网站'
        },
    },
    // {
    //     path:"/home",
    //     name: 'home',
    //     component:resolve => require(['../page/page-home'], resolve)
    // },
    {
        path: "/player",
        name: 'player',
        meta:{
            'title':'我要看电影,最全电影资源网站'
        },
        component:resolve => require(['../page/player'], resolve)
    },
    {
        path: "/search",
        name: "search",
        meta:{
            'title':'我要看电影,最全电影资源网站'
        },
        component:resolve => require(['../page/search'], resolve)
    }
];


const router = new VueRouter({
    routes: routers
  });

export default router