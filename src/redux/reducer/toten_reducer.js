import { getStorageAsync } from '@/utils/storage';
import { TOTAN } from "../actions/toten_action";

export default async function TotenReducer(state = {toten: ''}, action) {
	const payload = action.payload;
	// const toten = await getStorageAsync('Authorization')
	switch (action.type) {
		case TOTAN:
			return {
				...state,
				...payload
			};
		default:
			return state
	}
};