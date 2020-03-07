import axios from "axios";

export const state = () => ({

});

export const mutations = {
	getUser(state, user) {
		if (user) {
			Object.keys(user).map((key) => {
				state[key] = user[key];
			});
		}
	},
};

export const actions = {
	async getUserAction(context) {
		await axios.post('/api/auth/me').then(res => {
			context.commit('getUser', res.data);
		}).catch(e => {
			context.commit('getUser', null);
		});
	}
};
