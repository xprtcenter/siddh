import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { activeHeaderButton } from "../../redux/menu/menu.action";

import { withRouter } from "react-router-dom";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import "./menu-item.styles.scss";

const MenuItem = ({
	currentUser,
	title,
	imageUrl,
	size,
	history,
	linkUrl,
	match,
	activeHeaderButton,
}) => (
	<div
		className={`${size} menu-item`}
		onClick={() => {
			if (currentUser.role.includes(title)) {
				history.push(`${match.url}${linkUrl}`);
				activeHeaderButton(linkUrl);
			} else {
				alert("You are not Authorize please ask Administrator for this Module");
				return;
			}
			/* history.push(`${match.url}${linkUrl}`);
			activeHeaderButton(linkUrl); */
		}}
	>
		<div
			className="background-image"
			style={{
				backgroundImage: `url(${imageUrl})`,
			}}
		/>
		<div className="content">
			<h1 className="title">{title.toUpperCase()}</h1>
			<span className="subtitle"> CLICK TO LOGIN </span>
		</div>
	</div>
);

const mapDispatchToProps = (dispatch) => ({
	activeHeaderButton: (url) => dispatch(activeHeaderButton(url)),
});
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(MenuItem),
);
