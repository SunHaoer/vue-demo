<template>
  <div>
    <header class="site-header jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h1>请发表对Vue的评论</h1>
          </div>
        </div>
      </div>
    </header>
    <div class="container">
      <Add/>
      <List :comments="comments"/>
    </div>
  </div>
</template>

<script>
  import Add from './components/Add.vue'
  import List from './components/List.vue'
  export default {
    name: 'App',
    data() {
      return {
        comments: [
          {
            name: 'Panda',
            content: '还不错'
          },
          {
            name: 'Cat',
            content: '不好用'
          },
          {
            name: 'Dog',
            content: '还好玩'
          }
        ]
      }
    },
    components: {
      Add,
      List
    },
  }
</script>

<style scoped>

</style>
