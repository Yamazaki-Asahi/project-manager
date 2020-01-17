export const state = () => ({
    list: [
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
)

export const mutations = {
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