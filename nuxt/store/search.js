export const state = () => ({
	show: false,
	conditions: {

	}
});

export const mutations = {
	openSearchBox(state) {
		state.show = true;
	},
	closeSearchBox(state) {
		state.show = false;
	}
};
