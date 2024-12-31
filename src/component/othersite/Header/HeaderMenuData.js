import PriceContent from "./submenu/PriceContent";
import HomeContent from "./submenu/HomeContent";
import Department from "./submenu/Department";
import Doctor from "./submenu/Doctor";
import LoginMenu from "./submenu/LoginMenu";
import EventAndCamp from "./submenu/EventAndCamp";
import Career from "./submenu/Career";
import FormsDownloads from "./submenu/FormsDownloads";
const HeaderMenuData = [
	{ id: 1, name: "Home", url: "/", flyoutContent: HomeContent },
	{
		id: 2,
		name: "Department",
		url: "#",
		flyoutContent: Department,
	},
	{ id: 3, name: "Doctor", url: "#", flyoutContent: Doctor },
	{ id: 4, name: "Events & Camps", url: "#", flyoutContent: EventAndCamp },

	{ id: 5, name: "Forms Download", url: "#", flyoutContent: FormsDownloads },
	{ id: 6, name: "Career", url: "#", flyoutContent: Career },
	{ id: 7, name: "Contact Us", url: "#", flyoutContent: PriceContent },
	{ id: 7, name: "Login", url: "/login", flyoutContent: LoginMenu },
];
export default HeaderMenuData;
