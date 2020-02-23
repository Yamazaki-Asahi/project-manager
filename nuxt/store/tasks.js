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
	registerNewTask(state, payload) {
		let obj = payload;
		console.log(obj);
		obj['children'] = [];
		state.list.push(obj);
		state.newTask.name = '';
	},
	getTasks(state, payload) {
		Object.keys(payload).forEach(function (index) {
			payload[index]['children'] = [];
			state.list.push(payload[index]);
		});
	},
	archiveTask(state, payload) {
		let tasks = state.list.filter(item => {
			return item.id !== payload.id;
		});
		state.list = tasks;
	}
};

export const actions = {
	async getTasksAction(context) {
		let data = {};
		await axios.get('/api/tasks/')
			.then((res) => {
				data = res.data;
			});
		context.commit('getTasks', data);
	},
	async registerNewTaskAction(context, payload) {
		let data = {};
		let params = new URLSearchParams();
		params.append('name', payload);
		await axios.post('/api/tasks/', params).then((res) => {
			data = res.data;
		}).catch(e => {
			alert(e.message);
		});
		context.commit('registerNewTask', data);
	},
	async archiveTaskAction(context, payload) {
		await axios.delete('/api/tasks/'+payload.id)
			.then(() => {

			});
		context.commit('archiveTask', payload);
	}
};
