import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import menuReducer from "./menu/menu.reducer";
import appLicenceReducer from "./appLicence/appLicence.reducer";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["cart"],
};

const rootReducer = combineReducers({
	user: userReducer,
	cart: cartReducer,
	menu: menuReducer,
	appCompany: appLicenceReducer,
});

export default persistReducer(persistConfig, rootReducer);
