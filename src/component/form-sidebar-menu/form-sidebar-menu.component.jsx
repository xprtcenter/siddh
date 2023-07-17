import React, { useEffect } from "react";
import "./form-sidebar-menu.styles.scss";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { BsRecord2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { sideMenuActive } from "../../redux/menu/menu.action";
import {
	selectSideHide,
	selectSideActive,
} from "../../redux/menu/menu.selectors";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

const FormSidebarMenu = ({
	match,
	menuName,
	menuUrl,
	iconname = BsRecord2,
	sidehide,
	sideactive,
	sideMenuActive,
}) => {
	useEffect(() => {
		tippy(`#${menuUrl}`, {
			content: menuName,
			placement: "right",
		});
	}, []);

	return (
		<div
			className={
				sideactive === menuUrl ? "sidebar-menu side-active" : "sidebar-menu"
			}
			id={menuUrl}
			onClick={() => sideMenuActive(menuUrl)}
		>
			<Link className="form-side-list" to={`${match.url}/${menuUrl}`}>
				<span className="icon-container">
					{React.createElement(iconname, null)}
				</span>
				<span
					className={sidehide ? "side-menu-text open" : "side-menu-text close"}
				>
					{menuName}
				</span>
			</Link>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	sidehide: selectSideHide,
	sideactive: selectSideActive,
});
const mapDispatchToProps = (dispatch) => ({
	sideMenuActive: (url) => dispatch(sideMenuActive(url)),
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(FormSidebarMenu),
);
