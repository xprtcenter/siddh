import { createSelector } from "reselect";

const selectMenu = (state) => state.menu;

export const selectMenuHidden = createSelector(
	[selectMenu],
	(menu) => menu.menuhidden,
);

export const selectSideHide = createSelector(
	[selectMenu],
	(menu) => menu.sidehide,
);

export const selectActiveHeader = createSelector(
	[selectMenu],
	(menu) => menu.activeheader,
);

export const selectSideActive = createSelector(
	[selectMenu],
	(menu) => menu.sideactive,
);
