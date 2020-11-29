import Vue from '../antd-vue.js'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router/index.js'
import 'ant-design-vue/dist/antd.css';
import ECharts from 'vue-echarts/components/ECharts.vue'
// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title.js'

Vue.component('v-chart', ECharts)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})
// Vue.prototype.$router = router

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
