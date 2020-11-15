import axios from 'axios';
import marked from 'marked'

export const state = () => ({
	open: false,
	isNameEditing: false,
	isSupplementEditing: false,
	supplementHTML: '',
	comments: []
});

export const mutations = {
	openTask(state, task) {
		Object.keys(task).forEach((key) => {
			state[key] = task[key];
		});
		if (state.supplement) state.supplementHTML = marked(state.supplement);
		state.comments.forEach(function (comment) {
			comment.isCommentEditing = false;
		});
		state.open = true;
	},
	closeTask(state) {
		state.open = false;
	},
	editName(state) {
		state.isNameEditing = true;
	},
	editSupplement(state) {
		state.isSupplementEditing = true;
	},
	finishEditName(state) {
		state.isNameEditing = false;
	},
	editComment(state, comment) {
		let comments = state.comments.map(function (comment2) {
			if (comment2.id === comment.id) {
				comment2.isCommentEditing = true;
			}
			return comment2;
		});
		console.log(comments);
		state.comments = comments;
	},
	finishEditSupplement(state) {
		if (state.supplement) {
			state.isSupplementEditing = false;
			state.supplementHTML = marked(state.supplement);
			state.supplementHTML = state.supplementHTML.replace('disabled', '');
		} else {
			state.isSupplementEditing = true;
		}
	},
	updateTask(state, task) {
		Object.keys(task).forEach((key) => {
			state[key] = task[key];
		});
	},
	addComment(state, comments) {
		state.comments = comments
	},
	updateComment(state, comments) {
		comments.forEach(function (comment) {
			comment.isCommentEditing = false
		})
		state.comments = comments
	},
	deleteComment(state, comments) {
		state.comments = comments
	}
};

export const actions = {
	async openTaskAction(context, task_id) {
		let data = {};
		await axios.get('/api/tasks/'+task_id)
			.then((res) => {
				data = res.data;
			});
		context.commit('openTask', data);
	},
	async updateTaskAction(context, payload) {
		let params = new URLSearchParams();
		params.append(payload.key, payload.value);
		let data = {};
		await axios.put('/api/tasks/' + this.state.task.id, params)
			.then((res) => {
				data = res.data;
			});
		context.commit('updateTask', data);
		if (payload.key === 'name') {
			context.commit('finishEditName');
		} else if (payload.key === 'supplement') {
			context.commit('finishEditSupplement');
		}
	},
	async addCommentAction(context, payload) {
		let params = new URLSearchParams();
		params.append(payload.key, payload.value);
		params.append('task_id', this.state.task.id);
		let data = {};
		await axios.post('/api/comments/', params)
			.then((res) => {
				data = res.data;
			});
		context.commit('addComment', data);
	},
	async updateCommentAction(context, payload) {
		let params = new URLSearchParams();
		params.append(payload.key, payload.value);
		params.append('task_id', this.state.task.id);
		let data = {};
		await axios.patch('/api/comments/' + payload.comment.id, params)
			.then((res) => {
				data = res.data;
			});
		context.commit('updateComment', data);
	},
	async deleteCommentAction(context, comment) {
		let c = confirm(`コメントを削除しますか？`);
		if (!c) return false;
		let params = new URLSearchParams();
		params.append('task_id', this.state.task.id);
		let data = {};
		await axios.delete('/api/comments/' + comment.id)
			.then((res) => {
				data = res.data;
			});
		context.commit('deleteComment', data);
	}
};
