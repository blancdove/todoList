<template>
  <div>
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <!-- 添加备忘 -->
        <input
          class="new-todo"
          placeholder="你接下来要做什么?"
          v-model="newTodo"
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
            class="todo"
            v-for="todo in todos"
            :key="todo.id"
            :class="{
              completed: todo.completed,
              editing: todo.id == editedTodo.id,
            }"
          >
            <div class="view">
              <!-- v-model 绑定备忘状态
                  completed为true时勾选该条备忘-->
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              <!-- 双击修改备忘 -->
              <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <!-- 删除备忘 -->
              <button class="destroy" @click="removeTodo(todo)"></button>
            </div>
            <!-- 通过li的类名editing来控制显示隐藏
              修改备忘的数据，失焦或 Enter 键可更新数据，Esc键取消更新 -->
            <input
              class="edit"
              type="text"
              v-model="editedTodo.title"
              @blur="doneEdit(editedTodo)"
              @keyup.enter="doneEdit(editedTodo)"
              @keyup.esc="cancelEdit()"
            />
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
// 定义一个备忘id
let id = 1;
export default {
  components: {},
  data() {
    return {
      todos: [], // 储存所有备忘的列表
      newTodo: "", // 新增的备忘
      editedTodo: {}, // 正在修改中的备忘
    };
  },
  computed: {
    // 计算未完成的备忘的数量
    remaining() {
      // 过滤掉已完成的
      return this.todos.filter((x) => !x.completed).length;
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
        id: id++,
        title: this.newTodo,
        completed: false,
      });
      // 添加成功后清空输入框
      this.newTodo = "";
    },
    // 编辑备忘
    editTodo(todo) {
      // 将待编辑的内容填充到修改的内容中
      // 使用es6 ... 解构，
      
      this.editedTodo = { ...todo };
    },
    // 确认修改备忘
    doneEdit(todo) {
      // 当内容并未修改时，直接清空编辑对象
      if(todo.title === this.editedTodo.title) { 
        this.editedTodo = {};
        return ;
      }
      // 将编辑中内容更新到列表中
      this.todos = this.todos.map((x) => {
        return todo.id == x.id ? { ...todo } : { ...x };
      });
      // 清空编辑对象
      this.editedTodo = {};
    },
    // 取消修改备忘
    cancelEdit() {
      this.editedTodo = {};
    },
    // 删除备忘
    removeTodo(todo) {
      // 匹配 id 找出该备忘，然后移除
      const index = this.todos.findIndex((x) => x.id === todo.id);
      this.todos.splice(index, 1);
    },
    // 删除已完成的备忘
    removeCompleted() {
      this.todos = this.todos.filter((x) => !x.completed);
    },
  },
  
};
</script>

<style>
@import "https://unpkg.com/todomvc-app-css@2.1.0/index.css";
</style>