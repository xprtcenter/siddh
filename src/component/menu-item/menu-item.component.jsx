import React from "react";
import { connect } from "react-redux";

import { activeHeaderButton } from "../../redux/menu/menu.action";

import { withRouter } from "react-router-dom";

import "./menu-item.styles.scss";

const MenuItem = ({
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
			history.push(`${match.url}${linkUrl}`);
			activeHeaderButton(linkUrl);
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

export default withRouter(connect(null, mapDispatchToProps)(MenuItem));
