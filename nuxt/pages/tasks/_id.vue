<template>
  <div class="page-tasks-detail">
    <Index />
    <div class="overlay">
      <div class="modal">
        <h1>タスク1</h1>
      </div>
    </div>
  </div>
</template>

<script>
  import Index from '~/pages/tasks/index'
  export default {
    components: {
      Index
    },
    validate ({ params }) {
      // 数値でなければならない
      return /^\d+$/.test(params.id)
    }
  }
</script>
