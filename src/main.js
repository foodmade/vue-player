import Vue from 'vue'
import App from './App.vue'
import './common/css/main.css';
import 'video.js/dist/video-js.css'
import ElementUI from 'element-ui';
import "lib-flexible";
import router from "./routers/router"
import {post,fetch,patch,put} from './common/js/http'
import {isPc,errMsg,successMsg,scrollTo,
        checkEmailFormat,removeAllSpace}
                                        from './common/js/utils';
import 'element-ui/lib/theme-chalk/index.css';
// import 'vue-video-player/src/custom-theme.css';
import _global from './components/Global';
import './assets/icon/iconfont';
import ba from 'vue-ba';

//解决图片403错误
let head = document.getElementsByTagName('head');
let meta = document.createElement('meta');
document.title = '我要看电影|SearchMovies|最全的电影播放网站|任何大片免费看';
meta.name = 'referrer';
meta.content = 'no-referrer';

head[0].appendChild(meta);

Vue.use(ElementUI);
//百度收录
Vue.use(ba, "99b3fbc92a8358c029dd29c27d214524");
Vue.use(ba, { siteId: "99b3fbc92a8358c029dd29c27d214524" });
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
Vue.prototype.$isPc=isPc;
Vue.prototype.$errMsg=errMsg;
Vue.prototype.$successMsg=successMsg;
Vue.prototype.$scrollTo=scrollTo;
Vue.prototype.$checkEmailFormat=checkEmailFormat;
Vue.prototype.$removeAllSpace=removeAllSpace;
Vue.prototype.GLOBAL = _global;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
