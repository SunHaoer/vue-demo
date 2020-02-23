/*
使用localStorage存储数据的工具模块
 */
const TODO_KEY = 'todos_key'

export default {
  saveTodos(todos) {
    window.localStorage.setItem(TODO_KEY, JSON.stringify(todos))
  },
  getTodos() {
    return JSON.parse(window.localStorage.getItem(TODO_KEY) || '[]')
  }
}

