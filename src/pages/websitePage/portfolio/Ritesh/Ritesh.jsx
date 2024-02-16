import "./Ritesh-portfolio.style.css";
import { Link } from "react-router-dom";

import RiteshImage from "./ritesh-image";
import logo from "./xprtlogo.png";
import BurgerMenu from "../../burger/burger-menu";
const Ritesh = () => {
	return (
		<>
			<header>
				<div className="navbar">
					<div className="logo">
						<img src={logo} alt="" />
					</div>

					<BurgerMenu />
					<ul className="menu">
						<li>
							<a href="/">Home</a>
						</li>
						<li>
							<a href="project">Projects</a>
						</li>

						<li>
							<a href="Services">Services</a>
						</li>
						<li>
							<a href="Contact">Contact</a>
						</li>
					</ul>
				</div>
			</header>
			<div className="content">
				<div className="text-content">
					<div className="text">Hello, It's Me </div>

					<div className="name">
						<span>R</span>itesh <span>R</span>astogi
					</div>

					<div className="animated-text">
						I'm a <span></span>
					</div>

					{/* <div className="button_wrapper">
						<button className="custom-btn btn-5">About Me</button>
						<button className="custom-btn btn-5">Follow Me</button>
					</div> */}
					<div className="button_wrapper">
						<button className="custom-btn-home btn-5">
							<Link to="/aboutme">About Me</Link>
						</button>
						<button className="custom-btn-home btn-5">
							<Link to="/followme">Follow Me</Link>
						</button>
					</div>
				</div>
				<RiteshImage />
			</div>
		</>
	);
};

export default Ritesh;
