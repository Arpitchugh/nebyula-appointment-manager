import api from '../util/api.util';
import { userActions } from '../slices/user.slice';

export function postSignup(values) {
	return async () => {
		return await api.post('/auth/signup', values);
	};
}

export function getVerifyAccount(pathParams) {
	return async () => {
		return await api.get(
			`/auth/verify/${pathParams.email}/${pathParams.verificationCode}`
		);
	};
}

export function getCurrentUser() {
	return async dispatch => {
		try {
			const accessToken = localStorage.getItem('access_token');

			const res = await api.get('/auth/me', {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			// if (res.user) {
			// 	dispatch(userActions.replaceUser({ user: res.user, isLoggedIn: true }));
			// } else {
			// 	dispatch(userActions.replaceUser({ user: null, isLoggedIn: false }));
			// }

			return Promise.resolve(res);
		} catch (err) {
			return Promise.reject(err);
		}
	};
}