export const state = () => ({
	id: 2,
	name: 'タスク1',
	status: 5,
	supplement: '補足文補足文補足文補足文補足文補足文補足文',
	comments: [],
	members: [],
	order: 1,
	children: [],
	checked: false,
	deadline: null
});

export const mutations = {
	inputName(state, payload) {
		state.newTask.name = payload;
	}
};
