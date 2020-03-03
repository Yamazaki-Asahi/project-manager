import axios from "axios";

export const state = () => ({
	authenticated: false
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
	checkIfAuthenticated(state, isSuccess) {
		state.authenticated = isSuccess;
	}
};

export const actions = {
	async checkIfAuthenticatedAction(context) {
		await axios.post('/api/auth/me').then(() => {
			context.commit('checkIfAuthenticated', true);
		}).catch(e => {
			context.commit('checkIfAuthenticated', false);
		});
	}
};
