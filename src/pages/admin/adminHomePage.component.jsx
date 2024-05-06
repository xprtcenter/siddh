import React from "react";

import FormPage from "../../component/formPage/formPage.component";
import admindata from "./adminMenudata";
class AdminHomePage extends React.Component {
	constructor() {
		super();
		this.state = admindata;
	}
	render() {
		const { history, match, location } = this.props;

		return (
			<FormPage
				data={this.state.adminMenu}
				history={history}
				match={match}
				location={location}
			/>
		);
	}
}

export default AdminHomePage;
/* --------------------------- Functional component not working ------------------------*/

/* import React, { useState, useEffect } from "react";

import FormPage from "../../component/formPage/formPage.component";
import payrolldata from "./payrollmenudata";
const PayrollHomePage = (props) => {
	const [data, setData] = useState({});
	useEffect(() => {
		setData(payrolldata);
	}, []);

	const { history, match, location } = props;

	return (
		<FormPage
			data={data.payrollMenu}
			history={history}
			match={match}
			location={location}
		/>
	);
};

export default PayrollHomePage;
 */
