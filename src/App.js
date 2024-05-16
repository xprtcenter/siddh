import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";

import { connect } from "react-redux";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.action";

import Home from "./pages/homepage/Home";
import Ritesh from "./pages/websitePage/portfolio/Ritesh/Ritesh";
import ModuleRoutePage from "./route/moduleRoutePage.component";

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
		//console.log("user print from home component", this.props.currentUser);
		//console.log("weight testing", window.innerWidth);
		return (
			<div className="root-container">
				<Switch>
					<Route exact path="/" render={() => <Home />} />
					<Route path="/app" render={() => <ModuleRoutePage />} />
					<Route path="/riteshportfolio" render={() => <Ritesh />} />
				</Switch>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect("", mapDispatchToProps)(App);
