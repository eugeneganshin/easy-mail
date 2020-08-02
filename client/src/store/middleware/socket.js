import produce from 'immer';
const INITIAL_STATE = {
	data: null,
};

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'SOCKET_SERVER: NOT_LOGGED_IN':
			return state;

		case 'SOCKET_SERVER: LOGGED_IN':
			const updatedState = produce(state, (draft) => {
				draft['data'] = action.payload;
			});
			console.log(action, 'MIDLEWARE');
			return updatedState;

		default:
			return state;
	}
};

export default reducer;
