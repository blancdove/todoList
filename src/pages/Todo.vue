<template>
  <div>
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <!-- 添加备忘
            v-autofocus实现打开页面时自动聚焦 -->
        <input
          class="new-todo"
          placeholder="你接下来要做什么?"
          v-model="newTodo"
          v-autofocus
          @keyup.enter="addTodo"
        />
      </header>
      <!-- v-show：当备忘不为0时显示 -->
      <section class="main" v-show="todos.length">
        <ul class="todo-list">
          <!-- v-for 遍历所有备忘，
              key 绑定备忘 id，
              completed：该条备忘是否已经完成
              editing：该条备忘是否正在进行修改 -->
          <li
            v-for="todo in computedTodos"
            class="todo"
            :key="todo.id"
            :class="{
              completed: todo.completed,
            }"
          >
            <!-- 使用组件
                .sync修饰符“双向绑定”备忘内容和状态
                监听删除delete事件 -->
            <todo-item
              :title.sync="todo.title"
              :completed.sync="todo.completed"
              @delete="removeTodo(todo)"
            ></todo-item>
          </li>
        </ul>
        <!-- 页脚，
             v-show：当备忘不为0时显示-->
        <footer class="footer" v-show="todos.length">
          <span class="todo-count">
            <!-- remaining：计算属性 计算剩余的未完成的数量，
                  pluralize： 过滤器 用来过滤单位是否显示为复数 items or item -->
            <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
          </span>
          <ul class="filters">
            <!-- exact 设置精确匹配，active-class 设置激活状态 -->
            <li>
              <router-link :to="{ query: { state: '' } }">All</router-link>
            </li>
            <li>
              <router-link :to="{ query: { state: 'active' } }"
                >Active</router-link
              >
            </li>
            <li>
              <router-link :to="{ query: { state: 'completed' } }"
                >Completed</router-link
              >
            </li>
          </ul>
          <!-- 剩余备忘小于总备忘，表明已有备忘完成
                则显示一键清除按钮 -->
          <button
            class="clear-completed"
            @click="removeCompleted"
            v-show="todos.length > remaining"
          >
            Clear completed
          </button>
        </footer>
      </section>
    </section>
  </div>
</template>

<script>
import TodoItem from "../components/TodoItem";

export default {
  components: {
    TodoItem,
  },
  data() {
    return {
      id: localStorage.getItem('id') || 1, // 定义一个备忘id
      todos: JSON.parse(localStorage.getItem("todos") || "[]"), // 储存所有备忘的列表
      newTodo: "", // 新增的备忘
    };
  },
  computed: {
    // 计算未完成的备忘的数量
    remaining() {
      // 过滤掉已完成的
      return this.todos.filter((item) => !item.completed).length;
    },
    // 计算是否有相同的备忘
    // 通过路由信息过滤清单
    computedTodos() {
      // 先根据路由信息过滤
      const status = this.$route.query.state;
      const filterTodos = this.todos.filter((item) => {
        if (status === "active") {
          return !item.completed;
        } else if (status === "completed") {
          return item.completed;
        } else {
          return true;
        }
      });
      // 如果有输入，则过滤出当前路由相同备忘
      // 如果没有输入，显示当前路由全部备忘
      return filterTodos.filter((item) => {
        return (
          item.title.toLowerCase().indexOf(this.newTodo.toLowerCase()) !== -1
        );
      });
    },
  },
  watch: {
    todos:{
      handler: function (newVal) {
        localStorage.setItem("todos", JSON.stringify(newVal));
        localStorage.setItem("id", this.id);
      },
      deep: true,
    },
  },
  filters: {
    pluralize(num) {
      // 如果大于1，则加复数
      return num > 1 ? "items" : "item";
    },
  },
  methods: {
    // 新增备忘
    addTodo() {
      // 内容为空则不处理
      if (!this.newTodo) {
        return;
      }
      // 插入到备忘列表最前面
      this.todos.unshift({
        id: this.id++,
        title: this.newTodo,
        completed: false,
      });
      // 添加成功后清空输入框
      this.newTodo = "";
    },

    // 删除已完成的备忘
    removeCompleted() {
      this.todos = this.todos.filter((item) => !item.completed);
    },

    // 删除备忘
    removeTodo(todo) {
      const index = this.todos.findIndex((item) => item.id === todo.id);
      this.todos.splice(index, 1);
    },

    // 切换清单
  },
  directives: {
    // 自定义指令
    autofocus: {
      // 钩子函数inserted：被绑定元素插入父节点时调用
      inserted: function (el) {
        // 聚焦元素
        el.focus();
      },
    },
  },
};
</script>

<style>
@import "https://unpkg.com/todomvc-app-css@2.1.0/index.css";
</style>