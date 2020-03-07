import axios from "axios";

export const state = () => ({
	list: []
});

export const mutations = {
	getProjects(state, projects) {
		state.list = projects;
	}
};

export const actions = {
	async getProjectsAction(context) {
		let data = {};
		await axios.get('/api/projects/')
			.then((res) => {
				data = res.data;
			}).catch(e => {
				// alert(e.message);
			});
		context.commit('getProjects', data);
	}
};
