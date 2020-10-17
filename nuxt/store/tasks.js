import axios from "axios";

export const state = () => ({
	list: []
});

export const mutations = {
	registerNewTask(state, task) {
		let newTask = setTemporaryStatus(task);
		state.list.push(newTask);
	},
	getTasks(state, tasks) {
		tasks.forEach(function (task) {
			let _task = setTemporaryStatus(task);
			state.list.push(_task);
		});
		console.log(tasks);
	},
	openStatusBox(state, task) {
		let copiedList = JSON.parse(JSON.stringify(state.list));
		let newTaskList = copiedList.map(function (item) {
			if (item.id === task.id) {
				item.open_status_box = true;
			}
			return item;
		});
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
		let newTaskList = copiedList.map(function (item) {
			if (item.id === updatedTask.id) {
				return setTemporaryStatus(updatedTask);
			}
			return item;
		});
		state.list = newTaskList;
	},
	archiveTask(state, archivedTask) {
		let copiedList = JSON.parse(JSON.stringify(state.list));
		let newList = copiedList.filter(function (item) {
			return item.id !== archivedTask.id;
		});
		state.list = newList;
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
		await axios.post('/api/tasks/', params).then((res) => {
			data = res.data;
		}).catch(e => {

		});
		context.commit('registerNewTask', data);
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

//　データベースに保持しない一時的なステートをセットする関数
function setTemporaryStatus(task) {
	task.open_status_box = false;
	return task;
}
