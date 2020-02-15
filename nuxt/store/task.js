import axios from 'axios';

export const state = () => ({
	task: {

	}
});

export const mutations = {
	getTask(state, payload) {
		state.task = payload;
	},
};

export const actions = {
	async getTaskAction(context, payload) {
		console.log(context, payload);
		let data = {}
		await axios.get('/api/tasks/'+payload.task_id)
			.then((res) => {
				data = res.data;
			});
		context.commit('getTask', data);
	}
};
