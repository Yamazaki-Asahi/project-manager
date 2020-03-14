import axios from "axios";

export const state = () => ({
  newTask: {
    id: 0,
    name: '',
    status_id: 1,
    supplement: '',
    comments: [],
    members: [],
    order: 0,
    children: [],
    checked: false,
    deadline: null
  },
  list: []
});

export const mutations = {
  inputName(state, payload) {
    state.newTask.name = payload;
  },
  registerNewTask(state, payload) {
    let obj = payload;
    obj['children'] = [];
    state.list.push(obj);
    state.newTask.name = '';
  },
  getTasks(state, payload) {
    Object.keys(payload).forEach(function (index) {
      payload[index]['showChildren'] = false;
      state.list.push(payload[index]);
    });
  },
  archiveTask(state, payload) {
    let tasks = state.list.filter(item => {
      return item.id !== payload.id;
    });
    state.list = tasks;
  },
  toggleChildren(state, payload) {
    state.list.forEach(function (item, i) {
      if (item.id === payload.task.id) {
        if (payload.type === 'open') {
          state.list[i].children = payload.children;
          state.list[i].showChildren = true;
        } else {
          state.list[i].children = [];
          state.list[i].showChildren = false;
        }
      }
    });
  }
};

export const actions = {
  async getTasksAction(context, project_id) {
    let data = {};
    let params = {
      project_id: project_id
    };
    await axios.get('/api/tasks/', { params: params })
      .then((res) => {
        data = res.data;
        context.commit('getTasks', data);
      }).catch(e => {
        context.commit('error/setError', e.response, { root: true });
      });
  },
  async registerNewTaskAction(context, payload) {
    let data = {};
    let params = new URLSearchParams();
    params.append('name', payload.name);
    params.append('project_id', payload.project_id);
    params.append('parent_id', payload.parent_id);
    await axios.post('/api/tasks/', params).then((res) => {
      data = res.data;
    }).catch(e => {

    });
    context.commit('registerNewTask', data);
  },
  async archiveTaskAction(context, payload) {
    await axios.delete('/api/tasks/' + payload.id)
      .then(() => {

      });
    context.commit('archiveTask', payload);
  },
  async toggleChildrenAction(context, task) {
    if (task.showChildren) {
      context.commit('toggleChildren', {task: task, type: 'close'})
      return;
    };
    let params = {
      project_id: task.project_id,
      parent_id: task.id,
    };
    let children = [];
    await axios.get('/api/tasks/', {params: params})
        .then((res) => {
          children = res.data;
        });
    context.commit('toggleChildren', {task: task, type: 'open', children: children});
  }
};
