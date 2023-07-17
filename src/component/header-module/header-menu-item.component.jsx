import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { activeHeaderButton } from "../../redux/menu/menu.action";
import { selectActiveHeader } from "../../redux/menu/menu.selectors";

import { withRouter } from "react-router-dom";

const HeaderMenuItem = ({
	title,
	linkUrl,
	history,
	match,
	activeHeaderButton,
	activeheader,
}) => {
	return (
		<React.Fragment>
			<div
				className={
					activeheader.toLowerCase() === linkUrl.toLowerCase()
						? "nav-option active-header-button"
						: "nav-option"
				}
				onClick={() => {
					history.push(`${match.url}${linkUrl}`);
					activeHeaderButton(linkUrl);
				}}
			>
				<span>{title}</span>
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = createStructuredSelector({
	activeheader: selectActiveHeader,
});
const mapDispatchToProps = (dispatch) => ({
	activeHeaderButton: (url) => dispatch(activeHeaderButton(url)),
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(HeaderMenuItem),
);
