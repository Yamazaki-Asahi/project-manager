import axios from "axios";

export const state = () => ({
	newTask: {
		id: 0,
		name: '',
		status_id: 1,
		supplement: '',
		comments: [],
		members: [],
		order: 0,
		children: [],
		checked: false,
		deadline: null
	},
	list: []
});

export const mutations = {
	inputName(state, payload) {
		state.newTask.name = payload;
	},
	registerNewTask(state) {
		state.newTask.order = state.list.length + 1;
		let obj = JSON.stringify(state.newTask);
		obj = JSON.parse(obj);
		state.list.push(obj);
		state.newTask.name = '';
	},
	getTasks(state, payload) {
		Object.keys(payload).forEach(function (index) {
			payload[index]['children'] = [];
			state.list.push(payload[index]);
		});
	}
}

export const actions = {
	async getTasksAction(context) {
		let data = {};
		await axios.get('/api/tasks/')
			.then((res) => {
				data = res.data;
			});
		context.commit('getTasks', data);
	}
};
