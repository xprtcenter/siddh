import { Link } from "react-router-dom";
import "./Home.styles.css";
import logo from "../websitePage/portfolio/Ritesh/xprtlogo.png";

const Home = () => {
	return (
		<div className="home_wrapper">
			<div className="home_header"></div>
			<h1>Welcome </h1>
			<h2>to</h2>

			<img src={logo} alt="" />
			<div className="button_wrapper">
				<button className="custom-btn-home btn-5">
					<Link to="/xprtapp">Project</Link>
				</button>
				<button className="custom-btn-home btn-5">
					<Link to="/riteshportfolio">Go to my Portfolio</Link>
				</button>
			</div>
			<div className="home_footer"></div>
		</div>
	);
};

export default Home;
