import axios from 'axios';

export const state = () => ({
	open: false
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
		state.open = false
	}
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
};
