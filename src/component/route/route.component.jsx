import React from "react";

function RouteComponent(props) {
	return React.createElement(
		"Route",
		`path={props.path} component={props.componentname}`,
	);
}

export default RouteComponent;
