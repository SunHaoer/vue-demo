<template>
  <li @mouseenter="handleEnter(true)" @mouseleave="handleEnter(false)" :style="{background: bgColor}">
    <label>
      <input type="checkbox" v-model="todo.complete"/>
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" style="display:none" v-show="isShow" @click="deleteItem" >删除</button>
  </li>
</template>

<script>
  import PubSub from 'pubsub-js'

  export default {
    name: 'todoItem',
    props: {
      todo: Object,
      index: Number,
      index: Number
    },
    data() {
      return {
        bgColor: 'white',
        isShow: false
      }
    },
    methods: {
      handleEnter(isEnter) {
        if(isEnter) {
          this.bgColor = 'gray'
          this.isShow = true
        } else {
          this.bgColor = 'white'
          this.isShow = false
        }
      },
      deleteItem() {
        const {index, deleteTodo} = this
        if(window.confirm('sure?')) {
          //this.deleteTodo(index)
          PubSub.publish('deleteTodo', index)    // 消息发布
        }
      },
    },
  }
</script>

<style scoped>
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }
</style>
