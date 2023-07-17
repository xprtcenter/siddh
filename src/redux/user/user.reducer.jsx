import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
	currentUser: null,
	role: ["user"],
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UserActionTypes.SET_CURRENT_USER:
			return {
				...state,
				currentUser: action.payload,
				/* 	role: state.currentUser.role, */
			};

		default:
			return state;
	}
};
export default userReducer;
