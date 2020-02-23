import axios from 'axios';

export const state = () => ({
});

export const mutations = {
	getTask(state, payload) {
		Object.keys(payload).forEach((key) => {
			state[key] = payload[key];
		});
	}
};

export const actions = {
	async getTaskAction(context, task_id) {
		let data = {};
		await axios.get('/api/tasks/'+task_id)
			.then((res) => {
				data = res.data;
			});
		context.commit('getTask', data);
	},
};
