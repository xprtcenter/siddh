import { Link } from "react-router-dom";
import { RxDividerVertical } from "react-icons/rx";
import HeaderMenuData from "./HeaderMenuData";
import FlyoutLink from "./FlyoutLink";
import { useEffect } from "react";
//import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";
import logo from "../../../assets/site/vkbrhlogo1.png";

const DropdownNav = () => {
	//const authStatus = useSelector((state) => state.auth.status);
	const authStatus = true;
	useEffect(() => {
		window.onscroll = function () {
			myFunction();
		};

		var navbar = document.getElementById("navbar");
		var navbarsmall = document.getElementById("small-nav");
		var nabsticky = navbar.offsetTop;

		function myFunction() {
			// console.log("nabsticky", nabsticky);
			// console.log("scrollY", window.scrollY);
			if (window.scrollY >= nabsticky) {
				navbar.classList.add("nabsticky");
				navbarsmall.classList.remove("hidden");
				navbarsmall.classList.add("flex");
			} else {
				navbar.classList.remove("nabsticky");
				navbar.classList.remove("flex");
				navbarsmall.classList.add("hidden");
			}
		}
	}, []);

	return (
		<div
			id="navbar"
			className=" hidden md:flex flex-col w-[100%] justify-evenly z-1180 bg-white "
		>
			<div id="small-nav" className="hidden justify-between px-10  ">
				<div>
					<img className="h-10" src={logo} alt="logo" />
				</div>
				<div>
					<span className="address text-lg whitespace-nowrap px-5 ">
						BPCL Residencial Complex, Bina (MP) 470124 ☎️ 07580-275310,
						07580-350029 📧 vkbrh@vkendra.org
					</span>
				</div>
			</div>
			<div className=" hidden md:flex w-[100%] justify-evenly text-white bg-primaryBlue py-1 z-1180 ">
				{/* <div
			id="navbar"
			className=" hidden md:flex w-[100%] justify-evenly border-y-2 border-primaryYellow py-1 z-1180 "
			> */}
				<div className="menu-item flex gap-2 rounded-md">
					{HeaderMenuData.map(({ id, name, url, flyoutContent }) => {
						return (
							<div key={id} className="flex items-center justify-evenly">
								<FlyoutLink href={url} FlyoutContent={flyoutContent}>
									{name}
								</FlyoutLink>
								<RxDividerVertical className="ml-3" />
							</div>
						);
					})}
					{authStatus && <LogoutBtn />}

					{/* <a
									className="dp-widget-container"
									dp-key="?uid=46728&eid=43083&hideHeader=true"
									dp-popup="true"
									></a> */}
				</div>

				<Link
					target="_blank"
					to="https://meet-my-doctor.firebaseapp.com/#/app?eid=43083%2F"
					className=" bg-primaryOrange text-white hover:bg-primaryYellow hover:text-black py-1 px-5 uppercase rounded-lg"
				>
					Book Appointment
				</Link>
			</div>
		</div>
	);
};

export default DropdownNav;
