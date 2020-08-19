import { NAV_BOTTOM_INDEX } from "../actions/setting_action";

const SETTINGS = {
    navBottomIndex: 0
};

export default function UserReducer(state = SETTINGS, action) {
	switch (action.type) {
		case NAV_BOTTOM_INDEX:
			return {
                ...state,
                ...action.payload
            }
		default:
			return state;
	}
};
