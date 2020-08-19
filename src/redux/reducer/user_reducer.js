import { getStorageAsync } from '@/utils/storage';
import { USER_LOGIN, REQUEST_USER, CLEAR_USER } from "../actions/user_action";

export default async function UserReducer(state, action) {
	const payload = action.payload;
	const storage = await getStorageAsync('STORAGE_USER') || {}
	switch (action.type) {
		case USER_LOGIN:
			return {
				...state,
				...payload
			};
		case REQUEST_USER:
			return {
				...state,
				...payload
			};
		case CLEAR_USER:
			return {};
		default:
			return state || storage
	}
};