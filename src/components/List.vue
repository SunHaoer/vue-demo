<template>
  <div class="col-md-8">
    <h3 class="reply">评论回复：</h3>
    <h2 style='display: none' v-show="comments.length===0">暂无评论，点击左侧添加评论！！！</h2>
    <ul class="list-group">
      <Item v-for="(comment, index) in comments" :key="index"
            :comment="comment" :deleteComment="deleteComment" :index="index"></Item>
    </ul>
  </div>
</template>

<script>
  import Item from './Item.vue'

  export default {
    name: 'List',
    components: {Item},
    props: ['comments', 'deleteComment'],    // 声明接收属性, 成为组件对象的属性
    comments: {
      Item
    }
  }
</script>

<style scoped>
  .reply {
    margin-top: 0px;
  }

</style>
