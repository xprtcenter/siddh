import "./Ritesh-portfolio.style.css";
import { Link } from "react-router-dom";
import rit from "./ritesh2.png";

import logo from "./xprtlogo.png";

const Ritesh = () => {
	return (
		<>
			<header>
				<div className="navbar">
					<div className="logo">
						<img src={logo} alt="" />
					</div>

					<ul className="menu">
						<li>
							<a href="/">Home</a>
						</li>
						<li>
							<a href="/codepenPortfolio">Projects</a>
						</li>

						<li>
							<a href="/Services">Services</a>
						</li>
						<li>
							<a href="/Contact">Contact</a>
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

					<div className="button_wrapper">
						<button className="custom-btn-home btn-5">
							<Link to="/aboutme">About Me</Link>
						</button>
						<button className="custom-btn-home btn-5">
							<Link to="/followme">Follow Me</Link>
						</button>
					</div>
				</div>
				<div className="ritesh-image-box">
					<div className="circle circle-1"></div>
					<div className="circle circle-2"></div>
					<div className="circle circle-3"></div>
					<img src={rit} alt="ritesh" />
				</div>
			</div>
		</>
	);
};

export default Ritesh;
