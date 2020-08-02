import * as actionTypes from '../actions/actionTypes';
import produce from 'immer';

const initialState = {
	isOpen: false,
	error: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SHOW_MODAL:
			const nState = produce(state, (draft) => {
				draft['isOpen'] = true;
				draft['error'] = 'TEST';
			});

			return nState;

		case actionTypes.HIDE_MODAL:
			return initialState;

		case actionTypes.ERROR_MODAL:
			const newState = produce(state, (draft) => {
				draft['isOpen'] = true;
				draft['error'] = action.error.response.data.error;
			});

			return newState;

		default:
			return state;
	}
};

export default reducer;
