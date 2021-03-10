<template>
  <div :class="{ editing: isEdited }">
    <div class="view">
      <!-- v-model 绑定备忘状态
           completed为true时勾选该条备忘-->
      <input
        class="toggle"
        type="checkbox"
        @change="updateChecked($event.target.checked)"
      />
      <!-- 双击修改备忘 -->
      <label @dblclick="editTodo()">{{ title }}</label>
      <!-- 删除备忘 -->
      <button class="destroy" @click="removeTodo()"></button>
    </div>
    <!-- 修改备忘的数据
					通过li的类名editing来控制显示隐藏（不是必须，因为下面有v-if）
					v-autofocus、v-if 配合 实现编辑时自动聚焦（当v-if条件满足时元素插入到页面，此时触发v-autofocus中的钩子函数）
					失焦或 Enter 键可更新数据，Esc键取消更新 -->
    <input
      class="edit"
      type="text"
      v-autofocus
      v-if="isEdited"
      v-model="editingTitle"
      @blur="doneEdit()"
      @keyup.enter="doneEdit()"
      @keyup.esc="cancelEdit()"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEdited: false,
      editingTitle: "",
    };
  },
  props: {
    // 备忘内容
    title: {
      type: String,
      default: "",
    },
    // 备忘勾选（已完成）状态
    completed: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // 编辑备忘
    editTodo() {
      this.editingTitle = this.title;
      this.isEdited = true;
    },
    // 确认修改备忘
    doneEdit() {
      // 当内容并未修改时，直接清空编辑对象
      // if (this.title === this.editedTodo) {
      //   this.editedTodo = {};
      //   return;
      // }
      if (this.isEdited) {
        this.$emit("update:title", this.editingTitle);
        this.isEdited = false;
      }
    },
    // 取消修改备忘
    cancelEdit() {
      this.isEdited = false;
    },
    // 删除备忘
    removeTodo() {
      // 通知父组件删除
      this.$emit("delete");
    },
    // 更新选中状态
    updateChecked(completed) {
      // 更新绑定的 completed
      this.$emit("update:completed", completed);
    },
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
.todo-list li .editing .view {
  display: none;
}
.todo-list li .editing .edit {
  display: block;
  width: 506px;
  padding: 12px 16px;
  margin: 0 0 0 43px;
}
</style>