<template>
  <div class="task-wrapper">
    <input type="text" 
           class="g-input siimple-input siimple-input--fluid"
           placeholder="＋ 新しいタスクを追加">
    <ul class="task-list siimple-list">
      <li class="g-task siimple-list-item" v-for="(task, index) in tasks" :class="taskBgColor(task.status)">
        <div class="g-task-name">{{ task.name }}</div>
        <div class="g-task-status"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      tasks: [
        {
          name: 'タスク1',
          status: 'done',
          supplement: '補足文補足文補足文補足文補足文補足文補足文',
          comments: [],
          members: [],
          order: 1,
          children: [],
          checked: false
        },
        {
          name: 'タスク2',
          status: 'doing',
          supplement: '補足文補足文補足文補足文補足文補足文補足文',
          comments: [],
          members: [],
          order: 2,
          children: [],
          checked: false
        },
        {
          name: 'タスク3',
          status: 'checking',
          supplement: '補足文補足文補足文補足文補足文補足文補足文',
          comments: [],
          members: [],
          order: 3,
          children: [],
          checked: false
        },
        {
          name: 'タスク3',
          status: 'done',
          supplement: '補足文補足文補足文補足文補足文補足文補足文',
          comments: [],
          members: [],
          order: 3,
          children: [],
          checked: false
        },
        {
          name: 'タスク3',
          status: 'new',
          supplement: '補足文補足文補足文補足文補足文補足文補足文',
          comments: [],
          members: [],
          order: 3,
          children: [],
          checked: false
        },
      ]
    }
  },
  methods: {
    taskBgColor: function(status) {
      switch(status) {
        case 'new':
          return 'is-new'
          break;
        case 'pending':
          return 'is-pending'
          break;
        case 'doing':
          return 'is-doing'
          break;
        case 'checking':
          return 'is-checking'
          break;
        case 'done':
          return 'is-done';
        break;
      }
    },
    switchStatus: function(index) {
      
    }
  }
}
</script>