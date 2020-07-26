import axios from "axios";

export const state = () => ({
	list: {}
});

export const mutations = {
	getStatuses(state, payload) {
		let obj = {};
		Object.keys(payload).forEach(function (index) {
			let id = payload[index]['id'];
			delete payload[index]['id'];
			obj[id] = payload[index];
		});
		state.list = obj;
	}
};

export const actions = {
	async getStatusesAction(context) {
		let data = {};
		await axios.get('/api/statuses/')
			.then((res) => {
				data = res.data;
			});
		context.commit('getStatuses', data);
	}
};
