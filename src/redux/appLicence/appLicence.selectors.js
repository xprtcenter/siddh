import { createSelector } from "reselect";

const selectCompany = (state) => state.appCompany;

export const selectCompanyDetails = createSelector(
	[selectCompany],
	(state) => state,
);
