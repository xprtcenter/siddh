import { Link } from "react-router-dom";

import "./Home.styles.css";
import logo from "../websitePage/portfolio/Ritesh/xprtlogo.png";

const Home = () => {
	return (
		<div className="home_wrapper">
			<div className="home_header gradient-background"></div>
			<h1>Welcome </h1>
			<h2>to</h2>

			<img src={logo} alt="logo" />
			<div className="button_wrapper">
				<button className="custom-btn-home btn-5">
					<a href="https://vkbrh.xprtcenter.com">VKBRH Website</a>
				</button>
				<button className="custom-btn-home btn-5">
					<Link to="/app">Hospital App</Link>
				</button>
				<button className="custom-btn-home btn-5">
					<Link to="/riteshportfolio">About xprt Center</Link>
				</button>
			</div>
			<div className="home_footer gradient-background"></div>
		</div>
	);
};

export default Home;
