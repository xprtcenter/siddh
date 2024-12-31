import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";

import { connect } from "react-redux";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.action";

import Home from "./pages/homepage/Homeforapp";
import Ritesh from "./pages/websitePage/portfolio/Ritesh/Ritesh";
import ModuleRoutePage from "./route/moduleRoutePage.component";
import CodepenPortfolio from "./pages/websitePage/portfolio/codepen/codepen_portfolio";

class App extends Component {
	unsubscriveFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;

		this.unsubscriveFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot((snapShot) => {
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data(),
					});
				});
			}

			setCurrentUser(userAuth);
		});
	}

	componentWillUnmount() {
		this.unsubscriveFromAuth();
	}

	render() {
		return (
			<Switch>
				<Route exact path="/" render={() => <Home />} />
				<Route path="/app" render={() => <ModuleRoutePage />} />
				<Route path="/riteshportfolio" render={() => <Ritesh />} />
				<Route path="/codepenPortfolio" render={() => <CodepenPortfolio />} />
			</Switch>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect("", mapDispatchToProps)(App);
