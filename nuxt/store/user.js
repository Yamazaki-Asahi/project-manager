import axios from "axios";

export const state = () => ({

});

export const mutations = {
	login(state, params) {
		axios.post('/api/auth/login', params).then((res) => {
			localStorage.setItem('access_token', res.data.access_token);
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
			this.$router.push('/tasks');
		}).catch(e => {
			this.message = 'ログイン情報が間違っています。'
		});
	},
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
			context.commit('checkIfAuthenticated', null);
		});
	}
};
