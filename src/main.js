import Vue from 'vue'
import App from './App.vue'
import router from './routers/index'
import vuetify from './plugins/vuetify'
import Axios from 'axios'
import {sync} from 'vuex-router-sync'
import store from './store/index'
import Vuewait from 'vue-wait'
import icons from 'material-design-icons-iconfont/dist/material-design-icons.css'
import CKEditor from '@ckeditor/ckeditor5-vue';
Vue.use( CKEditor );
Vue.use(Vuewait)
Vue.config.productionTip = false
sync(store, router)

new Vue({
  router,
  vuetify,
  Axios,
  store,
  icons,
  render: h => h(App)
}).$mount('#app')

