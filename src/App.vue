<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader @addTodo="addTodo"/>    <!-- 给TodoHeader绑定addTodo事件监听 -->
      <TodoList :todos="todos"/>
<!--      <TodoFooter :todos="todos" :deleteCompleteTodos="deleteCompleteTodos" :selectAllTodos="selectAllTodos"/>-->
      <TodoFooter>
        <input slot="checkAll" type="checkbox" v-model="isAllCheck"/>
        <span slot="count">已完成{{completeSize}} / 全部{{todos.length}}</span>
        <button slot="delete" class="btn btn-danger" v-show="completeSize" @click="deleteCompleteItem">清除已完成任务</button>
      </TodoFooter>
    </div>
  </div>
</template>

<!--
绑定事件监听 ----  订阅消息
触发事件 ---- 发布消息
-->

<script>
  import PubSub from 'pubsub-js'
  import StorageUtil from './util/StorageUtil.js'
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
        todos: StorageUtil.getTodos()
        // todos: JSON.parse(window.localStorage.getItem('todos_key') || '[]'),
        // todos: [
        //   {title: '吃饭', complete: false},
        //   {title: '睡觉', complete: false},
        //   {title: '打代码', complete: true}
        // ]
      }
    },
    computed: {
      completeSize () {
        const {todos} = this
        return todos.reduce((preTotal, todo) => preTotal + (todo.complete ? 1 : 0), 0)
      },
      isAllCheck: {
        get () {
          return this.completeSize === this.todos.length && this.completeSize > 0
        },
        set (value) {
          this.selectAllTodos(value)
        }
      }
    },
    mounted () {
      PubSub.subscribe('deleteTodo', (msg, data) => {    // 订阅消息
        this.deleteTodo(index)    // 使用 => 函数, this指向App.vue
      })
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
      },
      deleteCompleteItem () {
        const {deleteCompleteTodos} = this
        if (window.confirm('sure?')) {
          this.deleteCompleteTodos()
        }
      }
    },
    watch: {    // 监视
      todos: {
        deep: true,    // 深度监视
        handler: StorageUtil.saveTodos
        // handler: function (value) {
        //   // 将tudos最新json值保存到localStorage
        //   StorageUtil.saveTodos(value)
        //   // window.localStorage.setItem('todos_key', JSON.stringify(value))
        // }
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
