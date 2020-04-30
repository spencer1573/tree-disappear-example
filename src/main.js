import Vue from 'vue'
import App from './App.vue'
import LiquorTree from 'liquor-tree'

Vue.config.productionTip = false

Vue.use(LiquorTree)

new Vue({
  render: h => h(App),
}).$mount('#app')
