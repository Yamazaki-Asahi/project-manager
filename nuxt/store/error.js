export const state = () => ({

});

export const mutations = {
	setError(state, error) {
		Object.keys(error).forEach(function (key) {
			state[key] = error[key];
		});
	}
};
