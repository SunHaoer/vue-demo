<template>
  <div class="col-md-4">
      <form class="form-horizontal" @submit.prevent="addItem">
        <div class="form-group">
          <label>用户名</label>
          <input type="text" class="form-control" placeholder="用户名" v-model="username">
        </div>
        <div class="form-group">
          <label>评论内容</label>
          <textarea class="form-control" rows="6" placeholder="评论内容" v-model="content"></textarea>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <button type="submit" class="btn btn-default pull-right">提交</button>
          </div>
        </div>
      </form>
    </div>
</template>

<script>
  export default {
    name: 'Add',
    props: {
      comments: Array,
      addComment: Function
    },
    data() {
      return {
        username: '',
        content: ''
      }
    },
    methods: {
      addItem() {
        const {comments, addComment} = this
        this.addComment(this.username, this.content)
      }
    }
  }
</script>

<style scoped>

</style>
