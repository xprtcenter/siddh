import appLicenceActionTypes from "./appLicence.types";

const INITIAL_STATE = {
	cName: "VIVEKANANDA KENDRA BINA REFIANARY HOSPITAL",
	cAddress: "BPCL Bina Refianary Bina",
	cPhoneNo: "89894458455",
	cEmail: "emailid@company.com",
	cWebSite: "www.websiteaddres.com",
};

const appLicenceReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case appLicenceActionTypes.SELECT_APP_COMPANY_DETAILS:
			return {
				...state,
				cName: state.cName,
				cAddress: state.cAddress,
				cPhoneNo: state.cPhoneNo,
				cEmail: state.cEmail,
				cWebSite: state.cWebSite,
			};

		default:
			return state;
	}
};
export default appLicenceReducer;
