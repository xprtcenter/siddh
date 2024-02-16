import React from "react";
import "./formPage.styles.scss";
import FormSidebarMenu from "../form-sidebar-menu/form-sidebar-menu.component";
import { connect } from "react-redux";
import { ReactComponent as SidebarClosebutton } from "../../assets/arrow-right.svg";
import { sideMenuHide } from "../../redux/menu/menu.action";
import RightFormPageContainer from "../../component/formPage/right-form-page.component";
import { createStructuredSelector } from "reselect";
import Header from "../../component/header/header.component";
import Footer from "../footer/footer.component";
import { selectSideHide } from "../../redux/menu/menu.selectors";

const FormPage = ({ data, sideMenuHide, sidehide }) => {
	return (
		<React.Fragment>
			<Header cName="xprt center" />
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

				<RightFormPageContainer />
			</div>
			<Footer />
		</React.Fragment>
	);
};
const mapStateToProps = createStructuredSelector({
	sidehide: selectSideHide,
});
const mapDispatchToProps = (dispatch) => ({
	sideMenuHide: () => dispatch(sideMenuHide()),
});
export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
