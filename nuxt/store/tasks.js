export const state = () => ({
    newTask: {
      id: 0,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
        id: 7,
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
        id: 8,
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
        id: 9,
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
