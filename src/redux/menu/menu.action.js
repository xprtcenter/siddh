import MenuActionTypes from "./menu.types";

export const toggleMenuHidden = () => ({
	type: MenuActionTypes.TOGGLE_MENU_HIDDEN,
});

export const sideMenuHide = () => ({
	type: MenuActionTypes.SIDE_MENU_HIDE,
});

export const activeHeaderButton = (url) => ({
	type: MenuActionTypes.ACTIVE_HEADER_BUTTON,
	payload: url,
});

export const sideMenuActive = (url) => ({
	type: MenuActionTypes.SIDE_MENU_ACTIVE,
	payload: url,
});
