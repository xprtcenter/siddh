import MenuActionTypes from "./menu.types";

const INITIAL_STATE = {
	menuhidden: true,
	sideactive: "",
	sidehide: false,
	activeheader: "home",
};

const menuReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case MenuActionTypes.TOGGLE_MENU_HIDDEN:
			return {
				...state,
				menuhidden: !state.menuhidden,
			};
		case MenuActionTypes.SIDE_MENU_HIDE:
			return {
				...state,
				sidehide: !state.sidehide,
			};
		case MenuActionTypes.ACTIVE_HEADER_BUTTON:
			return {
				...state,
				activeheader: action.payload,
			};
		case MenuActionTypes.SIDE_MENU_ACTIVE:
			return {
				...state,
				sideactive: action.payload,
			};
		default:
			return state;
	}
};
export default menuReducer;
