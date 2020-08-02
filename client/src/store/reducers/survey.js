import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import produce from 'immer';

const reducer = (state = [], action) => {
	switch (action.type) {
		case actionTypes.FETCH_SURVEYS:
			state = action.payload;
			const sortedList = produce(state, (draft) => {
				draft.sort((a, b) => parseFloat(b.yes) - parseFloat(a.yes));
			});

			return sortedList;

		case actionTypes.SOCKET_SERVER_CLIENT_CHOICE:
			if (action.payload === null) {
				return state;
			}

			const updatedSurveyList = produce(state, (draft) => {
				const i = draft.findIndex((s) => s._id === action.payload._id);

				draft.splice(i, 1, action.payload);
			});

			return updatedSurveyList;

		default:
			return state;
	}
};

export default reducer;
