import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import MyHttpServer from "./network/axios";
import moment from "moment";

Vue.use(MyHttpServer);
Vue.use(ElementUI);

//时间过滤器
Vue.filter("fmtdata", v => {
  return moment(v).format("YYYY-MM-DD");
});

Vue.config.productionTip = false;
export const eventBus = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
