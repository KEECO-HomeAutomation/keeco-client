export const types = {
	SET_AUTH_TOKEN: 'LOGIN@SET_TOKEN',
	CLEAR_AUTH_TOKEN: 'LOGIN@CLEAR_TOKEN',
	SET_SERVER: 'SERVER@SET',
	CLEAR_SERVER: 'SERVER@CLEAR'
};

const initialState = {
	login: {
		token: null
	},
	server: {
		path: null
	}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_AUTH_TOKEN:
			return {
				...state,
				login: {
					...state.login,
					token: action.payload
				}
			};
		case types.CLEAR_AUTH_TOKEN:
			return {
				...state,
				login: {
					...state.login,
					token: null
				}
			};
		case types.SET_SERVER:
			return {
				...state,
				server: {
					...state.server,
					path: action.payload
				}
			};
		case types.CLEAR_SERVER:
			return {
				...state,
				server: {
					...state.server,
					path: null
				}
			};
		default:
			return state;
	}
};

export const setAuthToken = token => ({
	type: types.SET_AUTH_TOKEN,
	payload: token
});

export const clearAuthToken = () => ({
	type: types.CLEAR_AUTH_TOKEN
});

export const setServer = path => ({
	type: types.SET_SERVER,
	payload: path
});

export const clearServer = () => ({
	type: types.CLEAR_SERVER
});

export default reducer;
