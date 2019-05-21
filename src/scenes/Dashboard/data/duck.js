export const types = {
	TOGGLE_DRAWER: 'DRAWER@TOGGLE'
};

const initialState = {
	drawer: {
		open: true
	}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.TOGGLE_DRAWER:
			return {
				...state,
				drawer: {
					...state.drawer,
					open: !state.drawer.open
				}
			};
		default:
			return state;
	}
};

export const toggleDrawer = () => ({
	type: types.TOGGLE_DRAWER
});

export default reducer;
