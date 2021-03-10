import Vue from 'vue'
import App from './App.vue'
import Todo from "./pages/Todo.vue";
import VueRouter from 'vue-router'  // 引入 vue-router


Vue.use(VueRouter);  // 使用 vue-router

// 配置路由信息
const routes = [
  {
    path: '/todo',
    name: 'Todo',
    component: Todo
  },
  {
    path: '*',
    redirect: { name: 'Todo' }
  }
]
// 创建router实例
// linkExactActiveClass 更改路由完全匹时的类名为selected
const router = new VueRouter({
  routes,
  mode: 'history',
  linkExactActiveClass: 'selected',
})

Vue.config.productionTip = false

new Vue({
  router, 
  render: h => h(App),
}).$mount('#app')
