import React from "react";

import FormPage from "../../../component/formPage/formPage.component";
import receptiondata from "./receptionmenudata";

class ReceptionHomePage extends React.Component {
	state = receptiondata;

	render() {
		const { history, match, location } = this.props;
		return (
			<FormPage
				data={this.state.receptionMenu}
				history={history}
				match={match}
				location={location}
			/>
		);
	}
}

export default ReceptionHomePage;
