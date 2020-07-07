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
		let newTask = setTemporaryStatus(task);
		state.list.push(newTask);
		state.newTask.name = '';
	},
	getTasks(state, tasks) {
		tasks.forEach(function (task) {
			let _task = setTemporaryStatus(task);
			state.list.push(_task);
		});
	},
	showChildren(state, payload) {
		let copiedList = JSON.parse(JSON.stringify(state.list));
		let listStr = trackParentTaskList(copiedList, payload.task);
		let newTaskList = eval(listStr).map(function (item) {
			if (item.id === payload.task.id) {
				item.children = payload.children.map(function (child) {
					return setTemporaryStatus(child);
				});
			}
			return item;
		});
		eval(listStr + ' = newTaskList');
		state.list = copiedList;
	},
	closeChildren(state, task) {
		let copiedList = JSON.parse(JSON.stringify(state.list));
		let listStr = trackParentTaskList(copiedList, task);
		let newTaskList = eval(listStr).map(function (item) {
			if (item.id === task.id) {
				item.children = [];
			}
			return item;
		});
		eval(listStr + ' = newTaskList');
		state.list = copiedList;
	},
	createNewChild(state, parent) {
		state.list.forEach(function (item, i) {
			if (item.id === parent.id) {
				state.list[i].new_child = '';
			}
		});
	},
	openStatusBox(state, task) {
		let copiedList = JSON.parse(JSON.stringify(state.list));
		let listStr = trackParentTaskList(copiedList, task);
		let newTaskList = eval(listStr).map(function (item) {
			if (item.id === task.id) {
				item.open_status_box = true;
			}
			return item;
		});
		eval(listStr + ' = newTaskList');
		state.list = copiedList;
	},
	closeStatusBox(state, task) {
		let newTaskList = state.list.map(function (item) {
			if (item.id === task.id) {
				item.open_status_box = false;
			}
			return item;
		});
		state.list = newTaskList;
	},
	updateTask(state, updatedTask) {
		let copiedList = JSON.parse(JSON.stringify(state.list));
		let listStr = trackParentTaskList(copiedList, updatedTask);
		let newTaskList = eval(listStr).map(function (item) {
			if (item.id === updatedTask.id) {
				return setTemporaryStatus(updatedTask);
			}
			return item;
		});
		eval(listStr + ' = newTaskList');
		state.list = copiedList;
	},
	archiveTask(state, archivedTask) {
		let copiedList = JSON.parse(JSON.stringify(state.list));
		let listStr = trackParentTaskList(copiedList, archivedTask);
		let newList = eval(listStr).filter(function (item) {
			return item.id !== archivedTask.id;
		});
		eval(listStr + ' = newList');
		state.list = copiedList;
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
				context.commit('getTasks', data);
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
			children: data,
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
	},
	async archiveTaskAction(context, task) {
		let c = confirm(`タスク「${task.name}」をアーカイブしますか？`);
		if (!c) return false;
		let data = {};
		await axios.delete('/api/tasks/' + task.id)
			.then((res) => {
				data = res.data;
			});
		context.commit('archiveTask', task);
	},
};

//　親タスクを追跡する関数
function trackParentTaskList(copiedList, task) {
	let str = 'copiedList';
	if (!task.parent_task_ids.length) return str;
	task.parent_task_ids.forEach(function (parent_task_id) {
		eval(str).forEach(function (item, index) {
			if (item.id === parent_task_id) {
				str += `[${index}].children`;
			}
		});
	});
	return str;
}

//　データベースに保持しない一時的なステートをセットする関数
function setTemporaryStatus(task, children = []) {
	task.new_child = false;
	task.open_status_box = false;
	task.children = children;
	return task;
}
