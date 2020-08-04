import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchUser = () => {
	try {
		return async (dispatch) => {
			const res = await axios.get('/api/current_user');
			dispatch({
				type: actionTypes.FETCH_USER,
				payload: res.data,
			});
		};
	} catch (error) {
		console.error(error);
	}
};

export const logoutUser = () => {
	return async (dispatch) => {
		await axios.get('/auth/google/logout/');

		dispatch({
			type: actionTypes.LOGOUT_USER,
			payload: false,
		});
	};
};

export const handleToken = (token) => {
	return async (dispatch) => {
		const res = await axios.post('/api/stripe', token);

		dispatch({
			type: actionTypes.FETCH_USER,
			payload: res.data,
		});
	};
};
