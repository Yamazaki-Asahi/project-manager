import axios from 'axios';
import marked from 'marked'

export const state = () => ({
	open: false,
	isNameEditing: false,
	isSupplementEditing: false,
	supplementHTML: ''
});

export const mutations = {
	openTask(state, task) {
		Object.keys(task).forEach((key) => {
			state[key] = task[key];
		});
		if (!state.supplement) state.isSupplementEditing = true;
		if (state.supplement) state.supplementHTML = marked(state.supplement);
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
		state.isNameEditing = false;
	},
	finishEditSupplement(state) {
		if (state.supplement) {
			state.isSupplementEditing = false;
			state.supplementHTML = marked(state.supplement);
		} else {
			state.isSupplementEditing = true;
		}
	},
	updateTask(state, task) {
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
