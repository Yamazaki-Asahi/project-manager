import axios from 'axios';

export const state = () => ({
	open: false,
});

export const mutations = {
	openTask(state, payload) {
		Object.keys(payload).forEach((key) => {
			state[key] = payload[key];
		});
		state.open = true;
	},
	closeTask(state) {
		state.open = false;
	}
};

export const actions = {
	async openTaskAction(context, id) {
		let data = {};
		await axios.get('/api/tasks/'+id)
			.then((res) => {
				data = res.data;
			});
		context.commit('openTask', data);
	},
};
