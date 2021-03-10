import Vue from 'vue'
import App from './App.vue'
// import Todo from "pages/Todo.vue";
import VueRouter from 'vue-router'  // 引入 vue-router


Vue.use(VueRouter);  // 使用 vue-router

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
