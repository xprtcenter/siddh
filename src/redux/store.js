import { /*compose,*/ createStore, applyMiddleware } from "redux";

import { persistStore } from "redux-persist";

import logger from "redux-logger";
import rootReducer from "./root-reducer";

const middlewares = [];
if (process.env.NODE_ENV === "development") {
	middlewares.push(logger);
}
/* onst composeEnhancer =
	process.env.NODE_ENV !==
		("production" && window && window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__) ||
	compose;
 */
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

//export default { store, persistor };
