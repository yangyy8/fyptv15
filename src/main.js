// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import router from './router'
import store from './assets/store'
import global_ from './Global.js'
import api from './api/index'
import './assets/css/normalize.css'
import './assets/icon/iconfont/iconfont.css';
import menu from './assets/js/menu.js'
import pl from './assets/js/pl.js'
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css'
import DonMessage from '@/./assets/js/message.js'
import interfaces from '@/./assets/js/interfaces.js'
import 'default-passive-events'
import "babel-polyfill"
import VueDND from 'awe-dnd'
import VueClipboard  from 'vue-clipboard2'  //复制粘贴功能

Vue.use(VueClipboard)
Vue.use(VideoPlayer)
Vue.use(interfaces)
Vue.use(VueDND)
Vue.prototype.$message = DonMessage
Vue.config.productionTip = false
Vue.prototype.$api = api;
Vue.prototype.Global = global_;
Vue.prototype.menu = menu;
Vue.prototype.pl = pl;



/* eslint-disable no-new */
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
