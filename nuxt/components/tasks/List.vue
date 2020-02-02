<template>
    <ul class="page-tasks-list">
        <li class="g-task" v-for="(task) in tasks" :style="{ backgroundColor: statuses[task.status].color }">
          <nuxt-link :to="'/tasks/'+task.id">
            <div class="g-task-name">{{ task.name }}</div>
            <div class="g-task-status">{{ statuses[task.status].name }}</div>
            <div class="g-task-toggle"><i class="fas fa-chevron-down" v-if="task.children.length"></i></div>
          </nuxt-link>
        </li>
    </ul>
</template>

<script>
    export default {
      computed: {
        tasks () {
          return this.$store.state.tasks.list
        },
        statuses () {
          return this.$store.state.statuses.list
        }
      }
    }
</script>
