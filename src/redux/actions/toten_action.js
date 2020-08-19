
export const TOTAN = "TOTAN";

export const updateToten = (str = '') => {
    return {
		type: TOTAN,
		payload: {
			toten: str,
		},
	};
}
