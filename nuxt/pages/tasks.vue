<template>
  <div class="page-tasks-wrapper">
    <div class="page-tasks-search">
      <h2 style="">検索条件</h2>
      <div class="page-tasks-search-contents">
        <div class="page-tasks-search-status">
          <h3>ステータス</h3>
          <ul>
            <li v-for="(status, key) in statuses">
              <div class="siimple-checkbox">
                <input type="checkbox" :id="'status' + key">
                <label :for="'status' + key"></label>
              </div>
              <label :for="'status' + key" class="page-tasks-search-status-name">{{ status.name }}</label>
            </li>
          </ul>
        </div>
        <div class="page-tasks-search-keyword">
          <h3>キーワード</h3>
          <input type="text" class="siimple-input" placeholder="タスクのタイトルやコメントなどで検索できます">
        </div>
        <div class="page-tasks-search-member">
          <h3>メンバー</h3>
          <ul>
            <li>
              <div class="siimple-checkbox">
                <input type="checkbox" id="myCheckbox">
                <label for="myCheckbox"></label>
              </div>
              <label for="myCheckbox" class="page-tasks-search-member-name">山崎 旭</label>
            </li>
            <li>
              <div class="siimple-checkbox">
                <input type="checkbox" id="myCheckbox2">
                <label for="myCheckbox2"></label>
              </div>
              <label for="myCheckbox2" class="page-tasks-search-member-name">木村 公平</label>
            </li>
            <li>
              <div class="siimple-checkbox">
                <input type="checkbox" id="myCheckbox3">
                <label for="myCheckbox3"></label>
              </div>
              <label for="myCheckbox3" class="page-tasks-search-member-name">川口 春馬</label>
            </li>
          </ul>
        </div>
        <div class="page-tasks-search-deadline">
          <h3>期限</h3>
          <div>
            <input type="text" class="siimple-input"><span>まで</span>
          </div>
        </div>
        <div class="page-tasks-search-created">
          <h3>作成日</h3>
          <div><input type="text" class="siimple-input"><span class="page-tasks-search-created-tilde">〜</span><input type="text" class="siimple-input"></div>
        </div>
        <div class="page-tasks-search-tag">
          <h3>タグ</h3>
          <input type="text" class="siimple-input" placeholder="タグで検索">
        </div>
      </div>

      <div class="page-tasks-search-submit">
        <input type="submit" value="この条件で検索" class="siimple-btn siimple-btn--primary">
        <input type="reset" value="検索条件をクリア" class="siimple-btn">
      </div>
    </div>
    <form @submit="registerNewTask">
      <input type="text" 
           class="g-input siimple-input siimple-input--fluid"
           v-model="newTask.name"
           placeholder="＋ 新しいタスクを追加">
    </form>
    <ul class="page-tasks-list">
      <li class="g-task" v-for="(task, index) in tasks" :style="{ backgroundColor: statuses[task.status].color }">
        <div class="g-task-name">{{ task.name }}</div>
        <div class="g-task-status">{{ statuses[task.status].name }}</div>
        <div class="g-task-toggle"><i class="fas fa-chevron-down" v-if="task.children.length"></i></div>
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  data: function() {
    return {
      newTask: {
        name: '',
        status: 1,
      },
      statuses: {
        1: {
          slug: 'new',
          name: '未着手',
          color: '#fff'
        },
        2: {
          slug: 'pending',
          name: '保留',
          color: 'rgb(255, 230, 230)'
        },
        3: {
          slug: 'doing',
          name: '作業中',
          color: 'rgb(206, 255, 206)'
        },
        4: {
          slug: 'checking',
          name: '確認中',
          color: 'rgb(255, 255, 177)'
        },
        5: {
          slug: 'done',
          name: '終了',
          color: 'rgb(173, 173, 173)'
        }
      },
      tasks: [
        {
          name: 'タスク1',
          status: 5,
          supplement: '補足文補足文補足文補足文補足文補足文補足文',
          comments: [],
          members: [],
          order: 1,
          children: [],
          checked: false,
          deadline: null
        },
        {
          name: 'タスク2',
          status: 3,
          supplement: '補足文補足文補足文補足文補足文補足文補足文',
          comments: [],
          members: [],
          order: 2,
          children: [{}, {}, {}],
          checked: false,
          deadline: null
        },
        {
          name: 'タスク3',
          status: 2,
          supplement: '補足文補足文補足文補足文補足文補足文補足文',
          comments: [],
          members: [],
          order: 3,
          children: [{}, {}, {}],
          checked: false,
          deadline: null
        },
        {
          name: 'タスク4',
          status: 4,
          supplement: '補足文補足文補足文補足文補足文補足文補足文',
          comments: [],
          members: [],
          order: 4,
          children: [{}, {}],
          checked: false,
          deadline: null
        },
        {
          name: 'タスク5',
          status: 1,
          supplement: '補足文補足文補足文補足文補足文補足文補足文',
          comments: [],
          members: [],
          order: 5,
          children: [],
          checked: false,
          deadline: null
        },
      ]
    }
  },
  methods: {
    registerNewTask: function(e) {
      e.preventDefault();
      this.tasks.push(this.newTask);
      this.newTask = {
        name: '',
        status: 1,
      };
    },
    switchStatus: function(index) {
      
    }
  }
}
</script>