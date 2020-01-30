export const state = () => ({
    newTask: {
      name: '',
      status: 1,
      supplement: '',
      comments: [],
      members: [],
      order: 0,
      children: [],
      checked: false,
      deadline: null
    },
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
      {
        name: 'タスク6',
        status: 1,
        supplement: '補足文補足文補足文補足文',
        comments: [],
        members: [],
        order: 6,
        children: [],
        checked: false,
        deadline: null
      },
      {
        name: 'タスク7',
        status: 1,
        supplement: '補足文補足文補足文補足文',
        comments: [],
        members: [],
        order: 7,
        children: [],
        checked: false,
        deadline: null
      },
      {
        name: 'タスク8',
        status: 3,
        supplement: '補足文補足文補足文補足文',
        comments: [],
        members: [],
        order: 8,
        children: [],
        checked: false,
        deadline: null
      },
    ]
  }
)

export const mutations = {
  inputName(state, payload) {
    state.newTask.name = payload;
  },
  registerNewTask(state) {
    state.newTask.order = state.list.length + 1;
    let obj = JSON.stringify(state.newTask);
    obj = JSON.parse(obj);
    state.list.push(obj);
    state.newTask.name = '';
  }
}
