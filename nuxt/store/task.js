import axios from 'axios';

export const state = () => ({
	open: false,
	isNameEditing: false,
	isSupplementEditing: false,
});

export const mutations = {
	openTask(state, task) {
		task.children = task.children.map(function (child) {
			child.newChild = false;
			child.openStatusBox = false;
			child.children = [];
			return child;
		});
		Object.keys(task).forEach((key) => {
			state[key] = task[key];
		});
		state.open = true;
	},
	closeTask(state) {
		state.open = false;
	},
	editName(state) {
		state.isNameEditing = true;
	},
	editSupplement(state) {
		state.isSupplementEditing = true;
	},
	finishEditName(state) {
		state.isSupplementEditing = false;
	},
	finishEditSupplement(state) {
		state.isSupplementEditing = false;
	},
	updateTask(state, task) {
		task.children = task.children.map(function (child) {
			child.newChild = false;
			child.openStatusBox = false;
			child.children = [];
			return child;
		});
		Object.keys(task).forEach((key) => {
			state[key] = task[key];
		});
	},
};

export const actions = {
	async openTaskAction(context, task_id) {
		let data = {};
		await axios.get('/api/tasks/'+task_id)
			.then((res) => {
				data = res.data;
			});
		context.commit('openTask', data);
	},
	async updateTaskAction(context, payload) {
		let params = new URLSearchParams();
		params.append(payload.key, payload.value);
		let data = {};
		await axios.put('/api/tasks/' + this.state.task.id, params)
			.then((res) => {
				data = res.data;
			});
		context.commit('updateTask', data);
		if (payload.key === 'name') {
			context.commit('finishEditName');
		} else if (payload.key === 'supplement') {
			context.commit('finishEditSupplement');
		}
	},
};
