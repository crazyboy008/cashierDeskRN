export const NAV_BOTTOM_INDEX = "NAV_BOTTOM_INDEX";

/**
 * 改变
 * @param {*} index 
 */
export function onChangeNavBottomIndex(index) {
	return {
		type: NAV_BOTTOM_INDEX,
		payload: {
			navBottomIndex: index,
		},
	};
}