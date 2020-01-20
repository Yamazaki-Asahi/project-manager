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
  registerNewTask(state, payload) {
    let defaultValue = {
      status: 1,
      supplement: '',
      comments: [],
      members: [],
      order: state.list.length + 1,
      children: [],
      checked: false,
      deadline: null
    }
    let newTask = Object.assign(payload, defaultValue);
    // console.log(payload);
    // payload.status = 1
    // payload.supplement = ''
    // payload.comments = []
    // payload.members = []
    // payload.order = state.list.length + 1
    // payload.children = []
    // payload.checked = false
    // payload.deadline = null

    state.list.push(newTask);
  }
}
