export const types = {
	SET_VIEW_MODE: 'NODES@SET_VIEW_MODE'
};

const initialState = {
	viewMode: 'template'
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_VIEW_MODE:
			return {
				...state,
				viewMode: action.payload
			};
		default:
			return state;
	}
};

export const setViewMode = viewMode => ({
	type: types.SET_VIEW_MODE,
	payload: viewMode
});

export default reducer;
