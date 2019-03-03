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

Vue.use(ElementUI);

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
