import Vue from 'vue'
import App from './App.vue'
import './common/css/main.css';
import BootstrapVue from 'bootstrap-vue'
import 'video.js/dist/video-js.css'
import VideoPlayer from 'vue-video-player'
import ElementUI from 'element-ui';
import "lib-flexible";
// import 'videojs-contrib-hls'
import router from "./routers/router"
import {post,fetch,patch,put} from './common/js/http'
import {isPc} from './common/js/utils';
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-video-player/src/custom-theme.css';

Vue.use(VideoPlayer);
Vue.use(ElementUI);
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
Vue.prototype.$isPc=isPc;

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
