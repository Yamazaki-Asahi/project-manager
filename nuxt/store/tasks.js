import axios from "axios";

export const state = () => ({
	newTask: {
		name: ''
	},
	list: []
});

export const mutations = {
	inputName(state, payload) {
		state.newTask.name = payload;
	},
	registerNewTask(state, task) {
		task.newChild = false;
		task.openStatusBox = false;
		task.children = [];
		state.list.push(task);
		state.newTask.name = '';
	},
	getTasks(state, tasks) {
		tasks.forEach(function (task) {
			task.newChild = false;
			task.openStatusBox = false;
			task.children = [];
			state.list.push(task);
		});
	},
	archiveTask(state, payload) {
		let copiedList = JSON.parse(JSON.stringify(state.list)); //コピーしたリスト
		let listStr = trackParentTaskList(copiedList, payload.archivedTask, payload.parentTaskIds);
		let newList = eval(listStr).filter(function (item) {
			return item.id !== payload.archivedTask.id;
		});
		eval(listStr + ' = newList');
		state.list = copiedList;
	},
	showChildren(state, payload) {
		let copiedList = JSON.parse(JSON.stringify(state.list)); //コピーしたリスト
		let listStr = trackParentTaskList(copiedList, payload.task, payload.parentTaskIds);
		payload.children.forEach(function (item) {
			item.newChild = false;
			item.openStatusBox = false;
			item.children = [];
		});
		let newList = eval(listStr).map(function (item) {
			if (item.id === payload.task.id) item.children = payload.children;
			return item;
		});
		eval(listStr + ' = newList');
		state.list = copiedList;
	},
	closeChildren(state, task) {
		let newTaskList = state.list.map(function (item) {
			if (item.id === task.id) {
				item.children = [];
			}
			return item;
		});
		state.list = newTaskList;
	},
	createNewChild(state, parent) {
		state.list.forEach(function (item, i) {
			if (item.id === parent.id) {
				state.list[i].newChild = '';
			}
		});
	},
	openStatusBox(state, task) {
		let newTaskList = state.list.map(function (item) {
			if (item.id === task.id) {
				item.openStatusBox = true;
			}
			return item;
		});
		state.list = newTaskList;
	},
	closeStatusBox(state, task) {
		let newTaskList = state.list.map(function (item) {
			if (item.id === task.id) {
				item.openStatusBox = false;
			}
			return item;
		});
		state.list = newTaskList;
	},
	updateTask(state, updatedTask) {
		let newTaskList = state.list.map(function (item) {
			if (item.id === updatedTask.id) {
				updatedTask.newChild = false;
				updatedTask.openStatusBox = true;
				return updatedTask;
			}
			return item;
		});
		state.list = newTaskList;
	}
};

export const actions = {
	async getTasksAction(context, project_id) {
		let data = {};
		let params = {
			project_id: project_id
		};
		await axios.get('/api/tasks/', {params: params})
			.then((res) => {
				data = res.data;
				context.commit('getTasks', data.tasks);
			}).catch(e => {
				context.commit('error/setError', e.response, {root: true});
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
	async archiveTaskAction(context, task) {
		let data = {};
		await axios.delete('/api/tasks/' + task.id)
			.then((res) => {
				data = res.data;
			});
		context.commit('archiveTask', {archivedTask: task, parentTaskIds: data.parentTaskIds});
	},
	async showChildrenAction(context, task) {
		let params = {
			project_id: task.project_id,
			parent_id: task.id,
		};
		let data = {};
		await axios.get('/api/tasks/', {params: params})
			.then((res) => {
				data = res.data;
			});
		context.commit('showChildren', {
			task: task,
			children: data.tasks,
			parentTaskIds: data.parentTaskIds
		});
	},
	async updateStatusAction(context, payload) {
		let params = new URLSearchParams();
		params.append('status_id', payload.statusId);
		let data = {};
		await axios.put('/api/tasks/' + payload.task.id, params)
			.then((res) => {
				data = res.data;
			});
		context.commit('updateTask', data);
	}
};

//　親タスクを追跡する関数
function trackParentTaskList(copiedList, task, parentTaskIds) {
	let str = 'copiedList';
	if (!parentTaskIds.length) return str;
	parentTaskIds.forEach(function (parentTaskId) {
		eval(str).forEach(function (item, index) {
			if (item.id === parentTaskId) {
				str += `[${index}].children`;
			}
		});
	});
	return str;
}
