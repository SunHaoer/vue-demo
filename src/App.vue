<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader @addTodo="addTodo"/>    <!-- 给TodoHeader绑定addTodo事件监听 -->
      <TodoList :todos="todos" :deleteTodo="deleteTodo"/>
      <TodoFooter :todos="todos" :deleteCompleteTodos="deleteCompleteTodos" :selectAllTodos="selectAllTodos"/>
    </div>
  </div>
</template>

<script>
  import TodoHeader from './components/TodoHeader.vue'
  import TodoList from './components/TodoList.vue'
  import TodoFooter from './components/TodoFooter.vue'

  export default {
    name: 'App',
    components: {TodoFooter, TodoList, TodoHeader},
    comments: {
      TodoHeader,
      TodoList,
      TodoFooter
    },
    data() {
      return {
        // 从localStorage读取todos
        todos: JSON.parse(window.localStorage.getItem('todos_key') || '[]'),
        // todos: [
        //   {title: '吃饭', complete: false},
        //   {title: '睡觉', complete: false},
        //   {title: '打代码', complete: true}
        // ]
      }
    },
    methods: {
      addTodo(todo) {
        this.todos.unshift(todo)
      },
      deleteTodo(index) {
        this.todos.splice(index, 1)
      },
      deleteCompleteTodos() {    // 删除所有选中todos
        this.todos = this.todos.filter(todo => !todo.complete)
      },
      selectAllTodos(check) {    // 全选 全不选
        this.todos.forEach(todo => todo.complete = check)
      }
    },
    watch: {    // 监视
      todos: {
        deep: true,    // 深度监视
        handler: function (value) {
          // 将tudos最新json值保存到localStorage
          window.localStorage.setItem('todos_key', JSON.stringify(value))
        }
      }
    }
  }
</script>

<style scoped>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

</style>
