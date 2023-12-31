import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CartIcon from "../../component/card-icon/card-icon.component";
import logo from "../../assets/siddh-logo.png";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import HeaderModules from "../header-module/header-module.component";
import avtar from "../../assets/avatar.png";
import Menubutton from "../../assets/menubutton.png";

import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectMenuHidden } from "../../redux/menu/menu.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectActiveHeader } from "../../redux/menu/menu.selectors";

import { toggleMenuHidden } from "../../redux/menu/menu.action";
import { activeHeaderButton } from "../../redux/menu/menu.action";

import HeaderDateTime from "./Timer.component";

import { auth } from "../../firebase/firebase.utils";
import "./header.styles.scss";

const Header = ({
	currentUser,
	hidden,
	menuhidden,
	toggleMenuHidden,
	activeheader,
	activeHeaderButton,
	cName,
}) => {
	/* const data = firestore().collection("moduleAndPageMaster");
	const [mydata, setMyData] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const updatedData = await data.get();
			let employee = [];
			updatedData.docs.forEach((doc) => {
				employee.push({ ...doc.data(), id: doc.id });
			});
			console.log("Data Ref for Header check", employee);
			setMyData(employee);
		};
		console.log(mydata);
		getData();
	}, [data]); */

	return (
		<div className="main-header">
			<div className="header1">
				<p>{cName}</p>
				<HeaderDateTime />
			</div>
			<div className="header">
				<div onClick={() => activeHeaderButton("home")}>
					<Link to="/" className="logo-container">
						<img src={logo} alt="logofile" />

						<span
							className={
								activeheader.toLowerCase() === "home"
									? "active-header-button text"
									: "text"
							}
						>
							HOME
						</span>
					</Link>
				</div>
				<div className="nav-options-container .nav__menu">
					{!menuhidden ? (
						<div className="header-menu">
							{currentUser ? (
								<HeaderModules userrole={currentUser.role} />
							) : null}
						</div>
					) : null}
					<div className="menu-button-icon" onClick={toggleMenuHidden}>
						<img src={Menubutton} alt="menubutton" />
					</div>

					{currentUser ? (
						<div className="user-info-container menu-item-dropdown">
							{auth.currentUser.photoURL !== null ? (
								<img
									className="avatar"
									src={auth.currentUser.photoURL}
									alt="avatar"
								/>
							) : (
								<img className="avatar" src={avtar} alt="avatar" />
							)}

							<span className="text">{auth.currentUser.email}</span>

							<Submenu />
						</div>
					) : (
						<Link
							onClick={() => activeHeaderButton("signin")}
							className={
								activeheader.toLowerCase() === "signin"
									? "sign-in active-header-button"
									: "sign-in"
							}
							to="/signin"
						>
							SIGN IN
						</Link>
					)}

					<CartIcon />
				</div>
				{hidden ? null : <CartDropdown />}
			</div>
		</div>
	);
};
class Submenu extends React.Component {
	render() {
		return (
			<div className="nav__submenu">
				<Link className="nav-option drop" to="/profile">
					PROFILE
				</Link>
				<Link className="nav-option drop" to="/setting">
					SETTING
				</Link>
				<div
					className="nav-option drop"
					onClick={() => {
						const confirmBox = window.confirm(
							"Do you really want to SIGN OUT?",
						);
						if (confirmBox) {
							auth.signOut();
							activeHeaderButton("signin");
						}
					}}
				>
					SIGN OUT
				</div>
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => ({
	toggleMenuHidden: () => dispatch(toggleMenuHidden()),
	activeHeaderButton: (url) => dispatch(activeHeaderButton(url)),
});
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden,
	menuhidden: selectMenuHidden,
	activeheader: selectActiveHeader,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
