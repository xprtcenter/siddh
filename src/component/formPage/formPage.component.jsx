import React from "react";
import "./formPage.styles.scss";
import FormSidebarMenu from "../form-sidebar-menu/form-sidebar-menu.component";
import { connect } from "react-redux";
import { ReactComponent as SidebarClosebutton } from "../../assets/arrow-right.svg";
import { sideMenuHide } from "../../redux/menu/menu.action";

import { createStructuredSelector } from "reselect";
import RouteComponent from "../../route/route.component";

import { selectSideHide } from "../../redux/menu/menu.selectors";

const FormPage = ({ data, sideMenuHide, sidehide, companyDetails }) => {
	return (
		<div className="form-page">
			<div className="leftside-menu-block open">
				<div className="side-menu-text-block">
					{data.map(({ id, ...otherProps }) => (
						<FormSidebarMenu key={id} {...otherProps} />
					))}
				</div>
				<div
					className={
						sidehide ? "sidebar-close-button" : "sidebar-close-button close"
					}
					onClick={sideMenuHide}
				>
					<SidebarClosebutton className="right-button" />
				</div>
			</div>

			<div className="right-side-main-section">
				<RouteComponent />
			</div>
		</div>
	);
};
const mapStateToProps = createStructuredSelector({
	sidehide: selectSideHide,
});
const mapDispatchToProps = (dispatch) => ({
	sideMenuHide: () => dispatch(sideMenuHide()),
});
export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
